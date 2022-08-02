import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, {AxiosInstance} from 'axios';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

import { PokeResponse } from './interfaces/poke-response.interface';

interface InsertPok {
  name: string,
  no: number,
}

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(
    
    @InjectModel( Pokemon.name )
    private readonly pokemonModule:Model<Pokemon>,

  ){}

  async executeSeed() {
    await this.pokemonModule.deleteMany({}); // es igual a delete * from pokemons;

    const pokemonToInsert:InsertPok[] = [];

    const { data } = await axios.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=10`);
    data.results.forEach(({ name, url })=>{
      const segments = url.split(`/`);
      
      const no = +segments.at(-2);
      pokemonToInsert.push({ name, no });
      
    });
    await this.pokemonModule.insertMany( pokemonToInsert );
    return `Seed Executed`;
  }

  
}
