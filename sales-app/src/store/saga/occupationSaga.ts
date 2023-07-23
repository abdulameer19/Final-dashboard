import { put, takeEvery } from "redux-saga/effects";
import { getOccupation } from "../reducers/occupation.reducer";

function* getOccupationData() {
    yield put<any>(getOccupation());
}

export function* watchGetOccupationData() {
    yield takeEvery('getOccupationData', getOccupationData);
}