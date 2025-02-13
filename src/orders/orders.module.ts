import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, ORDERS_MS_SERVICE } from 'src/config';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [
    NatsModule
    // ClientsModule.register([
    //   { 
    //     name: ORDERS_MS_SERVICE, 
    //     transport: Transport.TCP,
    //     options: {
    //             host: envs.hostOrderstMicroservice,
    //             port: envs.portOrderstMicroservice
    //     },
    //   },
    // ]),
  ]
})
export class OrdersModule {}
