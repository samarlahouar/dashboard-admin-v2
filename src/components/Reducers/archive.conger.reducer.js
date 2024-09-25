import { congerarchiverConstants } from "../Actions/constantes";
const initialState = {
  archiveConger: [], 
  error: null,
  createdC: {},
  message: "",
};

export default function archiveCongerReducer(state = initialState, action) {
  switch (action.type) {
    case congerarchiverConstants.LISTE_CONGER_ARCHIVE_SUCCESS:
      return {
        ...state,
        archiveConger: action.payload.archiverConger
      };
    
    // add congé
    case congerarchiverConstants.AJOUTER_CONGER_ARCHIVE_REQUEST:
      return {
        ...state,
      };
    case congerarchiverConstants.AJOUTER_CONGER_ARCHIVE_SUCCESS:
      return {
        ...state,
        createdC: action.payload.createdConger,
      };
    case congerarchiverConstants.AJOUTER_CONGER_ARCHIVE_FAILURE:
      return {
        ...state,
        error: action.payload && action.payload.error ? action.payload.error : "Une erreur s'est produite lors de l'ajout du congé.",
      };

    // delete conger
    case congerarchiverConstants.DELETE_CONGER_ARCHIVE_REQUEST:
      return {
        ...state,
      };
    case congerarchiverConstants.DELETE_CONGER_ARCHIVE_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
      };
    case congerarchiverConstants.DELETE_CONGER_ARCHIVE_FAILURE:
      return {
        ...state,
        error: action.payload && action.payload.error ? action.payload.error : "Une erreur s'est produite lors de la suppression du congé.",
      };

    default:
      return state;
  }
};
