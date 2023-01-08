import React from 'react'
import HomeForm from '../components/HomeForm'
import "./styles/Home.css"

const Home = () => {
  return (
    <main className='home'>
      <img className='home__logo' src="/images/pokedexlogo.png" alt="home_logo" />
      <h1 className='home__title'>Hi, trainer!</h1>
      <h3 className='home__text'>Please enter your name to start!</h3>
      <HomeForm />
    </main>
  )
}

export default Home