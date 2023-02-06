import {
  ADD_USER_FAIL,
  ADD_USER_SUCCESS,
  GET_ALL_USER_FAIL,
  GET_ALL_USER_SUCCESS,

  GET_USER_DETAILS_FAIL,
  GET_USER_DETAILS_SUCCESS,
  STORE_USER_DATA,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  GET_SINGLE_USER_SUCCESS,
  GET_SINGLE_USER_FAIL,
  STORE_USER_LOADING,
  ADD_USER,
  GIVE_PERMISSION,
  GIVE_PERMISSION_SUCCESS,
  GIVE_PERMISSION_FAIL,
  GENERATE_URL,
  GENERATE_URL_SUCCESS,
  GENERATE_URL_FAIL,
  GENERATE_FITBIT_DATA,
  GENERATE_FITBIT_DATA_SUCCESS,
  GENERATE_FITBIT_DATA_FAIL,
  GET_ACTIVITY_DATA_SUCCESS,
  GET_ACTIVITY_DATA_FAIL,
  ACCESS_TOKEN,
  ACCESS_TOKEN_SUCCESS,
  ACCESS_TOKEN_FAIL,
  GET_PERMISSION,
  GET_PERMISSION_SUCCESS,
  GET_PERMISSION_FAIL,
  REMOVE_PERMISSION,
  REMOVE_PERMISSION_SUCCESS,
  REMOVE_PERMISSION_FAIL
} from "./actionTypes";
const INIT_STATE = {
  users: [],
  singleUser: [],
  superVisor: [],
  userDetails: [],
  allUserRole: [],
  userLoading: true,
  editUserInfo: [],
  activityData: [],
  permissionData: [],
  url:"",
  getUserLoading: true,
  superVisorLoading: true,
  userDetailsLoading: true,
  allUserRoleLoading: true,
  addingUser: false,
  singleUserLoading: true,
  generateUrlLoading: false,
  fitbitDataLoading: false,
  accessTokenLoading: false,
  urlLoading: false,
  activityDataLoading: true,
  permissionLoading: false,
  permissionDataLoading: false,
  removePermissionLoading: false
};

const UserReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        addingUser: true,
      };
      case ADD_USER_SUCCESS:
        return {
          ...state,
          addingUser: false,
        };
    case ADD_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        addingUser: false,
      };
      case GENERATE_URL:
        return {
          ...state,
          generateUrlLoading: true,
          urlLoading:false,
        };
        case GENERATE_URL_SUCCESS:
          return {
            ...state,
            url: action.payload,
            generateUrlLoading: false,
            urlLoading: true
          };
      case GENERATE_URL_FAIL:
        return {
          ...state,
          error: action.payload,
          generateUrlLoading: false,
          urlLoading: false
        };
        case GENERATE_FITBIT_DATA:
          return {
            ...state,
            fitbitDataLoading: true,
          
          };
          case GENERATE_FITBIT_DATA_SUCCESS:
            return {
              ...state,
             
              fitbitDataLoading: false,
              
            };
        case GENERATE_FITBIT_DATA_FAIL:
          return {
            ...state,
            error: action.payload,
            fitbitDataLoading: false,
            
          };
      case GIVE_PERMISSION:
        return {
          ...state,
          permissionLoading: true,
        };
        case GIVE_PERMISSION_SUCCESS:
          return {
            ...state,
            permissionLoading: false,
          };
      case GIVE_PERMISSION_FAIL:
        return {
          ...state,
          error: action.payload,
          permissionLoading: false,
        };
        case REMOVE_PERMISSION:
          return {
            ...state,
            removePermissionLoading: true,
          };
          case REMOVE_PERMISSION_SUCCESS:
            return {
              ...state,
              removePermissionLoading: false,
            };
        case REMOVE_PERMISSION_FAIL:
          return {
            ...state,
            error: action.payload,
            removePermissionLoading: false,
          };
      
    case GET_ALL_USER_SUCCESS:
      return {
        ...state,
        users: action.payload.data,
        getUserLoading: false,
      };
    case GET_ALL_USER_FAIL:
      return {
        ...state,
        getUserLoading: false,
      };
      case GET_SINGLE_USER_SUCCESS:
        return {
          ...state,
          singleUser: action.payload.data,
          singleUserLoading: false,
        };
      case GET_SINGLE_USER_FAIL:
        return {
          ...state,
          singleUserLoading: false,
        };
  

    case GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        userDetails: action.payload,
        userDetailsLoading: false,
      };
    case GET_USER_DETAILS_FAIL:
      return {
        ...state,
        userDetailsLoading: false,
      };

    //EDIT USER
    case GET_ACTIVITY_DATA_SUCCESS:
      return {
        ...state,
        activityData: action.payload.data,
        activityDataLoading: false,
      };
    case GET_ACTIVITY_DATA_FAIL:
      return {
        ...state,
        activityDataLoading: false,
      };

      
    case GET_PERMISSION:
      return {
        ...state,

        permissionDataLoading: true,
      };

    case GET_PERMISSION_SUCCESS:
      return {
        ...state,
        permissionData: action.payload.data,
        permissionDataLoading: false,
      };
    case GET_PERMISSION_FAIL:
      return {
        ...state,
        permissionDataLoading: false,
      };

    case STORE_USER_DATA:
      return {
        ...state,
        editUserInfo: action.payload,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        userData: state.user.map((user) =>
          user.id.toString() === action.payload.id.toString()
            ? { user, ...action.payload }
            : user
        ),
        loading: false,
      };

    case UPDATE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
      case STORE_USER_LOADING:
        return {
          ...state,
          [action.payload.name]: action.payload.data,
       
        
        }

    default:
      return state;
  }
};

export default UserReducer;
