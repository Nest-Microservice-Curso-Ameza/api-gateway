
import { Catch, RpcExceptionFilter, ArgumentsHost, UnauthorizedException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements RpcExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost): any {


    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    
    const rpcError: any = exception.getError();

    const status = isNaN(rpcError.codeStatus) ? 400 : +rpcError.codeStatus;

    if ( typeof rpcError === 'object' && 'codeStatus' in rpcError && 'message' in rpcError && status !== 401 ) {

      return  response.status(status).json({
        ok: false,
        status: rpcError.codeStatus,
        message: rpcError.message
      });

    }


    return response.status(status).json({
      ok: false,
      status: status,
      message: 'Unahutorize'
    })
    // console.log('response ', response)
    // console.log('request ', request)
    // console.log('error ', error) 

    // throw new UnauthorizedException('nadaaaddd')
    // return throwError(() => exception.getError());
  }
}
