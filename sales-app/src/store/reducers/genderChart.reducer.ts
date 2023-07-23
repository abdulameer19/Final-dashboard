import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface GenderData {
  male: number;
  female: number;
  other: number;
}

interface OccupationState {
  data: GenderData;
  loading: boolean;
  error: any;
}

export const getGenderChart = createAsyncThunk(
  "genderChartSlice/getGenderChart",
  async (thunkAPI) => {
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            getGenderData {
              male
              female
              other
            }
          }`,
      }),
    };
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/graphql`,
      options
    );
    const text: any = await response.json();
    return text.data.getGenderData;
  }
);

const initialState: OccupationState = {
  data: { male: 0, female: 0, other: 0 },
  loading: false,
  error: null,
};

const genderChartSlice = createSlice({
  name: "occupation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGenderChart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getGenderChart.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getGenderChart.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
  },
});

export default genderChartSlice.reducer;
