import { getData, postData, updateData } from "../../helpers/api_helper"
import { call, put, takeEvery } from "redux-saga/effects"
import { toast } from "react-toastify"

import {
    getTopBannerSuccess,
    getTopBannerFail,
    getGiftDisbursementSuccess,
    getGiftDisbursementFail,
    getBpDeliverySuccess,
    getBpDeliveryFail,
    getDashboardCategorySuccess,
    getDashboardCategoryFail,
    getDashboardBrandSuccess,
    getDashboardBrandFail,
    getDashboardPartnerSuccess,
    getDashboardPartnerFail,
    getLeadSuccess,
    getLeadFail,
    getErrorSuccess,
    getErrorFail,
    getNotificationSuccess,
    getNotificationFail,
    getDashboardStockSuccess,
    getDashboardStockFail,
    getNotification
} from "./action.js"
import {
    GET_TOP_BANNER,
    GET_GIFT_DISBURSEMENT,
    GET_ERROR,
    GET_LEAD_TIME,
    GET_DASHBOARD_PARTNER,
    GET_DASHBOARD_BRAND,
    GET_DASHBOARD_CATEGORY,
    GET_BP_DELIVERY,
    GET_NOTIFICATION,
    UPDATE_NOTIFICATION,
    GET_DASHBOARD_STOCK

 
} from "./actionTypes"

function* fetchTopBanner({ payload: { authtoken, fromDate, toDate} }) {
  try {
    const url = `dashboard/get-banner?fromDate=${fromDate}&toDate=${toDate}`
    const response = yield call(getData, url, authtoken)

    yield put(getTopBannerSuccess(response))
  } catch (error) {
    yield put(getTopBannerFail(error))
  }
}
function* fetchGiftDisbursement({ payload: { authtoken, fromDate, toDate} }) {
    try {
      const url = `dashboard/get-sectionOne-left?fromDate=${fromDate}&toDate=${toDate}`
      const response = yield call(getData, url, authtoken)
  
      yield put(getGiftDisbursementSuccess(response))
    } catch (error) {
      yield put(getGiftDisbursementFail(error))
    }
  }
  function* fetchBpDelivery({ payload: { authtoken, fromDate, toDate} }) {
    try {
 
      // const url = `dashboard//get-sectionOne-right?fromDate=${fromDate}&toDate=${toDate}`
      const url = `dashboard/get-bp-delivery?fromDate=${fromDate}&toDate=${toDate}`
      const response = yield call(getData, url, authtoken)
  
      yield put(getBpDeliverySuccess(response))
    } catch (error) {
      yield put(getBpDeliveryFail(error))
    }
  }

  function* fetchDashboardCategory({ payload: {  authtoken, fromDate, toDate} }) {
    try {
 
      // const url = `/dashboard/get-category-disburse?fromDate=${fromDate}&toDate=${toDate}`
      const url = `/dashboard/get-category-progoti?fromDate=${fromDate}&toDate=${toDate}`
      const response = yield call(getData, url, authtoken)
  
      yield put(getDashboardCategorySuccess(response))
    } catch (error) {
      yield put(getDashboardCategoryFail(error))
    }
  }
  function* fetchDashboardBrand({ payload: {  authtoken, fromDate, toDate} }) {
    try {
 
      // const url = `/dashboard/get-brand-disburse?fromDate=${fromDate}&toDate=${toDate}`
      const url = `/dashboard/get-brands-progoti?fromDate=${fromDate}&toDate=${toDate}`
      const response = yield call(getData, url, authtoken)
  
      yield put(getDashboardBrandSuccess(response))
    } catch (error) {
      yield put(getDashboardBrandFail(error))
    }
  }
  function* fetchDashboardPartner({ payload: {  authtoken, fromDate, toDate} }) {
    try {
 
      const url = `/dashboard/get-partners-disburse?fromDate=${fromDate}&toDate=${toDate}`
      const response = yield call(getData, url, authtoken)
  
      yield put(getDashboardPartnerSuccess(response))
    } catch (error) {
      yield put(getDashboardPartnerFail(error))
    }
  }

  function* fetchDashboardLead({ payload: {  authtoken, fromDate, toDate} }) {
    try {
 
      const url = `/dashboard/get-Lead-Time?fromDate=${fromDate}&toDate=${toDate}`
      const response = yield call(getData, url, authtoken)
  
      yield put(getLeadSuccess(response))
    } catch (error) {
      yield put(getLeadFail(error))
    }
  }
  
  function* fetchDashboardError({ payload: {  authtoken, fromDate, toDate} }) {
    try {
 
      const url = `/dashboard/get-error?fromDate=${fromDate}&toDate=${toDate}`
      const response = yield call(getData, url, authtoken)
  
      yield put(getErrorSuccess(response))
    } catch (error) {
      yield put(getErrorFail(error))
    }
  }
  function* fetchNotification({ payload: {  authtoken } }) {
    try {
 
      const url = `/notification`
      const response = yield call(getData, url, authtoken)
  
      yield put(getNotificationSuccess(response))
     
    } catch (error) {
      yield put(getNotificationFail(error))
    }
  }
  function* updateNotification({ payload: { data, history, authtoken, id } }) {
    try {
      const url = `notification/${id}`;
      const response = yield call(updateData, url, data, authtoken);
      yield put(getNotification(authtoken))
    } catch (error) {
      console.log(error.response);
    }
  }
  function* fetchDashboardStock({ payload: {  authtoken } }) {
    try {
 
      const url = `/dashboard/get-stocks-progoti`
      const response = yield call(getData, url, authtoken)
  
      yield put(getDashboardStockSuccess(response))
    } catch (error) {
      yield put(getDashboardStockFail(error))
    }
  }

function* DashboardSaga() {
    yield takeEvery(GET_TOP_BANNER, fetchTopBanner)
    yield takeEvery(GET_GIFT_DISBURSEMENT, fetchGiftDisbursement)
    yield takeEvery(GET_BP_DELIVERY, fetchBpDelivery)
    yield takeEvery(GET_DASHBOARD_CATEGORY, fetchDashboardCategory)
    yield takeEvery(GET_DASHBOARD_BRAND, fetchDashboardBrand) 
    yield takeEvery(GET_DASHBOARD_PARTNER, fetchDashboardPartner)
    yield takeEvery(GET_LEAD_TIME, fetchDashboardLead)
    yield takeEvery(GET_ERROR, fetchDashboardError)
    yield takeEvery(GET_NOTIFICATION, fetchNotification)
    yield takeEvery(UPDATE_NOTIFICATION, updateNotification)
    yield takeEvery(GET_DASHBOARD_STOCK, fetchDashboardStock)
 
 
  }
  
  export default DashboardSaga