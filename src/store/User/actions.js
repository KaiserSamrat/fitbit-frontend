import {
  ADD_USER,
  ADD_USER_FAIL,
  ADD_USER_SUCCESS,
  GET_ALL_USER,
  GET_ALL_USER_FAIL,
  GET_ALL_USER_SUCCESS,


  GET_USER_DETAILS,
  GET_USER_DETAILS_FAIL,
  GET_USER_DETAILS_SUCCESS,
  STORE_USER_DATA,
  UPDATE_USER,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  GET_SINGLE_USER,
  GET_SINGLE_USER_SUCCESS,
  GET_SINGLE_USER_FAIL,
  STORE_USER_LOADING,
  GIVE_PERMISSION,
  GIVE_PERMISSION_SUCCESS,
  GIVE_PERMISSION_FAIL,
  GENERATE_URL,
  GENERATE_URL_SUCCESS,
  GENERATE_URL_FAIL,
  GENERATE_FITBIT_DATA,
  GENERATE_FITBIT_DATA_SUCCESS,
  GENERATE_FITBIT_DATA_FAIL,
  GET_ACTIVITY_DATA,
  GET_ACTIVITY_DATA_SUCCESS,
  GET_ACTIVITY_DATA_FAIL,
  ACCESS_TOKEN,
  ACCESS_TOKEN_SUCCESS,
  ACCESS_TOKEN_FAIL,
  EXTEND_TOKEN,
  EXTEND_TOKEN_SUCCESS,
  EXTEND_TOKEN_FAIL
} from "./actionTypes";

export const addUser = (data, history, authtoken) => ({
  type: ADD_USER,
  payload: { data, history, authtoken },
});

export const addUserSuccess = (data) => ({
  type: ADD_USER_SUCCESS,
  payload: data,
});

export const addUserFail = (error) => ({
  type: ADD_USER_FAIL,
  payload: error,
});
export const generateUrl = (data, history, authtoken) => ({
  type: GENERATE_URL,
  payload: { data, history, authtoken },
});

export const generateUrlSuccess = (data) => ({
  type: GENERATE_URL_SUCCESS,
  payload: data,
});

export const generateUrlFail = (error) => ({
  type: GENERATE_URL_FAIL,
  payload: error,
});
export const generateFitbitData = (data, history, authtoken) => ({
  type: GENERATE_FITBIT_DATA,
  payload: { data, history, authtoken },
});

export const generateFitbitDataSuccess = (data) => ({
  type: GENERATE_FITBIT_DATA_SUCCESS,
  payload: data,
});

export const generateFitbitDataFail = (error) => ({
  type: GENERATE_FITBIT_DATA_FAIL,
  payload: error,
});

export const giveDoctorPermission = (data, history, authtoken) => ({
  type: GIVE_PERMISSION,
  payload: { data, history, authtoken },
});

export const giveDoctorPermissionSuccess = (data) => ({
  type: GIVE_PERMISSION_SUCCESS,
  payload: data,
});

export const giveDoctorPermissionFail = (error) => ({
  type: GIVE_PERMISSION_FAIL,
  payload: error,
});
export const getUsers = (authtoken, Centralrole, value, currentPage, pageRange) => ({
  type: GET_ALL_USER,
  payload: { authtoken, Centralrole, value, currentPage, pageRange },
});

export const getUsersSuccess = (data, authtoken) => ({
  type: GET_ALL_USER_SUCCESS,
  payload: { data, authtoken },
});

export const getUsersFail = (error) => ({
  type: GET_ALL_USER_FAIL,
  payload: error,
});


export const getUserDetails = (authtoken, id) => ({
  type: GET_USER_DETAILS,
  payload: { authtoken, id },
});

export const getUserDetailsSuccess = (data) => ({
  type: GET_USER_DETAILS_SUCCESS,
  payload: { data },
});
export const getUserDetailsFail = (error) => ({
  type: GET_USER_DETAILS_FAIL,
  payload: error,
});


export const getActivityData = (authtoken, date) => ({
  type: GET_ACTIVITY_DATA,
  payload: { authtoken, date },
});

export const getActivityDataSuccess = (data, authtoken) => ({
  type: GET_ACTIVITY_DATA_SUCCESS,
  payload: { data, authtoken },
});

export const getActivityDataFail = (error) => ({
  type: GET_ACTIVITY_DATA_FAIL,
  payload: error,
});


//EDIT USER
export const storeUserData = (name, data) => ({
  type: STORE_USER_DATA,
  payload: { name, data },
});

export const updateUser = (id, data, token, history) => ({
  type: UPDATE_USER,
  payload: { id, data, token, history },
});

export const updateUserSuccess = (id, data) => ({
  type: UPDATE_USER_SUCCESS,
  payload: { id, data },
});

export const updateUserFail = (error) => ({
  type: UPDATE_USER_FAIL,
  payload: error,
});

export const getSingleUser = (authtoken, id) => ({
  type: GET_SINGLE_USER,
  payload: { authtoken, id },
});

export const getSingleUserSuccess = (data, authtoken) => ({
  type: GET_SINGLE_USER_SUCCESS,
  payload: { data, authtoken },
});

export const getSingleUserFail = (error) => ({
  type: GET_SINGLE_USER_FAIL,
  payload: error,
});
export const getExtendToken = (authtoken) => ({
  type: EXTEND_TOKEN,
  payload: { authtoken },
});

export const getExtendTokenSuccess = (data, authtoken) => ({
  type: EXTEND_TOKEN_SUCCESS,
  payload: { data, authtoken },
});

export const getExtendTokenFail = (error) => ({
  type: EXTEND_TOKEN_FAIL,
  payload: error,
});













export const storeUserLoading = (name, data) => ({
  type: STORE_USER_LOADING,
  payload: { name, data },
})
