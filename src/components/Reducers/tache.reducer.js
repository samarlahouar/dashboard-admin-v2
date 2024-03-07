import { TacheConstants } from "../Actions/constantes";

const initalState = {
  tache: [],
  error: null,
  createdT: {} ,
   message : "",
};

export default (state = initalState, action) => {
  switch (action.type) {
    // get all tache
    case TacheConstants.GET_ALL_TASKS_REQUEST:
      state = {
        ...state,
      };
      break;
    case TacheConstants.GET_ALL_TASKS_SUCCESS:
      state = {
        ...state,
        tache: action.payload.tache,
      };
      break;

    case TacheConstants.GET_ALL_TASKS_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    // add tache
    case TacheConstants.ADD_TASKS_REQUEST:
      state = {
        ...state,
      };
      break;

    case TacheConstants.ADD_TASKS_SUCCESS:
      state = {
        ...state,
        createdT: action.payload.createdTache,
      };
      break;
    case TacheConstants.ADD_TASKS_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;

    // delet tache
    case TacheConstants.DELETE_TASKS_REQUEST:
      state = {
        ...state,
      };
      break;

    case TacheConstants.DELETE_TASKS_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case TacheConstants.DELETE_TASKS_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
   break;

   //edit Tache

   case TacheConstants.EDIT_TASKS_REQUEST:
      state = {
        ...state,
      };
      break;

    case TacheConstants.EDIT_TASKS_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case TacheConstants.EDIT_TASKS_FAILURE:
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
