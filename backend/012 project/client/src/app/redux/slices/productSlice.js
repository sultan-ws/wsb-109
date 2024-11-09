import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
      'products/fetchProducts',
      async(_, thunkApi) =>{
        try{
          const response = await axios.get('http://localhost:4400/api/website/products/active-products');
          return response.data;
        }
        catch(error){
          return thunkApi.rejectWithValue(error.message);
        }
      }
);

const intialValue = {
  value:{},
  loading:false,
  error:null
};

export const productSlice = createSlice({
  name:'products',
  initialState:intialValue,
  reducers:{
    chanegValue :(state, action)=>{
      state.value = action.payload;
    }
  },
  extraReducers:(builder) => {
    builder
    .addCase(fetchProducts.pending, (state, action)=>{
      state.loading = true;
      console.log('pending');
    })
    .addCase(fetchProducts.fulfilled, (state, action)=>{
      state.loading = false;
      state.value = action.payload;
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log('error', action.payload);
    })
  }
});
export const {chanegValue} = productSlice.actions;
export default productSlice.reducer;