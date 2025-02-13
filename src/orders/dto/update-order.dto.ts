import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto_v1';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  id: number;
}
