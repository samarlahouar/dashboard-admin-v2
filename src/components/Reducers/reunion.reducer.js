import { reunionConstants } from "../Actions/constantes";

const initalState = {
  reunion: [],
  error: null,
  createdR: {} ,
   message : "",
};

export default (state = initalState, action) => {
  switch (action.type) {
    // get all reunion
    case reunionConstants.GET_ALL_REUNION_REQUEST:
      state = {
        ...state,
      };
      break;
    case reunionConstants.GET_ALL_REUNION_SUCCESS:
      state = {
        ...state,
        reunion: action.payload.reunion,
      };
      break;

    case reunionConstants.GET_ALL_REUNION_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;

    // add reunion
    case reunionConstants.ADD_REUNION_REQUEST:
      state = {
        ...state,
      };
      break;

    case reunionConstants.ADD_REUNION_SUCCESS:
      state = {
        ...state,
        createdR: action.payload.createdReunion,
      };
      break;
    case reunionConstants.ADD_REUNION_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;

    // delet reunion
    case reunionConstants.DELETE_REUNION_REQUEST:
      state = {
        ...state,
      };
      break;

    case reunionConstants.DELETE_REUNION_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case reunionConstants.DELETE_REUNION_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
   break;

   //edit reunion

   case reunionConstants.EDIT_REUNION_REQUEST:
      state = {
        ...state,
      };
      break;

    case reunionConstants.EDIT_REUNION_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case reunionConstants.EDIT_REUNION_FAILURE:
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
