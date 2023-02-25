import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBrandDto } from './dto/brand.dtos';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand.name)
    private readonly brandModel: Model<Brand>,
  ) {}
  async create(createBrandDto: CreateBrandDto) {
    createBrandDto.name = createBrandDto.name.toLocaleLowerCase();
    try {
      const brand = await this.brandModel.create(createBrandDto);
      return brand;
    } catch (error) {
      console.log(error);
    }
  }
  findAll() {
    return this.brandModel.find();
  }
}
