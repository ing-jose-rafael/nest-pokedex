import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateCategoryDto } from './category.dtos';
import { CreateSizesDto } from './size.dtos';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  // @ApiProperty({ description: `product's name` })
  name: string;

  @IsString()
  @IsNotEmpty()
  // ApiProperty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  // ApiProperty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  // ApiProperty()
  readonly stock: number;

  @IsArray()
  @IsNotEmpty()
  // ApiProperty()
  readonly imagenes: string[];

  @IsNotEmpty()
  @ValidateNested() // 👈 para validar en cascada
  // relacion embebida
  readonly category: CreateCategoryDto;

  @IsNotEmpty()
  @IsMongoId()
  readonly brand: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSizesDto)
  readonly sizes: CreateSizesDto[]; // 👈 1:N
}
