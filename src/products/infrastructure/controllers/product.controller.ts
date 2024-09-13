// src/products/infrastructure/product.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";

import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
import { ProductsService } from "src/products/products.service";

@Controller("products")
export class ProductController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    await this.productsService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.productsService.findOne(id);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    await this.productsService.update(id, updateProductDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.productsService.remove(id);
  }
}
