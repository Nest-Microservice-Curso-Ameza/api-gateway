import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    PRODUCTS_HOST_MICROSERVICE: string;
    PRODUCTS_PORT_MICROSERVICE: number;
}


const envSchema = joi.object({
  
     PORT: joi.number().required(),
     PRODUCTS_HOST_MICROSERVICE:  joi.string().required(),
     PRODUCTS_PORT_MICROSERVICE:  joi.number().required(),
})
.unknown(true);

const { error, value } = envSchema.validate( process.env );

if ( error ) {
     throw new Error(`config validation error ${ error.message }`)
}


const endVars: EnvVars = value;

export const envs = {
    port: endVars.PORT,
    hostMicroservice:  endVars.PRODUCTS_HOST_MICROSERVICE,
    portMicroservice:  endVars.PRODUCTS_PORT_MICROSERVICE
}



