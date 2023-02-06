import { toast } from "react-toastify";
import { call, delay, put, takeEvery } from "redux-saga/effects";
import { toaster } from "../../helpers/custom/toaster";
import { getData, postData, updateData } from "../../helpers/api_helper";
import { GET_DASHBOARD_CALORIES_DATA, GET_DASHBOARD_DISTANCE_DATA, GET_DASHBOARD_ELEVATION_DATA, GET_DASHBOARD_FLOOR_DATA, GET_DASHBOARD_HEART_DATA, GET_DASHBOARD_STEP_DATA } from "./actionTypes";


import {getDashboardHeartSuccess, getDashboardHeartFail, getDashboardCaloriesDataSuccess, getDashboardCaloriesDataFail, getDashboardStepDataSuccess, getDashboardStepDataFail, getDashboardDistanceDataSuccess, getDashboardDistanceDataFail, getDashboardFloorDataSuccess, getDashboardFloorDataFail, getDashboardElevationDataSuccess, getDashboardElevationDataFail} from './action'




function* fetchDashboardHeartData({
    payload: { authtoken, categoryType, userId, startDate, endDate },
}) {
  try {
    const url = `users/data-heart?userId=${userId}&startDate=${startDate}&endDate=${endDate}`
    const response = yield call(getData, url, authtoken);

    yield put(getDashboardHeartSuccess(response));
  } catch (error) {
    yield put(getDashboardHeartFail(error));
  }
}

function* fetchDashboardCaloriesData({
  payload: { authtoken, categoryType, userId, startDate, endDate },
}) {
try {
  const url = `users/dashboard-data?categoryType=${categoryType}&userId=${userId}&startDate=${startDate}&endDate=${endDate}`
  const response = yield call(getData, url, authtoken);

  yield put(getDashboardCaloriesDataSuccess(response));
} catch (error) {
  yield put(getDashboardCaloriesDataFail(error));
}
}

function* fetchDashboardStepData({
  payload: { authtoken, categoryType, userId, startDate, endDate },
}) {
try {
  const url = `users/dashboard-data?categoryType=${categoryType}&userId=${userId}&startDate=${startDate}&endDate=${endDate}`
  const response = yield call(getData, url, authtoken);

  yield put(getDashboardStepDataSuccess(response));
} catch (error) {
  yield put(getDashboardStepDataFail(error));
}
}
function* fetchDashboardDistanceData({
  payload: { authtoken, categoryType, userId, startDate, endDate },
}) {
try {
  const url = `users/dashboard-data?categoryType=${categoryType}&userId=${userId}&startDate=${startDate}&endDate=${endDate}`
  const response = yield call(getData, url, authtoken);

  yield put(getDashboardDistanceDataSuccess(response));
} catch (error) {
  yield put(getDashboardDistanceDataFail(error));
}
}


function* fetchFloorData({
  payload: { authtoken, categoryType, userId, startDate, endDate },
}) {
try {
  const url = `users/dashboard-data?categoryType=${categoryType}&userId=${userId}&startDate=${startDate}&endDate=${endDate}`
  const response = yield call(getData, url, authtoken);

  yield put(getDashboardFloorDataSuccess(response));
} catch (error) {
  yield put(getDashboardFloorDataFail(error));
}
}
function* fetchElevationData({
  payload: { authtoken, categoryType, userId, startDate, endDate },
}) {
try {
  const url = `users/dashboard-data?categoryType=${categoryType}&userId=${userId}&startDate=${startDate}&endDate=${endDate}`
  const response = yield call(getData, url, authtoken);

  yield put(getDashboardElevationDataSuccess(response));
} catch (error) {
  yield put(getDashboardElevationDataFail(error));
}
}


function* DashboardSaga() {
  yield takeEvery(GET_DASHBOARD_HEART_DATA, fetchDashboardHeartData);

  yield takeEvery(GET_DASHBOARD_CALORIES_DATA, fetchDashboardCaloriesData);
  yield takeEvery(GET_DASHBOARD_STEP_DATA, fetchDashboardStepData);
  yield takeEvery(GET_DASHBOARD_DISTANCE_DATA, fetchDashboardDistanceData);
  yield takeEvery(GET_DASHBOARD_FLOOR_DATA, fetchFloorData);
  yield takeEvery(GET_DASHBOARD_ELEVATION_DATA, fetchElevationData);
}

export default DashboardSaga;
