import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface SalesByCategoryState {
    data: any,
    loading: boolean,
    error: any
}
export const getSalesByCategory = createAsyncThunk(
    'salesByCategorySlice/getSalesByCategory',
    async (thunkAPI) => {
        let options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: `
            query{
                getPieChartData{
                    category{
                      categoryName
                      number
                    }
                  }
            }`})
        }
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/graphql`, options);
        const text = await response.json();
        return text.data.getPieChartData.category
    }
)

const initialState: SalesByCategoryState = {
    data: [],
    loading: false,
    error: null
}

const salesByCategorySlice = createSlice({
    name: 'salesByCategory',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getSalesByCategory.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export default salesByCategorySlice.reducer