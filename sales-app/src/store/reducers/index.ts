import { combineReducers } from '@reduxjs/toolkit';
import salesByRegionReducer from './salesByRegion.reducer';
import salesByCategoryReducer from './salesByCategory.reducer';
import ageCountReducer from './ageCount.reducer';
import occupationReducer from './occupation.reducer';
import genderChartReducer from './genderChart.reducer';
import salesVSTargetReducer from './salesVSTarget.reducer';
import topProductsReducer from './topProducts.reducer';
import profitAndRevenueReducer from './profitAndRevenue.reducer';

const rootReducer = combineReducers({
  salesByRegion: salesByRegionReducer,
  salesByCategory: salesByCategoryReducer,
  ageCount: ageCountReducer,
  occupationData: occupationReducer,
  genderChart: genderChartReducer,
  salesVSTarget: salesVSTargetReducer,
  topProductsSell: topProductsReducer,
  profitAndRevenue: profitAndRevenueReducer
});

export default rootReducer;