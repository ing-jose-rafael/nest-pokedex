import { PartialType } from '@nestjs/mapped-types';
// 🚨 El DTO será el encargado de validar la estructura de este sub documento.
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

/**
 * DTO para la creación de la categoría con los campos que le corresponde
 * a la misma que estarán embebidos dentro del documento principal.
 */
export class CreateImagenDto {
  @IsString()
  @IsNotEmpty()
  readonly url: string;

  @IsString()
  @IsOptional()
  readonly extension: string;
}

export class UpdateImagenDto extends PartialType(CreateImagenDto) {}
