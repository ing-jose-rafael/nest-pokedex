import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, {AxiosInstance} from 'axios';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(
    
    @InjectModel( Pokemon.name )
    private readonly pokemonModule:Model<Pokemon>,

  ){}

  async executeSeed() {
    await this.pokemonModule.deleteMany({}); // es igual a delete * from pokemons;
    // console.log(fetch);
    const insertPromisesArray = [];

    const { data } = await axios.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=10`);
    data.results.forEach(({ name, url })=>{
      const segments = url.split(`/`);
      // console.log(segments);
      // const no = +segments[segments.length-2];
      const no = +segments.at(-2);
      insertPromisesArray.push(
        this.pokemonModule.create({ name, no })
      );
      // this.pokemonService.create({name,no});
      // const pokemon = await this.pokemonModule.create({ name, no });
      // console.log({name,no});
    });
    await Promise.all( insertPromisesArray ); // retorna un array con cada una de la inserciones
    return `Seed Execute`;
  }

  
}
