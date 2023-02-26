// Tener en cuenta que este Imagene no va a estar declarado en el módulo, ya que es un documento embebido y no una colección.
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Imagene extends Document {
  @Prop({ required: true, unique: true })
  url: string;

  @Prop()
  extension: string;
}

export const ImageneSchema = SchemaFactory.createForClass(Imagene);
