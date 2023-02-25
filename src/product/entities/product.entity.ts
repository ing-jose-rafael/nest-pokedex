import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Brand } from './brand.entity';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Number, index: true })
  price: number;

  @Prop({ type: Number })
  stock: number;

  @Prop()
  image: string;

  //🚨 Un producto tendrá una Categoria embebidas: relaciones embebidas
  @Prop(
    raw({
      name: { type: String },
      image: { type: String },
    }),
  )
  category: Record<string, any>;

  //🚨 creamos un esquema Brand. Un producto tendrá la referencia de un Brand en su interior.
  @Prop({ type: Types.ObjectId, ref: Brand.name })
  brand: Brand | Types.ObjectId; // 👈 para indicarle a Mongoose qué tiene que esperar en esa propiedad.puede ser Brand o ObjectId
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ price: 1, stock: -1 }); // 👈  indexa por dos propiedades
