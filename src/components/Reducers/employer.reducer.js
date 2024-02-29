import { EmployerConstants } from "../Actions/constantes";

const initalState = {
  employer: [],
  error: null,
  createdE: {} ,
   message : "",
};

export default (state = initalState, action) => {
  switch (action.type) {
    // get all employer
    case EmployerConstants.GET_ALL_EMPLOYER_REQUEST:
      state = {
        ...state,
      };
      break;
    case EmployerConstants.GET_ALL_EMPLOYER_SUCCESS:
      state = {
        ...state,
        employer: action.payload.employer,
      };
      break;

    case EmployerConstants.GET_ALL_EMPLOYER_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    // add contact
    case EmployerConstants.ADD_EMPLOYER_REQUEST:
      state = {
        ...state,
      };
      break;

    case EmployerConstants.ADD_EMPLOYER_SUCCESS:
      state = {
        ...state,
        createdE: action.payload.createdEmployer,
      };
      break;
    case EmployerConstants.ADD_EMPLOYER_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;

    // delet EMPLOYER
    case EmployerConstants.DELETE_EMPLOYER_REQUEST:
      state = {
        ...state,
      };
      break;

    case EmployerConstants.DELETE_EMPLOYER_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case EmployerConstants.DELETE_EMPLOYER_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
   break;

   //edit employer

   case EmployerConstants.EDIT_EMPLOYER_REQUEST:
      state = {
        ...state,
      };
      break;

    case EmployerConstants.EDIT_EMPLOYER_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case EmployerConstants.EDIT_EMPLOYER_FAILURE:
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
