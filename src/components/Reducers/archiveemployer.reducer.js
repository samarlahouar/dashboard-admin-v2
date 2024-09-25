import { archiveConstants } from "../Actions/constantes";

const initalState = {
  archiver: [],
  error: null,
  createdA: {} ,
   message : "",
};

export default (state = initalState, action) => {
  switch (action.type) {
    // get all archiver
    case archiveConstants.LISTE_EMPLOYER_ARCHIVE_REQUEST:
      state = {
        ...state,
      };
      break;
    case archiveConstants.LISTE_EMPLOYER_ARCHIVE_SUCCESS:
      state = {
        ...state,
        archiver: action.payload.archiver,
      };
      break;

    case archiveConstants.LISTE_EMPLOYER_ARCHIVE_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    // add contact
    case archiveConstants.AJOUTER_EMPLOYER_ARCHIVE_REQUEST:
      state = {
        ...state,
      };
      break;

    case archiveConstants.AJOUTER_EMPLOYER_ARCHIVE_SUCCESS:
      state = {
        ...state,
        createdA: action.payload.createdArchiver,
      };
      break;
    case archiveConstants.AJOUTER_EMPLOYER_ARCHIVE_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;

    // delet archiver
    case archiveConstants.DELETE_EMPLOYER_ARCHIVE_REQUEST:
      state = {
        ...state,
      };
      break;

    case archiveConstants.DELETE_EMPLOYER_ARCHIVE_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case archiveConstants.DELETE_EMPLOYER_ARCHIVE_FAILURE:
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
