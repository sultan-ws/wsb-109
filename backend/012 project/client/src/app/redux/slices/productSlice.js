import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async(_, thunkApi) => {
        try{
            const response = await axios.get('http://localhost:4400/api/website/products/active-products');
            return response.data.data;
        }
        catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

const initialState = {
  value: [],
  loading:false,
  error: null
};


export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
      setProducts : (state, action) => {
        state.value = action.payload;
      }
    },
    
  })
  
  // Action creators are generated for each case reducer function
  export const { } = productSlice.actions
  
  export default productSlice.reducer;