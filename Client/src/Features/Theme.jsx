import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'night',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    themeToggler:(state)=>{
        state.theme = state.theme == "night"?"cupcake":"night"
        document.documentElement.setAttribute('data-theme', state.theme);    
        }
  }})

  export const {
  themeToggler
} = themeSlice.actions;

export default themeSlice.reducer;
