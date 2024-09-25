import { archiverConstants } from "../Actions/constantes";

const initalState = {
  archiver: [],
  error: null,
  createdA: {} ,
   message : "",
};

export default (state = initalState, action) => {
  switch (action.type) {
    // get all archiver
    case archiverConstants.LISTE_RECLAMATION_ARCHIVE_REQUEST:
      state = {
        ...state,
      };
      break;
    case archiverConstants.LISTE_RECLAMATION_ARCHIVE_SUCCESS:
      state = {
        ...state,
        archiver: action.payload.archiver,
      };
      break;

    case archiverConstants.LISTE_RECLAMATION_ARCHIVE_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    // add contact
    case archiverConstants.AJOUTER_RECLAMATION_ARCHIVE_REQUEST:
      state = {
        ...state,
      };
      break;

    case archiverConstants.AJOUTER_RECLAMATION_ARCHIVE_SUCCESS:
      state = {
        ...state,
        createdA: action.payload.createdArchiver,
      };
      break;
    case archiverConstants.AJOUTER_RECLAMATION_ARCHIVE_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;

    // delet archiver
    case archiverConstants.DELETE_RECLAMATION_ARCHIVE_REQUEST:
      state = {
        ...state,
      };
      break;

    case archiverConstants.DELETE_RECLAMATION_ARCHIVE_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case archiverConstants.DELETE_RECLAMATION_ARCHIVE_FAILURE:
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
