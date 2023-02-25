import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateCategoryDto } from './category.dtos';

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

  @IsUrl()
  @IsNotEmpty()
  // ApiProperty()
  readonly image: string;

  @IsNotEmpty()
  @ValidateNested() // 👈 para validar en cascada
  // relacion embebida
  readonly category: CreateCategoryDto;

  /*@IsNotEmpty()
  @IsMongoId()
  readonly brand: string;
  */
}
