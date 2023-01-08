import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PokemonsList from '../components/PokemonsList'
import { paginationLogic } from '../helpers/paginationLogic'
import { setTrainerName } from '../store/slices/trainerName.slice'
import "./styles/Pokedex.css"

const Pokedex = () => {

    const trainerName = useSelector(state => state.trainerName)

    const dispatch = useDispatch()

    const [pokemons, setPokemons] = useState([])
    const [pokemonFilter, setPokemonFilter] = useState([])
    const [types, setTypes] = useState([])
    const [namePokemon, setNamePokemon] = useState("")
    const [pokemonType, setPokemonType] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const handleSubmit = (e) => {
      e.preventDefault()
      const name = e.target.pokemonName.value
      setNamePokemon(name)
      setCurrentPage(1)
    }

    const handleLogout = (e) => {
      dispatch(setTrainerName(""))
    }

    const handleChangeSelect = (e) =>{
      setPokemonType(e.target.value)
      setNamePokemon("")
      setCurrentPage(1)
    }

    const {lastPage, pagesInBlock, pokemonsInPage} = paginationLogic(currentPage, pokemonFilter)

    console.log(pagesInBlock)

    const handleClickPage = (newPage) => {
      setCurrentPage(newPage)
    }

    const handleNextPage = () => {
      const newPage = currentPage + 1
      if(newPage > lastPage){
        setCurrentPage(1)
      }else{
        setCurrentPage(newPage)
      }
    }

    const handlePreviousPage = () => {
      const newPage = currentPage - 1
      if(newPage < 1){
        setCurrentPage(lastPage)
      }else{
        setCurrentPage(newPage)
      }
    }

    const handleFirstPage = () => {
       setCurrentPage(1)
    }

    const handleLastPage = () => {
      setCurrentPage(lastPage)
    }

    useEffect(() => {       
        const URL = `https://pokeapi.co/api/v2/${pokemonType ? `type/${pokemonType}/` : "pokemon/?limit=1154"}`
        axios.get(URL)
        .then(res=> {
          if(pokemonType){
            const newPokemons = res.data.pokemon.map(pokemon => pokemon.pokemon )
            setPokemons(newPokemons)
          }else{
            setPokemons(res.data.results)
          }
        })
        .catch(err => console.log(err))
    }, [pokemonType])

    useEffect(() =>{
      const URL = `https://pokeapi.co/api/v2/type/`
      axios.get(URL)
      .then(res => setTypes(res.data.results))
      .catch(err => console.log(err))
    },[])

    useEffect(() => {
      const newPokemons = pokemons.filter(pokemon => pokemon.name.includes(namePokemon))
        setPokemonFilter(newPokemons)
    }, [namePokemon, pokemons])
    


  return (
    <main className='pokedex__container'>
        <header className='pokedex__header'>
          <div className='pokedex_head'>
            <h1>Pokedex</h1>
            <img className='header__logo' src="/images/pokemonlogo.png" alt="" />
            <h3 className='logout__text' onClick={handleLogout}>Logout</h3>
          </div>
            <p>Welcome <b>{trainerName}</b>, you can search here your favorite Pokemon! </p>
            <form  onSubmit={handleSubmit} className='pokedex__form'>
              <div className='pokedex__search'>
                <input type="text" id='pokemonName'/>
                <button type='submit' >Search</button>
              </div>
              <select onChange={handleChangeSelect} className='pokedex__select'>
                <option value="">All pokemon types</option>
                {
                  types?.map(type => <option className='pokedex__select-item' value={type.name} key={type.url}>{type.name}</option>)
                }
              </select>
            </form>
        </header>
       <PokemonsList pokemons={pokemonsInPage} />
       <ul className='pokedex__listPages'>
        <li onClick={handleFirstPage}>{"<<"}</li>
        <li onClick={handlePreviousPage}>{"<"}</li>
       {
          pagesInBlock.map(pageInBlock => <li className={currentPage == pageInBlock ? "actualPage" : ""} onClick={() => handleClickPage(pageInBlock)} key={pageInBlock}>{pageInBlock}</li>)
        }
        <li onClick={handleNextPage}>{">"}</li>
        <li onClick={handleLastPage}>{">>"}</li>
       </ul>
    </main>
  )
}

export default Pokedex