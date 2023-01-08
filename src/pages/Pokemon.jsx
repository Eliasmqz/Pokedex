import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./styles/Pokemon.css"

const Pokemon = () => {

    const [pokemonInfo, setPokemonInfo] = useState()

    const {id} = useParams()

    const getBarProgress = (valueStat) =>{
        const maxValue = 150
        return `${(valueStat * 100 ) / maxValue}%` 
    }

    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`

    useEffect(() => {
        axios.get(URL)
        .then(res => setPokemonInfo(res.data))
        .catch(err => console.log(err))
    }, [])

  return (
    <main className='Pokemon'>
        <section className='pokemonId'>
            <section className={`pokemonId__header-${pokemonInfo?.types[0].type.name}`}></section>
            <img className='pokemonId__img' src={pokemonInfo?.sprites.other["official-artwork"].front_default} alt="" />
            <h3 className='pokemonId__id'>#{pokemonInfo?.id}</h3>
            <h2 className='pokemonId__name'>{pokemonInfo?.name}</h2>
            <section className='´pokemonId__features'>
                <div className='pokemonId__feature'>
                    <p className='pokemonId__feature-name'>Weight</p>
                    <p className='pokemonId__feature-value'>{pokemonInfo?.weight}</p>
                </div>
                <div className='pokemonId__feature'>
                    <p className='pokemonId__feature-name'>Height</p>
                    <p className='pokemonId__feature-value'>{pokemonInfo?.height}</p>
                </div>               
            </section>
            <section className='pokemonId__info'>
                <div className='pokemonId__info-container'>
                    <h4 className='pokemonId__info-title'>Types</h4>
                    <div className='pokemonId__info-data'>
                        {
                            pokemonInfo?.types.map(type => <p className='pokemonId__info-value' key={type.type.name}>{type.type.name}</p>)
                        }
                    </div>
                </div>
                <div className='pokemonId__info-container'>
                    <h4 className='pokemonId__info-title'>Abilities</h4>
                    <div className='pokemonId__info-data'>
                        {
                            pokemonInfo?.abilities.map(ability => <p className='pokemonId__info-value' key={ability.ability.url}>{ability.ability.name}</p>)
                        } 
                    </div>
                </div>                
            </section>
            <section className='pokemonId__stats'>
                <h3 className='pokemonId__stats-title'>Stats</h3>
                <div className='pokemonId__stats-container'>
                    {
                        pokemonInfo?.stats.map(stat => (
                            <div className='pokemonId__stat' key={stat.stat.name}>
                            <div className='pokemonId__stat-header'>
                                <p className='pokemonId__stat-name'>{stat.stat.name}</p>
                                <p className='pokemonId__stat-value'>{stat.base_stat}/150</p>
                            </div>
                            <div className='pokemonId__stat-bar'>
                                <div style={{width: getBarProgress(stat.base_stat)}} className='pokemonId__stat-barProgress'></div>
                            </div>
                        </div>
                        ))
                    }
                </div> 
            </section>
        </section>
    </main>
  )
}

export default Pokemon