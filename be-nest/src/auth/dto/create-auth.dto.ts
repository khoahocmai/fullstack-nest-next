import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsOptional()
  name: string;
}

export class CodeAuthDto {
  @IsNotEmpty({ message: '_id is required' })
  _id: string;

  @IsNotEmpty({ message: 'Code is required' })
  code: string;
}

export class ChangePasswordAuthDto {
  @IsNotEmpty({ message: 'Code is required' })
  code: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsNotEmpty({ message: 'Confirm password is required' })
  confirmPassword: string;

  @IsNotEmpty({ message: 'Email is required' })
  email: string;
}
