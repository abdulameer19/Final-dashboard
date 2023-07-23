import { put, takeEvery } from "redux-saga/effects";
import { getProfitAndRevenueData } from "../reducers/profitAndRevenue.reducer";

function* getProfitAndRevenue() {
    yield put<any>(getProfitAndRevenueData());
}

export function* watchGetProfitAndRevenue() {
    yield takeEvery('getProfitAndRevenue', getProfitAndRevenue);
}