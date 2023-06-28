import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
  HttpException,
} from '@nestjs/common'
import ProductsService from './products.service'
import CreateProductDto from './dto/create-product.dto'
import ProductExceptions from './exceptions/product.exceptions'

@Controller('products')
export default class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto)
  }

  @Get()
  find() {
    return this.productsService.find()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.productsService.findOne(id)
    } catch (error) {
      const errorCode = error.message as keyof typeof ProductExceptions

      throw new HttpException(
        ProductExceptions[errorCode].message,
        ProductExceptions[errorCode].statusCode,
      )
    }
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: Partial<CreateProductDto>,
  ) {
    try {
      return this.productsService.update(id, updateProductDto)
    } catch (error) {
      const errorCode = error.message as keyof typeof ProductExceptions

      throw new HttpException(
        ProductExceptions[errorCode].message,
        ProductExceptions[errorCode].statusCode,
      )
    }
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.productsService.delete(id)
    } catch (error) {
      const errorCode = error.message as keyof typeof ProductExceptions

      throw new HttpException(
        ProductExceptions[errorCode].message,
        ProductExceptions[errorCode].statusCode,
      )
    }
  }
}
