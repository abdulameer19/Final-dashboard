import { put, takeEvery } from "redux-saga/effects";
import { getSalesByRegion } from "../reducers/salesByRegion.reducer";

function* getSalesByRegionSaga() {
  yield put<any>(getSalesByRegion());
}

export function* watchGetSalesByRegion() {
  yield takeEvery("getSalesByRegion", getSalesByRegionSaga);
}
