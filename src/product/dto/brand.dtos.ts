import { PartialType } from '@nestjs/mapped-types';
// 🚨 El DTO será el encargado de validar la estructura de este sub documento.
import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

/**
 * DTO para la creación de la marca con los campos que le corresponde
 * a la misma que estarán embebidos dentro del documento principal.
 */
export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
