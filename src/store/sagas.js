import { all, fork } from 'redux-saga/effects';

import DashboardSaga from './Dashboard/saga';

import forgetPasswordSaga from './ForgetPassword/saga';

import LayoutSaga from './layout/saga';
import LoginSaga from './login/saga';

import { default as registrationSaga } from './registration/saga';

import UserSaga from './User/saga';

export default function* rootSaga() {
  yield all([fork(LoginSaga)]);
  yield all([fork(registrationSaga)]);
  yield all([fork(forgetPasswordSaga)]);
  yield all([fork(UserSaga)]);

  yield all([fork(DashboardSaga)]);
  yield all([fork(LayoutSaga)]);
}
