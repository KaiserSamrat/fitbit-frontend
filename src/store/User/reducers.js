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
  GENERATE_FITBIT_DATA_FAIL
} from "./actionTypes";
const INIT_STATE = {
  users: [],
  singleUser: [],
  superVisor: [],
  userDetails: [],
  allUserRole: [],
  userLoading: true,
  editUserInfo: [],
  url:"",
  getUserLoading: true,
  superVisorLoading: true,
  userDetailsLoading: true,
  allUserRoleLoading: true,
  addingUser: false,
  singleUserLoading: true,
  generateUrlLoading: false,
  fitbitDataLoading: false,
  urlLoading: false,
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
              url: action.payload,
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
          addingUser: true,
        };
        case GIVE_PERMISSION_SUCCESS:
          return {
            ...state,
            addingUser: false,
          };
      case GIVE_PERMISSION_FAIL:
        return {
          ...state,
          error: action.payload,
          addingUser: false,
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
