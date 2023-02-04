import axios from 'axios';
export const API_URL = "http://139.59.21.48/flinder/api/v1";

//user account managemnet
export const axiosUserLogin = async (id, password) =>
  await axios.post(`${API_URL}/users/login`, { id, password });

export const axiosApi = axios.create({
  baseURL: API_URL,
});

export async function get(url, config = {}) {
  return await axiosApi
    .get(url, { ...config })
    .then((response) => response.data);
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then((response) => response.data);
}
export async function patch(url, data, config = {}) {
  return axiosApi
    .patch(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then((response) => response.data);
}
export async function image(url, data, authtoken) {
  return axiosApi
    .post(url, data, { headers: { Authorization: `Bearer ${authtoken}` } })
    .then(response => response.data)
}
export async function updateImage(url, data, authtoken) {
  return axiosApi
    .patch(url, data, { headers: { Authorization: `Bearer ${authtoken}` } })
    .then(response => response.data)
}
export const axiosTeacherRegistration = async (
  role,
  firstName,
  lastName,
  email,
  phoneNumber,
  instituteName,
  password,
  confirmPassword
) =>
  await axios.post(`${API_URL}/registration-teacher`, {
    role,
    firstName,
    lastName,
    email,
    phoneNumber,
    instituteName,
    password,
    confirmPassword,
  });
//Student Registration
export const axiosStudentRegistration = async (
  role,
  firstName,
  lastName,
  email,
  phoneNumber,
  instituteName,
  password,
  confirmPassword
) =>
  await axios.post(`${API_URL}/registration-student`, {
    role,
    firstName,
    lastName,
    email,
    phoneNumber,
    instituteName,
    password,
    confirmPassword,
  });
//reset password
export const axiosResetPassword = async (
  accountActivateToken,
  email,
  password,
  confirmPassword
) =>
  await axios.patch(`${API_URL}/user/account-verify`, {
    accountActivateToken,
    email,
    password,
    confirmPassword,
  });
// //forget password
export const axiosForgetPassword = async (email) =>
  await axios.patch(`${API_URL}/forget-password`, { email });
//update profile
export const axiosUpdateProfile = async (
  authtoken,
  firstName,
  lastName,
  phoneNumber
) =>
  await axios.patch(
    `${API_URL}/update-profile`,
    { firstName, lastName, phoneNumber },
    { headers: { authtoken } }
  );
//update password
export const axiosUpdatePassword = async (
  authtoken,
  currentPassword,
  password,
  confirmPassword
) =>
  await axios.patch(
    `${API_URL}/update-password`,
    { currentPassword, password, confirmPassword },
    { headers: { authtoken } }
  );

export const addUserData = async (data, authtoken) =>
  await axios.post(`${API_URL}/users`, data, {
    headers: { Authorization: `Bearer ${authtoken}` },
  });
export const getUserData = async (authtoken, role, list, currentPage) =>
  await axios.get(`${API_URL}/users/user-list/${role}/${list}/${currentPage}`, {
    headers: { Authorization: `Bearer ${authtoken}` },
  });

export const getUserDetailsData = async (authtoken, id) =>
  await axios.get(`${API_URL}/users/${id}`, {
    headers: { Authorization: `Bearer ${authtoken}` },
  });
export const addProduct = async (data, authtoken) =>
  await axios.post(`${API_URL}/product`, data, {
    headers: { Authorization: `Bearer ${authtoken}` },
  });
//EDIT USER
export const updateUserData = async (id, data, authtoken) =>
  await axios.patch(`${API_URL}/users/${id}`, data, {
    headers: { Authorization: `Bearer ${authtoken}` },
  });

export const getData = (url, authtoken) =>
  get(url, { headers: { Authorization: `Bearer ${authtoken}` } });
export const postData = (url, data, authtoken) =>
  post(url, data, { headers: { Authorization: `Bearer ${authtoken}` } });
export const updateData = (url, data, authtoken) =>
  patch(url, data, { headers: { Authorization: `Bearer ${authtoken}` } });
export const deleteData = (url, authtoken) =>
  del(url, { headers: { Authorization: `Bearer ${authtoken}` } });
