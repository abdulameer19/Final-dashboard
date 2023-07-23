import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface TopSellProductsState {
    data: any,
    loading: boolean,
    error: any
}
export const getTopProductSell = createAsyncThunk(
    'topProductsSellSlice/getSalesVSTarget',
    async (thunkAPI) => {
        let options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: `
            query{
                getTop10Products{
                    totalSoldQty
                    productName
                  }
            }`})
        }
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/graphql`, options);
        const text = await response.json();
        return text.data.getTop10Products
    }
)

const initialState: TopSellProductsState = {
    data: [],
    loading: false,
    error: null
}

const topProductsSellSlice = createSlice({
    name: 'topProductSell',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getTopProductSell.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export default topProductsSellSlice.reducer