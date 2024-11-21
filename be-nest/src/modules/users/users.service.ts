import { CodeAuthDto, CreateAuthDto } from '@/auth/dto/create-auth.dto';
import { hashPasswordHelper } from '@/helpers/util';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import mongoose, { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private readonly mailerService: MailerService,
  ) {}

  isEmailExist = async (email: string) => {
    const user = await this.userModel.exists({ email });
    if (user) return true;
    return false;
  };

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, phone, address, image } = createUserDto;

    // check if email already exist
    const isEmailExist = await this.isEmailExist(email);
    if (isEmailExist === true) {
      throw new BadRequestException(`Email already exist: ${email}`);
    }
    // hash password
    const hashPassword = await hashPasswordHelper(password);
    const user = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      phone,
      address,
      image,
    });
    return {
      _id: user._id,
    };
  }

  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query);
    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;

    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (current - 1) * pageSize;

    const results = await this.userModel
      .find(filter)
      .limit(pageSize)
      .skip(skip)
      .select('-password')
      .sort(sort as any);
    return { results, totalPages };
  }

  async findOne(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException(`Invalid user ID`);
      }

      const user = this.userModel.findById(id).select('-password');
      if (!user) throw new BadRequestException(`User not found`);
      return user;
    } catch (error) {
      throw new BadRequestException(`Internal server error`);
    }
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email: email });
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne(
      {
        _id: updateUserDto._id,
      },
      {
        name: updateUserDto.name,
        phone: updateUserDto.phone,
        address: updateUserDto.address,
        image: updateUserDto.image,
      },
    );
  }

  async remove(id: string) {
    // check id
    if (mongoose.isValidObjectId(id)) {
      return this.userModel.deleteOne({ _id: id });
    } else {
      throw new BadRequestException(`Invalid user ID`);
    }
  }

  async handleRegister(registerDto: CreateAuthDto) {
    const { name, email, password } = registerDto;

    // check if email already exist
    const isEmailExist = await this.isEmailExist(email);
    if (isEmailExist === true) {
      throw new BadRequestException(`Email already exist: ${email}`);
    }
    // hash password
    const hashPassword = await hashPasswordHelper(password);
    const codeId = uuidv4();
    const user = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      isActive: false,
      codeId: codeId,
      codeExpired: dayjs().add(5, 'minutes'),
    });

    // Send email
    this.mailerService.sendMail({
      to: user.email, // list of receivers
      subject: 'Activate your account at @doduongdangkhoa', // Subject line
      template: 'register',
      context: {
        name: user?.name ?? user.email,
        activationCode: codeId,
      },
    });

    return {
      _id: user._id,
    };

    // send email
  }

  async handleActive(data: CodeAuthDto) {
    const user = await this.userModel.findOne({
      _id: data._id,
      codeId: data.code,
    });
    if (!user) {
      throw new BadRequestException(' Mã code không hợp lệ or hết hạn');
    }
    // Check expire code
    const isBeforeCheck = dayjs().isBefore(user.codeExpired);
    if (isBeforeCheck) {
      // Valide => update user
      await this.userModel.updateOne({ _id: data._id }, { isActive: true });
      return { isBeforeCheck };
    } else {
      throw new BadRequestException('Mã code đã hết hạn');
    }
  }

  async retryActive(email: string) {
    // Check email
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('Tài khoản không tồn tại');
    }
    if (user.isActive) {
      throw new BadRequestException('Tài khoản đã được kích hoạt');
    }

    const codeId = uuidv4();
    // Update codeId and codeExpired
    await user.updateOne({
      codeId: codeId,
      codeExpired: dayjs().add(5, 'minutes'),
    });

    // Send email
    this.mailerService.sendMail({
      to: user.email, // list of receivers
      subject: 'Activate your account at @doduongdangkhoa', // Subject line
      template: 'register',
      context: {
        name: user?.name ?? user.email,
        activationCode: codeId,
      },
    });

    return { _id: user._id };
  }
}
