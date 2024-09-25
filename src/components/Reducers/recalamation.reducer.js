import { recalamationConstants } from "../Actions/constantes";

const initalState = {
  reclamation : [],
  error: null,
  createdRe: {} ,
   message : "",
};

export default (state = initalState, action) => {
  switch (action.type) {
    // get all reunion
    case recalamationConstants.GET_ALL_RECLAMATION_REQUEST:
      state = {
        ...state,
      };
      break;
    case recalamationConstants.GET_ALL_RECLAMATION_SUCCESS:
      state = {
        ...state,
        reclamation: action.payload.reclamation,
      };
      break;

    case recalamationConstants.GET_ALL_RECLAMATION_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;

    // add reunion
    case recalamationConstants.ADD_RECLAMATION_REQUEST:
      state = {
        ...state,
      };
      break;

    case recalamationConstants.ADD_RECLAMATION_SUCCESS:
      state = {
        ...state,
        createdRe: action.payload.createdReclamation,
      };
      break;
    case recalamationConstants.ADD_RECLAMATION_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;

    // delet reunion
    case recalamationConstants.DELETE_RECLAMATION_REQUEST:
      state = {
        ...state,
      };
      break;

    case recalamationConstants.DELETE_RECLAMATION_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case recalamationConstants.DELETE_RECLAMATION_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
   break;

   //edit reunion

   case recalamationConstants.EDIT_RECLAMATION_REQUEST:
      state = {
        ...state,
      };
      break;

    case recalamationConstants.EDIT_RECLAMATION_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case recalamationConstants.EDIT_RECLAMATION_FAILURE:
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
