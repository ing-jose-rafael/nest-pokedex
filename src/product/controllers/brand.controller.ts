import { Body, Controller, Get, Post } from '@nestjs/common';
import { BrandService } from '../services/brand.service';
import { CreateBrandDto } from '../dto/brand.dtos';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  findAll() {
    return this.brandService.findAll();
  }
  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }
}
