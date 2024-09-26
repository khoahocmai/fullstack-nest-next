import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuItemOptionsService } from './menu.item.options.service';
import { CreateMenuItemOptionDto } from './dto/create-menu.item.option.dto';
import { UpdateMenuItemOptionDto } from './dto/update-menu.item.option.dto';

@Controller('menu-item-options')
export class MenuItemOptionsController {
  constructor(private readonly menuItemOptionsService: MenuItemOptionsService) { }

  @Post()
  create(@Body() createMenuItemOptionDto: CreateMenuItemOptionDto) {
    return this.menuItemOptionsService.create(createMenuItemOptionDto);
  }

  @Get()
  findAll() {
    return this.menuItemOptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuItemOptionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuItemOptionDto: UpdateMenuItemOptionDto) {
    return this.menuItemOptionsService.update(+id, updateMenuItemOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuItemOptionsService.remove(+id);
  }
}
