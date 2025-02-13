import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVICE, PRODUCTS_SERVICE } from 'src/config';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    NatsModule
    // ClientsModule.register([
    //   // { 
    //   //   name: PRODUCTS_SERVICE, 
    //   //   transport: Transport.TCP,
    //   //   options: {
    //   //     host: envs.hostMicroservice,
    //   //     port: envs.portMicroservice
    //   //   },
    //   // },
    //   { 
    //     name: NATS_SERVICE, 
    //     transport: Transport.NATS,
    //     options: {
    //       servers: envs.natsServers,
    //     },
    //   },
    // ]),
  ]
})
export class ProductsModule {}
