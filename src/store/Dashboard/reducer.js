import moment from "moment";
import {
  GET_DASHBOARD_CALORIES_DATA,
  GET_DASHBOARD_CALORIES_DATA_FAIL,
  GET_DASHBOARD_CALORIES_DATA_SUCCESS,
  GET_DASHBOARD_DISTANCE_DATA,
  GET_DASHBOARD_DISTANCE_DATA_FAIL,
  GET_DASHBOARD_DISTANCE_DATA_SUCCESS,
  GET_DASHBOARD_ELEVATION_DATA,
  GET_DASHBOARD_ELEVATION_DATA_FAIL,
  GET_DASHBOARD_ELEVATION_DATA_SUCCESS,
  GET_DASHBOARD_FLOOR_DATA,
  GET_DASHBOARD_FLOOR_DATA_FAIL,
  GET_DASHBOARD_FLOOR_DATA_SUCCESS,
  GET_DASHBOARD_HEART_DATA,
  GET_DASHBOARD_HEART_DATA_FAIL,
  GET_DASHBOARD_HEART_DATA_SUCCESS,
  GET_DASHBOARD_STEP_DATA,
  GET_DASHBOARD_STEP_DATA_FAIL,
  GET_DASHBOARD_STEP_DATA_SUCCESS,
  STORE_DASHBOARD_DATA,
} from "./actionTypes";

const INIT_STATE = {
  heartData: [],
  stepData: [],
  elevationData: [],
  floorData: [],
  distanceData: [],
  caloriesData: [],
  startDateRange: moment(new Date()).format("YYYY-MM-DD"),
  endDateRange: moment(new Date()).format("YYYY-MM-DD"),
  heartDataLoading: false,
  stepDataLoading: false,
  elevationDataLoading: false,
  floorDataLoading: false,
  distanceDataLoading: false,
  caloriesDataLoading: false,
};

const DashboardReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DASHBOARD_HEART_DATA:
      return {
        ...state,

        heartDataLoading: true,
      };

    case GET_DASHBOARD_HEART_DATA_SUCCESS:
      return {
        ...state,
        heartData: action.payload.data,
        heartDataLoading: false,
      };
    case GET_DASHBOARD_HEART_DATA_FAIL:
      return {
        ...state,
        heartDataLoading: false,
      };

    case GET_DASHBOARD_STEP_DATA:
      return {
        ...state,

        stepDataLoading: true,
      };

    case GET_DASHBOARD_STEP_DATA_SUCCESS:
      return {
        ...state,
        stepData: action.payload.data,
        stepDataLoading: false,
      };
    case GET_DASHBOARD_STEP_DATA_FAIL:
      return {
        ...state,
        stepDataLoading: false,
      };

    case GET_DASHBOARD_CALORIES_DATA:
      return {
        ...state,

        caloriesDataLoading: true,
      };

    case GET_DASHBOARD_CALORIES_DATA_SUCCESS:
      return {
        ...state,
        caloriesData: action.payload.data,
        caloriesDataLoading: false,
      };
    case GET_DASHBOARD_CALORIES_DATA_FAIL:
      return {
        ...state,
        caloriesDataLoading: false,
      };
    case GET_DASHBOARD_DISTANCE_DATA:
      return {
        ...state,

        distanceDataLoading: true,
      };

    case GET_DASHBOARD_DISTANCE_DATA_SUCCESS:
      return {
        ...state,
        distanceData: action.payload.data,
        distanceDataLoading: false,
      };
    case GET_DASHBOARD_DISTANCE_DATA_FAIL:
      return {
        ...state,
        distanceDataLoading: false,
      };

    case GET_DASHBOARD_FLOOR_DATA:
      return {
        ...state,

        floorDataLoading: true,
      };

    case GET_DASHBOARD_FLOOR_DATA_SUCCESS:
      return {
        ...state,
        floorData: action.payload.data,
        floorDataLoading: false,
      };
    case GET_DASHBOARD_FLOOR_DATA_FAIL:
      return {
        ...state,
        floorDataLoading: false,
      };

    case GET_DASHBOARD_ELEVATION_DATA:
      return {
        ...state,

        elevationDataLoading: true,
      };

    case GET_DASHBOARD_ELEVATION_DATA_SUCCESS:
      return {
        ...state,
        elevationData: action.payload.data,
        elevationDataLoading: false,
      };
    case GET_DASHBOARD_ELEVATION_DATA_FAIL:
      return {
        ...state,
        elevationDataLoading: false,
      };
    case STORE_DASHBOARD_DATA:
      return {
        ...state,
        [action.payload.name]: action.payload.data,
      };

    default:
      return state;
  }
};

export default DashboardReducer;
