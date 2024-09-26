import { Module } from '@nestjs/common';
import { MenuItemsService } from './menu.items.service';
import { MenuItemsController } from './menu.items.controller';

@Module({
  controllers: [MenuItemsController],
  providers: [MenuItemsService],
})
export class MenuItemsModule {}
