import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ProfitAndRevenueState {
    data: any,
    loading: boolean,
    error: any
}
export const getProfitAndRevenueData = createAsyncThunk(
    'ProfitAndRevenueSlice/getProfitAndRevenue',
    async (thunkAPI): Promise<any> => {
        let options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: `
            query{
                getRevenueAnalysisData{
                    revenue
                    cost
                    profit
                    month
                  }
            }`})
        }
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/graphql`, options);
        const text = await response.json();
        return text.data.getRevenueAnalysisData
    }
)

const initialState: ProfitAndRevenueState = {
    data: [],
    loading: false,
    error: null
}

const ProfitAndRevenueSlice = createSlice({
    name: 'profitAndRevenue',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getProfitAndRevenueData.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getProfitAndRevenueData.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
        })
        builder.addCase(getProfitAndRevenueData.rejected, (state, action) => {
            state.error = action.error
            state.loading = false
        })
    }
})

export default ProfitAndRevenueSlice.reducer