import { put, takeEvery } from "redux-saga/effects";
import { getSalesByCategory } from "../reducers/salesByCategory.reducer";

function* getSalesByCategorySaga() {
    yield put<any>(getSalesByCategory());
}

export function* watchGetSalesByCategory() {
    yield takeEvery('getSalesByCategory', getSalesByCategorySaga);
}