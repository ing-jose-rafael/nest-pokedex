import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateImagenDto } from '../dto/imagen.dtos';

import { ImagenService } from '../services/imagen.service';

@Controller('imagen')
export class ImagenController {
  constructor(private readonly imagenService: ImagenService) {}

  @Get()
  findAll() {
    return this.imagenService.findAll();
  }
  @Post()
  create(@Body() createImagenDto: CreateImagenDto) {
    return this.imagenService.create(createImagenDto);
  }
}
