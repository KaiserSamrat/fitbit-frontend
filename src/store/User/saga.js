import { toast } from "react-toastify";
import { call, delay, put, takeEvery } from "redux-saga/effects";
import { toaster } from "../../helpers/custom/toaster";
import { getData, postData, updateData } from "../../helpers/api_helper";
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
    yield put(storeUserLoading("generateUrlLoading", false));
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
    const url = "/users/fetchdata";
    response = yield call(postData, url, data, authtoken);
    toaster("success", "Data feteched successfully!");
    console.log(response);
    yield put(generateFitbitDataSuccess(response));
    // history.push("/login");
  } catch (error) {
    if (!error.response) {
      history.push("/login");
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
    yield put(storeUserLoading("addingUser", false));
    toaster("success", "Permission successfully!");
    console.log(response);
    yield put(giveDoctorPermissionSuccess(response));
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

function* UserSaga() {
  yield takeEvery(ADD_USER, onAddNewUser);
  yield takeEvery(GET_ALL_USER, fetchUser);
  yield takeEvery(GET_USER_DETAILS, fetchUserDetails);
  yield takeEvery(UPDATE_USER, onUpdateUser);
  yield takeEvery(GET_SINGLE_USER, fetchSingleUser);
  yield takeEvery(GIVE_PERMISSION, onGivePermission);
  yield takeEvery(GENERATE_URL, onGenerateUrl);
  yield takeEvery(GENERATE_FITBIT_DATA, onGenerateFitbitData);
}

export default UserSaga;
