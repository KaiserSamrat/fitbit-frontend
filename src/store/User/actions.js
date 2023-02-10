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
  EXTEND_TOKEN_FAIL,
  POST_USER_DATA,
  POST_USER_DATA_SUCCESS,
  POST_USER_DATA_FAIL,
  POST_HEART_DATA,
  POST_HEART_DATA_SUCCESS,
  POST_HEART_DATA_FAIL,
  GET_PERMISSION,
  GET_PERMISSION_SUCCESS,
  GET_PERMISSION_FAIL,
  REMOVE_PERMISSION,
  REMOVE_PERMISSION_SUCCESS,
  REMOVE_PERMISSION_FAIL,
  UPDATE_PERMISSION,
  UPDATE_PERMISSION_SUCCESS,
  UPDATE_PERMISSION_FAIL
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

export const updateDoctorPermission = (data, history, authtoken, id) => ({
  type: UPDATE_PERMISSION,
  payload: { data, history, authtoken, id },
});

export const updateDoctorPermissionSuccess = (data) => ({
  type: UPDATE_PERMISSION_SUCCESS,
  payload: data,
});

export const updateDoctorPermissionFail = (error) => ({
  type: UPDATE_PERMISSION_FAIL,
  payload: error,
});


export const removeDoctorPermission = (data, history, authtoken, doctorId) => ({
  type: REMOVE_PERMISSION,
  payload: { data, history, authtoken, doctorId },
});

export const removeDoctorPermissionSuccess = (data) => ({
  type: REMOVE_PERMISSION_SUCCESS,
  payload: data,
});

export const removeDoctorPermissionFail = (error) => ({
  type: REMOVE_PERMISSION_FAIL,
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
export const getPermission = (authtoken, type) => ({
  type: GET_PERMISSION,
  payload: { authtoken, type },
});

export const getPermissionSuccess = (data) => ({
  type: GET_PERMISSION_SUCCESS,
  payload: { data },
});
export const getPermissionFail = (error) => ({
  type: GET_PERMISSION_FAIL,
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


export const postUserData = (data, history, authtoken) => ({
  type: POST_USER_DATA,
  payload: { data, history, authtoken },
});

export const postUserDataSuccess = (data) => ({
  type: POST_USER_DATA_SUCCESS,
  payload: data,
});

export const postUserDataFail = (error) => ({
  type: POST_USER_DATA_FAIL,
  payload: error,
});

export const postHeartData = (data, history, authtoken) => ({
  type: POST_HEART_DATA,
  payload: { data, history, authtoken },
});

export const postHeartDataSuccess = (data) => ({
  type: POST_HEART_DATA_SUCCESS,
  payload: data,
});

export const postHeartDataFail = (error) => ({
  type: POST_HEART_DATA_FAIL,
  payload: error,
});








export const storeUserLoading = (name, data) => ({
  type: STORE_USER_LOADING,
  payload: { name, data },
})
