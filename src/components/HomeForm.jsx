import React from 'react'
import { useDispatch } from 'react-redux'
import { setTrainerName } from '../store/slices/trainerName.slice'
import "./styles/HomeForm.css"

const HomeForm = () => {
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(setTrainerName(e.target.trainerName.value.trim()))
    }

  return (
    <form className='home__form' onSubmit={handleSubmit} action="">
        <input required className='home__input' type="text" id="trainerName" placeholder='Your name here'/>
        <button className='home__submit-btn'>Start!</button>
    </form>
  )
}

export default HomeForm