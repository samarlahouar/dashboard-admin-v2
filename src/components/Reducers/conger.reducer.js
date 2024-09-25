import { congerConstants } from "../Actions/constantes";

const initalState = {
  conger: [],
  error: null,
  createdC: {} ,
   message : "",
};

export default (state = initalState, action) => {
  switch (action.type) {
    // get all conger
    case congerConstants.GET_ALL_CONGER_REQUEST:
      state = {
        ...state,
      };
      break;
    case congerConstants.GET_ALL_CONGER_SUCCESS:
      state = {
        ...state,
        conger: action.payload.conger,
      };
      break;

    case congerConstants.GET_ALL_CONGER_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;

    // add congé
    case congerConstants.ADD_CONGER_REQUEST:
      state = {
        ...state,
      };
      break;

    case congerConstants.ADD_CONGER_SUCCESS:
      state = {
        ...state,
        createdC: action.payload.createdConger,
      };
      break;
    case congerConstants.ADD_CONGER_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;

    // delet conger
    case congerConstants.DELETE_CONGER_REQUEST:
      state = {
        ...state,
      };
      break;

    case congerConstants.DELETE_CONGER_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case congerConstants.DELETE_CONGER_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
   break;

   //edit conger

   case congerConstants.EDIT_CONGER_REQUEST:
      state = {
        ...state,
      };
      break;

    case congerConstants.EDIT_CONGER_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case congerConstants.EDIT_CONGER_FAILURE:
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
