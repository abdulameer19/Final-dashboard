import { put, takeEvery } from "redux-saga/effects";
import { getSalesByCategory } from "../reducers/salesByCategory.reducer";

function* getAgeCount() {
    yield put<any>(getSalesByCategory());
}

export function* watchGetAgeCount() {
    yield takeEvery('getAgeCount', getAgeCount);
}