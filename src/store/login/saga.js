// Login Redux States
import { toast } from "react-toastify";
import { call, put, takeEvery } from "redux-saga/effects";
import { axiosUpdateProfile, axiosUserLogin } from "../../helpers/api_helper";
import { UserError } from "../loginError/actions";
import { loginSuccess, loginUserError } from "./actions";
import { LOGIN_USER, LOGOUT_USER, UPDATE_USER_INFO } from "./actionTypes";

//3rd call async login
const loginWithEmailPasswordAsync = async (id, password) => {
  try {
    console.log("email", id);
    const response = await axiosUserLogin(id, password);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

function* loginUser({ payload: { user, history } }) {
  const { id, password } = user;

  try {
    const loginUserResponse = yield call(
      loginWithEmailPasswordAsync,
      id,
      password
    );
console.log('loginUserResponse', loginUserResponse);
    if (loginUserResponse.status === "success") {
      yield put(
        loginSuccess(
          //loginUserResponse.data.firstName,
          loginUserResponse?.token,
          loginUserResponse?.user?.email,
          loginUserResponse?.user?.role,
          loginUserResponse?.user?.fitbit,
          loginUserResponse?.user?._id,
          loginUserResponse?.user?.name,
         
        )
      );

      yield put(UserError());
      console.log("user", loginUserResponse.user.role);
      if (loginUserResponse?.user?.role === "ADMIN") {
        history.push(`/dashboard`);
      } 
      if (loginUserResponse?.user?.role === "USER") {
        console.log('ei ke');
        history.push(`/dashboard`);
      } 
      if (loginUserResponse?.user?.role === "DOCTOR") {
        history.push(`/user`);
      } 
      else {
      
        let intended = history.location.state;
        if (intended) {
          history.push(intended.from);
        } else {
          history.push("/");
        }
      }
    } else {
      yield put(UserError());
      yield put(loginUserError());
      // toast.error(loginUserResponse.message)
      yield put(UserError(loginUserResponse.message));
    }
  } catch (error) {
    // console.log("error data", error.response)
    toast.error(error.response);
    yield put(UserError(error));
    yield put(loginUserError());
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    yield put(loginSuccess());
    localStorage.removeItem("persist:primary");

    history.push("/login");
  } catch (error) {
    // yield put(apiError(error))
  }
}



function* workerUpdateUserInfo({
  payload: { firstName, lastName, phoneNo, history },
}) {}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
  yield takeEvery(UPDATE_USER_INFO, workerUpdateUserInfo);
}

export default authSaga;
