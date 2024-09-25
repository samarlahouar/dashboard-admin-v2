import { evenementConstants } from "../Actions/constantes";

const initalState = {
  evenement: [],
  error: null,
  createdEv: {} ,
   message : "",
};

export default (state = initalState, action) => {
  switch (action.type) {
    // get all evenement
    case evenementConstants.GET_ALL_EVENEMENT_REQUEST:
      state = {
        ...state,
      };
      break;
    case evenementConstants.GET_ALL_EVENEMENT_SUCCESS:
      state = {
        ...state,
        evenement: action.payload.evenement,
      };
      break;

    case evenementConstants.GET_ALL_EVENEMENT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    // add contact
    case evenementConstants.ADD_EVENEMENT_REQUEST:
      state = {
        ...state,
      };
      break;

    case evenementConstants.ADD_EVENEMENT_SUCCESS:
      state = {
        ...state,
        createdEv: action.payload.createdEvenement,
      };
      break;
    case evenementConstants.ADD_EVENEMENT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;

    // delet evenement
    case evenementConstants.DELETE_EVENEMENT_REQUEST:
      state = {
        ...state,
      };
      break;

    case evenementConstants.DELETE_EVENEMENT_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case evenementConstants.DELETE_EVENEMENT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
   break;

   //edit evenement

   case evenementConstants.EDIT_EVENEMENT_REQUEST:
      state = {
        ...state,
      };
      break;

    case evenementConstants.EDIT_EVENEMENT_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case evenementConstants.EDIT_EVENEMENT_FAILURE:
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
