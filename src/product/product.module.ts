import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductController } from './controllers/product.controller';
import { BrandController } from './controllers/brand.controller';
import { ImagenController } from './controllers/imagen.controller';
import { ProductService } from './services/product.service';
import { BrandService } from './services/brand.service';
import { Product, ProductSchema } from './entities/product.entity';
import { Brand, BrandSchema } from './entities/brand.entity';
import { ImagenService } from './services/imagen.service';
import { Imagene, ImageneSchema } from './entities/imagen.entity';

@Module({
  controllers: [ProductController, BrandController, ImagenController],
  providers: [ProductService, BrandService, ImagenService],
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
      {
        name: Imagene.name,
        schema: ImageneSchema,
      },
    ]),
  ],
})
export class ProductModule {}
