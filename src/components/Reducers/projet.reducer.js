import { ProjetConstants } from "../Actions/constantes";

const initalState = {
  projet: [],
  error: null,
  createdP: {} ,
   message : "",
};

export default (state = initalState, action) => {
  switch (action.type) {
    // get all projet
    case ProjetConstants.GET_ALL_PROJET_REQUEST:
      state = {
        ...state,
      };
      break;
    case ProjetConstants.GET_ALL_PROJET_SUCCESS:
      state = {
        ...state,
        projet: action.payload.projet,
      };
      break;

    case ProjetConstants.GET_ALL_PROJET_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    // add projet
    case ProjetConstants.ADD_PROJET_REQUEST:
      state = {
        ...state,
      };
      break;

    case ProjetConstants.ADD_PROJET_SUCCESS:
      state = {
        ...state,
        createdP: action.payload.createdProjet,
      };
      break;
    case ProjetConstants.ADD_PROJET_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;

    // delet projet
    case ProjetConstants.DELETE_PROJET_REQUEST:
      state = {
        ...state,
      };
      break;

    case ProjetConstants.DELETE_PROJET_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case ProjetConstants.DELETE_PROJET_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
   break;

   //edit projet

   case ProjetConstants.EDIT_PROJET_REQUEST:
      state = {
        ...state,
      };
      break;

    case ProjetConstants.EDIT_PROJET_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case ProjetConstants.EDIT_PROJET_FAILURE:
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
