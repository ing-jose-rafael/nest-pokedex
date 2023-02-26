import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateImagenDto } from '../dto/imagen.dtos';
import { Imagene } from '../entities/imagen.entity';

@Injectable()
export class ImagenService {
  constructor(
    @InjectModel(Imagene.name)
    private readonly imagenModel: Model<Imagene>,
  ) {}
  async create(createImagenDto: CreateImagenDto) {
    try {
      const imagen = await this.imagenModel.create(createImagenDto);
      return imagen;
    } catch (error) {
      console.log(error);
    }
  }
  findAll() {
    return this.imagenModel.find();
  }
}
