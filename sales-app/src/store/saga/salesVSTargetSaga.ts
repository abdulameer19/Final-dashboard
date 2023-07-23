import { put, takeEvery } from "redux-saga/effects";
import { getSalesVSTarget } from "../reducers/salesVSTarget.reducer";

function* getSalesVSTargetData() {
    yield put<any>(getSalesVSTarget());
}

export function* watchGetSalesVSTargetData() {
    yield takeEvery('getSalesVSTargetData', getSalesVSTargetData);
}