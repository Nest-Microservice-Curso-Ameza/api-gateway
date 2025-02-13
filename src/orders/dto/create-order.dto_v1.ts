
// import { IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';
// import { OrderStatus } from '../enum/order.enum';
// // import { OrderStatusList } from '../enum/order.enum';

// export class CreateOrderDto {

//     @IsNumber()
//     @IsPositive()
//     totalAmount: number;

//     @IsNumber()
//     @IsPositive()
//     totalItems: number;

//     @IsEnum( OrderStatus, {
//         message: `Possible status values are ${ OrderStatus }`
//     })
//     @IsOptional()
//     status: OrderStatus = OrderStatus.PENDING

//     @IsBoolean()
//     @IsOptional()
//     paid: boolean = false;

// }





import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';

import { OrderItemDto } from './order-item.dto';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}