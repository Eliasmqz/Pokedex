import React from 'react'
import PokemonCard from './PokemonCard'
import "./styles/PokemonsList.css"

const PokemonsList = ({pokemons}) => {
  return (
    <div className='pokemonCard__container'>
        {
            pokemons?.map(pokemon => <PokemonCard  pokemon={pokemon} key={pokemon.url}/> )
        }
    </div>
  )
}

export default PokemonsList