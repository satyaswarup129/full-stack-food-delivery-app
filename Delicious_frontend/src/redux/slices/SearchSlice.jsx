import { createSlice } from "@reduxjs/toolkit";

const SearchSlice=createSlice({
    name:"search",
    initialState:{
        search:"",
    },
    reducers:{
        setSearch: (state,actions)=>{
            state.search=actions.payload
        },
    },
});

export const {setSearch} =SearchSlice.actions;
export default SearchSlice.reducer;