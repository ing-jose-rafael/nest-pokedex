import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {

  private defaultLimit:number;

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModule:Model<Pokemon>,

    private readonly configService: ConfigService,
  ){
    this.defaultLimit = this.configService.get<number>('DEFAULT_LIMIT');
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon = await this.pokemonModule.create( createPokemonDto );
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);  
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset=0 } = paginationDto;
    return this.pokemonModule.find()
      .limit( limit )
      .skip( offset )
      .sort({ no: 1})
      .select(`-__v`);
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    if ( !isNaN(+term) ) {
      pokemon = await this.pokemonModule.findOne({ no: term})
    }

    // seach Mongo Id
    if ( !pokemon && isValidObjectId(term) ) {
      pokemon = await this.pokemonModule.findById(term);
    }

    if( !pokemon ){
      pokemon = await this.pokemonModule.findOne({name: term.toLocaleLowerCase().trim()});
    }

    if ( !pokemon )
      throw new NotFoundException(`Pokemon with id, name or no "${term}" not found`);
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name) 
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase().trim();
    try {
      await pokemon.updateOne(updatePokemonDto,{new:true});
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);  
    }  
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModule.deleteOne({ _id: id });
    if ( deletedCount === 0 ) throw new BadRequestException(`Pokemon wiht "${ id }" mot found`);
    return true;
  }

  private handleExceptions( error: any ){
    if( error.code === 11000 )
      throw new BadRequestException(`Pokémon exists in database ${JSON.stringify( error.keyValue )}`);
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokémon - Check server logs`);  
  }
}
