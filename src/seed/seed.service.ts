import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

import { PokeResponse } from './interfaces/poke-response.interface';

interface InsertPok {
  name: string,
  no: number,
}

@Injectable()
export class SeedService {
  
  constructor(
    
    @InjectModel( Pokemon.name )
    private readonly pokemonModule:Model<Pokemon>,

    private readonly http: AxiosAdapter,

  ){}

  async executeSeed() {
    await this.pokemonModule.deleteMany({}); // es igual a delete * from pokemons;

    const pokemonToInsert:InsertPok[] = [];
    
    const data  = await  this.http.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=650`);
    data.results.forEach(({ name, url })=>{
      const segments = url.split(`/`);
      
      const no = +segments.at(-2);
      pokemonToInsert.push({ name, no });
      
    });
    await this.pokemonModule.insertMany( pokemonToInsert );
    return `Seed Executed`;
  }

  
}
