import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async(data, thunkApi)=>{
        try{
            const response = await axios.post('http://localhost:4400/api/website/cart/add-to-cart', data);
            return response.data;
        }
        catch(error){
            console.log(error);
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async(user, thunkApi)=>{
        try{
            const response = await axios.get(`http://localhost:4400/api/website/cart/read-cart/${user}`,);
            return response.data;
        }
        catch(error){
            console.log(error);
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

const initialState = {
    value:{},
    loading:false,
    error:null
}

export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        setCart: (state, action)=>{
            state.value = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(addToCart.pending, (state, action)=>{
            loading:true
        })
        .addCase(addToCart.fulfilled, (state, action)=>{
            // state.value = action.payload;
            console.log(action.payload);
            loading:false;
        })
        .addCase(addToCart.rejected, (state, action)=>{
            // state.error = action.payload;
            console.log(action.payload);
            loading:false;
        })
        .addCase(fetchCart.fulfilled, (state, action)=>{
            state.value = action.payload;
            console.log(action.payload);
            loading:false;
        })
        .addCase(fetchCart.rejected, (state, action)=>{
            state.error = action.payload;
            console.log(action.payload);
            loading:false;
        });
    }
});

export const {setCart} = cartSlice.actions;
export default cartSlice.reducer;