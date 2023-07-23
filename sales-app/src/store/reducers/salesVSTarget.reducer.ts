import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface SalesVSTargetState {
    data: any,
    loading: boolean,
    error: any
}
export const getSalesVSTarget = createAsyncThunk(
    'salesVSTargetSlice/getSalesVSTarget',
    async (thunkAPI) => {
        let options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: `
            query{
                getSalesVSTargetData {
                    totalSellProduct
                    expectedSellProduct
                    productName
                  }
            }`})
        }
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/graphql`, options);
        const text = await response.json();
        return text.data.getSalesVSTargetData
    }
)

const initialState: SalesVSTargetState = {
    data: [],
    loading: false,
    error: null
}

const salesVSTargetSlice = createSlice({
    name: 'salesVSTarget',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getSalesVSTarget.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export default salesVSTargetSlice.reducer