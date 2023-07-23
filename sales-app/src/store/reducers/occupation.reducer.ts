import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface OccupationState {
    data: any,
    loading: boolean,
    error: any
}
export const getOccupation = createAsyncThunk(
    'occupationSlice/getOccupation',
    async (thunkAPI) => {
        let options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: `
            query{
                getOccupationData{
                    occupationName
                    number
                  }
            }`})
        }
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/graphql`, options);
        const text = await response.json();
        return text.data.getOccupationData
    }
)

const initialState: OccupationState = {
    data: [],
    loading: false,
    error: null
}

const occupationSlice = createSlice({
    name: 'occupation',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getOccupation.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export default occupationSlice.reducer