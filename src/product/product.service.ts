import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModule: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    createProductDto.name = createProductDto.name.toLocaleLowerCase();
    try {
      const product = await this.productModule.create(createProductDto);
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    /**
     * En MongoDB, los Join son denominados “Populates”, lo que hará
     * Mongo aquí es ir a buscar el objeto a la colección a la cual
     * pertenece. Es momento de realizar un “JOIN” para traer la
     * información del mismo.
     */
    return this.productModule.find().populate('brand').select(`-__v`);
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
