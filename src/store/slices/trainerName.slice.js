import { createSlice } from "@reduxjs/toolkit";

const trainerNameSlice = createSlice({
    name: "trainerName",
    initialState:"",
    reducers: {
        setTrainerName: (state, action) => action.payload
    }
})

export default trainerNameSlice.reducer
export const {setTrainerName} = trainerNameSlice.actions