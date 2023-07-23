import { put, takeEvery } from "redux-saga/effects";
import { getGenderChart } from "../reducers/genderChart.reducer";

function* getGenderChartData() {
    yield put<any>(getGenderChart());
}

export function* watchGetGenderChartData() {
    yield takeEvery('getGenderChartData', getGenderChartData);
}