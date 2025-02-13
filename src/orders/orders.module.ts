import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, ORDERS_MS_SERVICE } from 'src/config';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [
    ClientsModule.register([
      { 
        name: ORDERS_MS_SERVICE, 
        transport: Transport.TCP,
        options: {
                host: envs.hostOrderstMicroservice,
                port: envs.portOrderstMicroservice
        },
      },
    ]),
  ]
})
export class OrdersModule {}
