import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  // @ApiProperty({ description: `product's name` })
  readonly name: string;

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
  /*
  @IsNotEmpty()
  @ValidateNested()
  // ApiProperty()
  readonly category: CreateCategoryDto; 
  */

  /*@IsNotEmpty()
  @IsMongoId()
  readonly brand: string;
  */
}
