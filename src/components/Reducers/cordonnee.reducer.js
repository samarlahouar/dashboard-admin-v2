import { cordonneeConstants } from "../Actions/constantes";

const initalState = {
  cordonnee: [],
  error: null,
  createdC: {} ,
   message : "",
};

export default (state = initalState, action) => {
  switch (action.type) {
    // get all projet
    case cordonneeConstants.GET_ALL_CORDONNEE_REQUEST:
      state = {
        ...state,
      };
      break;
    case cordonneeConstants.GET_ALL_CORDONNEE_SUCCESS:
      state = {
        ...state,
        cordonnee: action.payload.cordonnee,
      };
      break;

    case cordonneeConstants.GET_ALL_CORDONNEE_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    // add projet
    case cordonneeConstants.ADD_CORDONNEE_REQUEST:
      state = {
        ...state,
      };
      break;

    case cordonneeConstants.ADD_CORDONNEE_SUCCESS:
      state = {
        ...state,
        createdC: action.payload.createdCordonnee,
      };
      break;
    case cordonneeConstants.ADD_CORDONNEE_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;


   //edit projet

   case cordonneeConstants.EDIT_CORDONNEE_REQUEST:
      state = {
        ...state,
      };
      break;

    case cordonneeConstants.EDIT_CORDONNEE_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case cordonneeConstants.EDIT_CORDONNEE_FAILURE:
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
