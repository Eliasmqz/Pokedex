import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Pokemon from '../pages/Pokemon'
import "./styles/PokemonCard.css"

const PokemonCard = ({pokemon}) => {

    const [pokemonInfo, setPokemonInfo] = useState()

    const navigate = useNavigate()

    const handleClickPokemon = () => {
        navigate(`/pokedex/${pokemonInfo?.id}`)
    }

    useEffect(() => {
        axios.get(pokemon.url)
        .then(res => setPokemonInfo(res.data))
        .catch(err => console.log(err))
    }, [])

    const types = pokemonInfo?.types.map(type => type.type.name).join("/")

  return (
    
    <article onClick={handleClickPokemon} className={`pokemonCard  bg__${pokemonInfo?.types[0].type.name}`}>        
        <section className='pokemonCard__header'></section>
        <section className='pokemonCard__content'>
            <img className='pokemonCard__img' src={pokemonInfo?.sprites.other["official-artwork"].front_default} alt="" />
            <h3 className='pokemonCard__name'>{pokemon.name}</h3>
            <p className='pokemonCard__types'>{types}</p>
            <p className='pokemonCard__type-title'>Type</p>
            <hr />
            <section className='pokemonCard__stats'>
                {
                    pokemonInfo?.stats.map(stat => (
                <div key={stat.stat.name} className='pokemonCard__stat'>
                    <p className='pokemonCard__stat-name'>{stat.stat.name}</p>
                    <p className='pokemonCard__stat-value'>{stat.base_stat  }</p>
                </div>
                    ))
                }
            </section>
        </section>

    </article>
  )
}

export default PokemonCard