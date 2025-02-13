import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { UpdateOrderDto } from './dto/update-order.dto';
import { ORDERS_MS_SERVICE } from 'src/config';
import { firstValueFrom } from 'rxjs';
import { CreateOrderDto } from './dto/create-order.dto_v1';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { StatusDto } from './dto/status.dto';

@Controller('orders')

export class OrdersController {
  constructor(
    @Inject(ORDERS_MS_SERVICE) private clientOrders: ClientProxy,
  ) {}

  
  @Post()
  async create(@Payload() createOrderDto: CreateOrderDto) {

    try {

      return await firstValueFrom(
        this.clientOrders.send('createOrder', createOrderDto)
      );
      
    } catch (error) {
       throw new RpcException(error);
    }

  }


  @Get()
  async findAll(
    @Query() orderPaginationDto: OrderPaginationDto
  ) {

    try {

      return await firstValueFrom(
        this.clientOrders.send('findAllOrders', orderPaginationDto)
      );

    } catch (error) {
      throw new RpcException(error);
    }

  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string) {

    try {

      return await firstValueFrom(
         this.clientOrders.send('findOneOrder', {id})
      );
      
      
    } catch (error) {
      throw new RpcException(error);
    }
  }


  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe ) id: string,
    @Body() statusDto: StatusDto,
  ) {
    try {
      return this.clientOrders.send('changeOrderStatus', { id, status: statusDto.status })
    } catch (error) {
      throw new RpcException(error);
    }
  }

  

  
}
