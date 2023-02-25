// Tener en cuenta que este Size no va a estar declarado en el módulo, ya que es un documento embebido y no una colección.
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Size extends Document {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop()
  name: string;
}

export const SizeSchema = SchemaFactory.createForClass(Size);
