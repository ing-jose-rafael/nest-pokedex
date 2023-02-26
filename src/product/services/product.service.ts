import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { FilterProductsDto } from 'src/pokemon/dto/filter-products.dto';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';

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

  findAll(params: FilterProductsDto) {
    const filters: FilterQuery<Product> = {};
    const { limit = 3, offset = 0, minPrice, maxPrice } = params;
    // agrega filtro de manera dinamica
    if (minPrice && maxPrice) {
      // $gte equivalente a >=
      // $lte equivalente a <=
      filters.price = { $gte: minPrice, $lte: maxPrice }; // 👈 filtra por un rango
    }
    /**
     * En MongoDB, los Join son denominados “Populates”, lo que hará
     * Mongo aquí es ir a buscar el objeto a la colección a la cual
     * pertenece. Es momento de realizar un “JOIN” para traer la
     * información del mismo.
     */
    return this.productModule
      .find(filters)
      .skip(offset)
      .limit(limit)
      .populate('brand')
      .populate('imagenes')
      .select(`-__v`);
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
