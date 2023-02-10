import { Redirect } from 'react-router-dom';
import Login from '../Components/Authentication/Login';

import Dashboard from '../Components/Dashboard/Dashboard';
import PatientData from '../Components/Doctor/PatientData';
import AddUser from '../Components/User/AddUser';
import DoctorList from '../Components/User/DoctorList';
import DownloadData from '../Components/User/DownloadData';
import FitbitData from '../Components/User/FitbitData';
import GenerateUrl from '../Components/User/GenerateUrl';
import PermittedDoctor from '../Components/User/PermittedDoctor';
import PermittedUser from '../Components/User/PermittedUser';





import User from '../Components/User/User';
const openRoute = [
  // { path: "/logout", component: Logout },
  { path: '/login', component: Login },

  {
    path: '/add-user',
    component: AddUser,
   
  },
];

const protectedRoute = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard" />,
    roles: ['USER', 'DOCTOR', 'ADMIN'],
  },
  {
    path: '/dashboard',
    component: Dashboard,
    exact: true,
    roles: ['USER', 'DOCTOR', 'ADMIN'],
  },






  {
    path: '/user',
    component: User,
    exact: true,
    roles: ['USER', 'DOCTOR', 'ADMIN'],
  },
  {
    path: '/doctor',
    component: DoctorList,
    exact: true,
    roles: ['USER', 'DOCTOR','ADMIN'],
  },
  {
    path: '/generate-url',
    component: GenerateUrl,
    exact: true,
    roles: ['USER', 'DOCTOR','ADMIN'],
  },
  {
    path: '/fitbit-data',
    component: FitbitData,
    exact: true,
    roles: ['USER', 'DOCTOR','ADMIN'],
  },
  {
    path: '/data-download',
    component: DownloadData,
    exact: true,
    roles: ['USER','ADMIN'],
  },
  {
    path: '/patient-data/:id',
    component: PatientData,
    exact: true,
    roles: ['DOCTOR','ADMIN'],
  },
  {
    path: '/permitted-doctor',
    component: PermittedDoctor,
    exact: true,
    roles: ['USER','ADMIN'],
  },
  {
    path: '/permitted-user',
    component: PermittedUser,
    exact: true,
    roles: ['DOCTOR','ADMIN'],
  },
];

export { openRoute, protectedRoute };
