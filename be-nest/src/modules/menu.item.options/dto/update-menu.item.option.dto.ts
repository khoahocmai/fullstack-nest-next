import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuItemOptionDto } from './create-menu.item.option.dto';

export class UpdateMenuItemOptionDto extends PartialType(CreateMenuItemOptionDto) {}
