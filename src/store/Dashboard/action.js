import { GET_DASHBOARD_CALORIES_DATA, GET_DASHBOARD_CALORIES_DATA_FAIL, GET_DASHBOARD_CALORIES_DATA_SUCCESS, GET_DASHBOARD_DISTANCE_DATA, GET_DASHBOARD_DISTANCE_DATA_FAIL, GET_DASHBOARD_DISTANCE_DATA_SUCCESS, GET_DASHBOARD_ELEVATION_DATA, GET_DASHBOARD_ELEVATION_DATA_FAIL, GET_DASHBOARD_ELEVATION_DATA_SUCCESS, GET_DASHBOARD_FLOOR_DATA, GET_DASHBOARD_FLOOR_DATA_FAIL, GET_DASHBOARD_FLOOR_DATA_SUCCESS, GET_DASHBOARD_HEART_DATA, GET_DASHBOARD_HEART_DATA_FAIL, GET_DASHBOARD_HEART_DATA_SUCCESS, GET_DASHBOARD_STEP_DATA, GET_DASHBOARD_STEP_DATA_FAIL, GET_DASHBOARD_STEP_DATA_SUCCESS, STORE_DASHBOARD_DATA } from "./actionTypes";


export const getDashboardHeartData = (authtoken, categoryType, userId, startDate, endDate) => ({
  type: GET_DASHBOARD_HEART_DATA,
  payload: { authtoken, categoryType, userId, startDate, endDate },
});

export const getDashboardHeartSuccess = (data) => ({
  type: GET_DASHBOARD_HEART_DATA_SUCCESS,
  payload: { data },
});

export const getDashboardHeartFail = (error) => ({
  type: GET_DASHBOARD_HEART_DATA_FAIL,
  payload: error,
});
export const getDashboardStepData = (authtoken, categoryType, userId, startDate, endDate) => ({
  type: GET_DASHBOARD_STEP_DATA,
  payload: { authtoken, categoryType, userId, startDate, endDate },
});

export const getDashboardStepDataSuccess = (data) => ({
  type: GET_DASHBOARD_STEP_DATA_SUCCESS,
  payload: { data },
});

export const getDashboardStepDataFail = (error) => ({
  type: GET_DASHBOARD_STEP_DATA_FAIL,
  payload: error,
});

export const getDashboardDistanceData = (authtoken, categoryType, userId, startDate, endDate) => ({
  type: GET_DASHBOARD_DISTANCE_DATA,
  payload: { authtoken, categoryType, userId, startDate, endDate },
});

export const getDashboardDistanceDataSuccess = (data) => ({
  type: GET_DASHBOARD_DISTANCE_DATA_SUCCESS,
  payload: { data },
});

export const getDashboardDistanceDataFail = (error) => ({
  type: GET_DASHBOARD_DISTANCE_DATA_FAIL,
  payload: error,
});

export const getDashboardFloorData = (authtoken, categoryType, userId, startDate, endDate) => ({
  type: GET_DASHBOARD_FLOOR_DATA,
  payload: { authtoken, categoryType, userId, startDate, endDate },
});

export const getDashboardFloorDataSuccess = (data) => ({
  type: GET_DASHBOARD_FLOOR_DATA_SUCCESS,
  payload: { data },
});

export const getDashboardFloorDataFail = (error) => ({
  type: GET_DASHBOARD_FLOOR_DATA_FAIL,
  payload: error,
});
export const getDashboardElevationData = (authtoken, categoryType, userId, startDate, endDate) => ({
  type: GET_DASHBOARD_ELEVATION_DATA,
  payload: { authtoken, categoryType, userId, startDate, endDate },
});


export const getDashboardElevationDataSuccess = (data) => ({
  type: GET_DASHBOARD_ELEVATION_DATA_SUCCESS,
  payload: { data },
});

export const getDashboardElevationDataFail = (error) => ({
  type: GET_DASHBOARD_ELEVATION_DATA_FAIL,
  payload: error,
});
export const getDashboardCaloriesData = (authtoken, categoryType, userId, startDate, endDate) => ({
  type: GET_DASHBOARD_CALORIES_DATA,
  payload: { authtoken, categoryType, userId, startDate, endDate },
});

export const getDashboardCaloriesDataSuccess = (data) => ({
  type: GET_DASHBOARD_CALORIES_DATA_SUCCESS,
  payload: { data },
});

export const getDashboardCaloriesDataFail = (error) => ({
  type: GET_DASHBOARD_CALORIES_DATA_FAIL,
  payload: error,
});
export const storeDashboardData = (name, data) => ({
  type: STORE_DASHBOARD_DATA,
  payload: { name, data },
});
