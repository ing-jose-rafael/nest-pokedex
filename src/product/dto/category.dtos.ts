import { PartialType } from '@nestjs/mapped-types';
// 🚨 El DTO será el encargado de validar la estructura de este sub documento.
import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

/**
 * DTO para la creación de la categoría con los campos que le corresponde
 * a la misma que estarán embebidos dentro del documento principal.
 */
export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
