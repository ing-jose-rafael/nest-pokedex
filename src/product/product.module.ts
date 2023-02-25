import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductController } from './product.controller';
import { BrandController } from './brand.controller';
import { ProductService } from './product.service';
import { BrandService } from './brand.service';
import { Product, ProductSchema } from './entities/product.entity';
import { Brand, BrandSchema } from './entities/brand.entity';

@Module({
  controllers: [ProductController, BrandController],
  providers: [ProductService, BrandService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: Brand.name,
        schema: BrandSchema,
      },
    ]),
  ],
})
export class ProductModule {}
