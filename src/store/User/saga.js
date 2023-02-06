import { toast } from "react-toastify";
import { call, delay, put, takeEvery } from "redux-saga/effects";
import { toaster } from "../../helpers/custom/toaster";
import { deleteData, getData, postData, updateData } from "../../helpers/api_helper";
import {
  addUserData,
  getUserData,
  getUserDetailsData,
  updateUserData,
} from "../../helpers/api_helper.js";
import {
  addUserFail,
  addUserSuccess,
  getSuperVisorFail,
  getSuperVisorSuccess,
  getUserDetailsFail,
  getUserDetailsSuccess,
  getUserRoleFail,
  getUserRoleSuccess,
  getUsersFail,
  getUsersSuccess,
  updateUserFail,
  getSingleUserSuccess,
  getSingleUserFail,
  storeUserLoading,
  giveDoctorPermissionSuccess,
  giveDoctorPermissionFail,
  generateUrlSuccess,
  generateUrlFail,
  generateFitbitDataSuccess,
  generateFitbitDataFail,
  getActivityDataSuccess,
  getActivityDataFail,
  accessTokenSuccess,
  accessTokenFail,
  getExtendTokenSuccess,
  getExtendTokenFail,
  postUserDataSuccess,
  postUserDataFail,
  postHeartDataSuccess,
  postHeartDataFail,
  getPermissionSuccess,
  getPermissionFail,
  removeDoctorPermissionSuccess,
  removeDoctorPermissionFail,
  getPermission,
} from "./actions";
import {
  ADD_USER,
  GET_ALL_USER,
  GET_USER_DETAILS,
  GET_USER_ROLE,
  UPDATE_USER,
  GET_SINGLE_USER,
  GIVE_PERMISSION,
  GENERATE_URL,
  GENERATE_FITBIT_DATA,
  GET_ACTIVITY_DATA,
  ACCESS_TOKEN,
  EXTEND_TOKEN,
  POST_USER_DATA,
  POST_HEART_DATA,
  GET_PERMISSION,
  REMOVE_PERMISSION,
} from "./actionTypes";

function* onAddNewUser({ payload: { data, history, authtoken } }) {
  try {
    let response;
    const url = "/users/signup";
    response = yield call(postData, url, data, authtoken);
    yield put(storeUserLoading("addingUser", false));
    toaster("success", "Users added successfully!");
    console.log(response);
    yield put(addUserSuccess(response));
    history.push("/login");
  } catch (error) {
    if (!error.response) {
      history.push("/login");
    } else {
      let message = error.response.data.message;
      yield put(addUserFail(message));
      toast.error(message);
    }
  }
}
function* onGenerateUrl({ payload: { data, history, authtoken } }) {
  try {
    let response;
    const url = "users/generate-url";
    response = yield call(postData, url, data, authtoken);
   
    toaster("success", "Url Generated successfully!");
    if(response.status==="success")
    yield put(generateUrlSuccess(response?.data));
     history.push("/fitbit-data");
  } catch (error) {
    if (!error.response) {
      history.push("/fitbit-data");
    } else {
      let message = error.response.data.message;
      yield put(generateUrlFail(message));
      toast.error(message);
    }
  }
}
function* onGenerateFitbitData({ payload: { data, history, authtoken } }) {
  try {
    let response;
    const url = "/users/get-access-token";
    response = yield call(postData, url, data, authtoken);
    console.log(response);
    yield put(generateFitbitDataSuccess(response));
    history.push('/data-download')
   
  } catch (error) {
    if (!error.response) {
      history.push('/data-download')
    } else {
      let message = error.response.data.message;
      yield put(generateFitbitDataFail(message));
      toast.error(message);
    }
  }
}


function* fetchUser({
  payload: { authtoken, Centralrole, value, currentPage, pageRange },
}) {
  try {
    const url = `/users?pageNo=${currentPage}&search=${
      value || ""
    }&role=${Centralrole || ""}&limit=${pageRange}`;
    const response = yield call(getData, url, authtoken);

    yield put(getUsersSuccess(response));
  } catch (error) {
    yield put(getUsersFail(error));
  }
}
function* fetchSingleUser({ payload: { authtoken, id } }) {
  try {
    console.log("authtoken", authtoken);
    const url = `/users/${id}`;
    const response = yield call(getData, url, authtoken);

    yield put(getSingleUserSuccess(response));
  } catch (error) {
    yield put(getSingleUserFail(error));
  }
}



function* fetchUserDetails({ payload: { authtoken, id } }) {
  try {
    const response = yield call(getUserDetailsData, authtoken, id);
    yield put(getUserDetailsSuccess(response));
    // console.log('line 15', response.data.users);
  } catch (error) {
    yield put(getUserDetailsFail(error));
    console.log("hi");
  }
}
//EDIT USER
function* onUpdateUser({ payload: { id, data, token, history } }) {
  try {
    const response = yield call(updateUserData, id, data, token);

    toast("🦄 User updated successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    //yield put(getUserValue(token, 1, 10));
    if (response.status === 200) {
      history.push("/user-list");
    }
  } catch (error) {
    console.log(error.response);
    yield put(updateUserFail(error));
  }
}
function* onGivePermission({ payload: { data, history, authtoken } }) {
  try {
    let response;
    const url = "/permission";
    response = yield call(postData, url, data, authtoken);
    
    console.log(response);
    yield put(giveDoctorPermissionSuccess(response));
   
    if(response?.status==="Failed"){
      toaster("warning", "Permission already given!");
    }
    else{
      toaster("success", "Permission Given Successfully!");
    }
    history.push("/doctor");
  } catch (error) {
    if (!error.response) {
      history.push("/doctor");
    } else {
      let message = error.response.data.message;
      yield put(giveDoctorPermissionFail(message));
      toast.error(message);
    }
  }
}
function* onRemovePermission({ payload: { data, history, authtoken, doctorId } }) {
  try {
    let response;
    const url = `/permission/${doctorId}`;
    response = yield call(deleteData, url, authtoken);
    
    console.log(response);
    yield put(removeDoctorPermissionSuccess(response));
    let message = "Permission removed Successfully";
    toast.success(message);
    yield put(getPermission(authtoken));
  } catch (error) {
    if (!error.response) {
      history.push("/permitted-doctor");
    } else {
      let message = error.response.data.message;
      yield put(removeDoctorPermissionFail(message));
      toast.error(message);
    }
  }
}
function* fetchActivityData({
  payload: { authtoken, date },
}) {
  try {
    const url = `users/get-activity-data?date=${date}`;
    const response = yield call(getData, url, authtoken);

    yield put(getActivityDataSuccess(response));
  } catch (error) {
    yield put(getActivityDataFail(error));
  }
}
function* fetchExtendToken({
  payload: { authtoken },
}) {
  try {
    const url = `users/get-extend-token`;
    const response = yield call(getData, url, authtoken);

    yield put(getExtendTokenSuccess(response));
  } catch (error) {
    yield put(getExtendTokenFail(error));
  }
}
function* onPostUserData({ payload: { data, history, authtoken } }) {
  try {
    let response;
    const url = "users/data-entry";
    response = yield call(postData, url, data, authtoken);
    console.log(response);
    yield put(postUserDataSuccess(response));
   
   
  } catch (error) {
    if (!error.response) {
    
    } else {
      let message = error.response.data.message;
      yield put(postUserDataFail(message));
      toast.error(message);
    }
  }
}
function* onPostHeartData({ payload: { data, history, authtoken } }) {
  try {
    let response;
    console.log();
    const url = "users/data-entry-heart";
    response = yield call(postData, url, data, authtoken);
    console.log(response);
    yield put(postHeartDataSuccess(response));
   
   
  } catch (error) {
    if (!error.response) {
    
    } else {
      let message = error.response.data.message;
      yield put(postHeartDataFail(message));
      toast.error(message);
    }
  }
}
function* fetchPermissionData({
  payload: { authtoken },
}) {
  try {
    const url = `/permission`;
    const response = yield call(getData, url, authtoken);

    yield put(getPermissionSuccess(response));
  } catch (error) {
    yield put(getPermissionFail(error));
  }
}
function* UserSaga() {
  yield takeEvery(ADD_USER, onAddNewUser);
  yield takeEvery(GET_ALL_USER, fetchUser);
  yield takeEvery(GET_USER_DETAILS, fetchUserDetails);
  yield takeEvery(UPDATE_USER, onUpdateUser);
  yield takeEvery(GET_SINGLE_USER, fetchSingleUser);
  yield takeEvery(GIVE_PERMISSION, onGivePermission);
  yield takeEvery(GENERATE_URL, onGenerateUrl);
  yield takeEvery(GENERATE_FITBIT_DATA, onGenerateFitbitData);
  yield takeEvery(GET_ACTIVITY_DATA, fetchActivityData);
  yield takeEvery(EXTEND_TOKEN, fetchExtendToken);
  yield takeEvery(POST_USER_DATA, onPostUserData);
  yield takeEvery(POST_HEART_DATA, onPostHeartData);
  yield takeEvery(GET_PERMISSION, fetchPermissionData);
  yield takeEvery(REMOVE_PERMISSION, onRemovePermission);
}

export default UserSaga;
