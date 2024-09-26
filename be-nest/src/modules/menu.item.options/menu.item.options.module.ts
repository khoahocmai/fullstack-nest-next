import { Module } from '@nestjs/common';
import { MenuItemOptionsService } from './menu.item.options.service';
import { MenuItemOptionsController } from './menu.item.options.controller';

@Module({
  controllers: [MenuItemOptionsController],
  providers: [MenuItemOptionsService],
})
export class MenuItemOptionsModule {}
