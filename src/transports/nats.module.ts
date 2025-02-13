import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATS_SERVICE, envs } from 'src/config';

@Module({
    imports: [
        ClientsModule.register([
          // { 
          //   name: PRODUCTS_SERVICE, 
          //   transport: Transport.TCP,
          //   options: {
          //     host: envs.hostMicroservice,
          //     port: envs.portMicroservice
          //   },
          // },
          { 
            name: NATS_SERVICE, 
            transport: Transport.NATS,
            options: {
              servers: envs.natsServers,
            },
          },
        ]),
    ],
    exports:[
        ClientsModule.register([
            // { 
            //   name: PRODUCTS_SERVICE, 
            //   transport: Transport.TCP,
            //   options: {
            //     host: envs.hostMicroservice,
            //     port: envs.portMicroservice
            //   },
            // },
            { 
              name: NATS_SERVICE, 
              transport: Transport.NATS,
              options: {
                servers: envs.natsServers,
              },
            },
        ]),
    ]
})
export class NatsModule {}
