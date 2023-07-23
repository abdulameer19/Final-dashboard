import { all } from 'redux-saga/effects';
import { watchGetSalesByRegion } from './salesByRegionSaga';
import { watchGetSalesByCategory } from './salesByCategory';
import { watchGetAgeCount } from './ageCountSaga';
import { watchGetOccupationData } from './occupationSaga';
import { watchGetGenderChartData } from './genderChartSaga';
import { watchGetSalesVSTargetData } from './salesVSTargetSaga';
import { watchGetProfitAndRevenue } from './profitAndRevenueSaga';


function* rootSaga() {
    yield all([watchGetSalesByRegion()])
    yield all([watchGetSalesByCategory()])
    yield all([watchGetAgeCount()])
    yield all([watchGetOccupationData()])
    yield all([watchGetGenderChartData()])
    yield all([watchGetSalesVSTargetData()])
    yield all([watchGetProfitAndRevenue()])
}

export default rootSaga;