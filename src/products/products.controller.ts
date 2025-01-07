import { BadGatewayException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCTS_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {

  constructor(
    @Inject(PRODUCTS_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto){

    
     try {
      
      return await firstValueFrom(
        this.productsClient.send({ cmd: 'created_product' }, createProductDto)
      );

     } catch (error) {
        throw new RpcException(error);
     }

  }

  @Get()
  findAll(
    @Query() paginationDto: PaginationDto
  ){
    
    // send ESPERA UNA RESPUESTA Y emit SOLO EMITE LA ACCION 
    return this.productsClient.send({ cmd: 'find_all_products' }, paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) { 

    return this.productsClient.send({ cmd: 'find_one_product' }, {id})
           .pipe(
               catchError( err => { throw new RpcException(err) } )
           )

    //  try {
      
    //   return await firstValueFrom(
    //     this.productsClient.send({ cmd: 'find_one_product' }, {id})
    //   );

    //  } catch (error) {
    //     throw new RpcException(error);
    //  }
     
  }


  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateProductDto: UpdateProductDto) {
    
    try {
      
      return await firstValueFrom(
        this.productsClient.send({ cmd: 'update_product' }, {
           id,
           ...updateProductDto
        })
      );

     } catch (error) {
        throw new RpcException(error);
     }

  }


  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    
     try {
      
      return await firstValueFrom(
        this.productsClient.send({ cmd: 'delete_product' }, {id})
      );

     } catch (error) {
        throw new RpcException(error);
     }

  }

}
