import { put, takeEvery } from "redux-saga/effects";
import { getTopProductSell } from "../reducers/topProducts.reducer";

function* getTopProductSellData() {
    yield put<any>(getTopProductSell());
}

export function* watchGetTopProductSellData() {
    yield takeEvery('getTopProductSellData', getTopProductSellData);
}