import { DepartementConstants } from "../Actions/constantes";

const initalState = {
  departement: [],
  error: null,
  createdD: {} ,
   message : "",
};

export default (state = initalState, action) => {
  switch (action.type) {
    // get all employer
    case DepartementConstants.GET_ALL_DEPARTEMENT_REQUEST:
      state = {
        ...state,
      };
      break;
    case DepartementConstants.GET_ALL_DEPARTEMENT_SUCCESS:
      state = {
        ...state,
        departement: action.payload.departement,
      };
      break;

    case DepartementConstants.GET_ALL_DEPARTEMENT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    // add contact
    case DepartementConstants.ADD_DEPARTEMENT_REQUEST:
      state = {
        ...state,
      };
      break;

    case DepartementConstants.ADD_DEPARTEMENT_SUCCESS:
      state = {
        ...state,
        createdD: action.payload.createdDepartement,
      };
      break;
    case DepartementConstants.ADD_DEPARTEMENT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;

    // delet EMPLOYER
    case DepartementConstants.DELETE_DEPARTEMENT_REQUEST:
      state = {
        ...state,
      };
      break;

    case DepartementConstants.DELETE_DEPARTEMENT_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case DepartementConstants.DELETE_DEPARTEMENT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
   break;

   //edit employer

   case DepartementConstants.EDIT_DEPARTEMENT_REQUEST:
      state = {
        ...state,
      };
      break;

    case DepartementConstants.EDIT_DEPARTEMENT_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case DepartementConstants.EDIT_DEPARTEMENT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
   break;


     default:
      console.log("default action");
  }
  return state;
};
