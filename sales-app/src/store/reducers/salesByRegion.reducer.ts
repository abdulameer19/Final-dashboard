import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface SalesByRegionState {
  data: any;
  loading: boolean;
  error: any;
}

export const getSalesByRegion = createAsyncThunk(
  "salesByRegionSlice/getSalesByRegion",
  async (thunkAPI) => {
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
            query{
                getHeatMapData{
                    country{
                      id
                      value
                    }
                  }
            }`,
      }),
    };
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/graphql`,
      options
    );
    const text = await response.json();
    return text.data.getHeatMapData.country;
  }
);

const initialState: SalesByRegionState = {
  data: [],
  loading: false,
  error: null,
};

const salesByRegionSlice: any = createSlice({
  name: "salesByRegion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSalesByRegion.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default salesByRegionSlice.reducer;
