import { IsNotEmpty } from 'class-validator';

export class CreateSizesDto {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly name: string;
}
