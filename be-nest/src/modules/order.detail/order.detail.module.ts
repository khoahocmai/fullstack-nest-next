import { Module } from '@nestjs/common';
import { OrderDetailService } from './order.detail.service';
import { OrderDetailController } from './order.detail.controller';

@Module({
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
})
export class OrderDetailModule {}
