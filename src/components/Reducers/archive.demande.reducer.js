import { demandearchiverConstants } from "../Actions/constantes";
const initialState = {
  archiveDemande: [], 
  error: null,
  createdC: {},
  message: "",
};

export default function archiveDemandeReducer(state = initialState, action) {
  switch (action.type) {
    case demandearchiverConstants.LISTE_DEMANDE_ARCHIVE_SUCCESS:
      return {
        ...state,
        archiveDemande: action.payload.archiveDemande
      };
    
    // add demande
    case demandearchiverConstants.AJOUTER_DEMANDE_ARCHIVE_REQUEST:
      return {
        ...state,
      };
    case demandearchiverConstants.AJOUTER_DEMANDE_ARCHIVE_SUCCESS:
      return {
        ...state,
        createdC: action.payload.createdDemande,
      };
    case demandearchiverConstants.AJOUTER_DEMANDE_ARCHIVE_FAILURE:
      return {
        ...state,
        error: action.payload && action.payload.error ? action.payload.error : "Une erreur s'est produite lors de l'ajout du demande.",
      };

    // delete conger
    case demandearchiverConstants.DELETE_DEMANDE_ARCHIVE_REQUEST:
      return {
        ...state,
      };
    case demandearchiverConstants.DELETE_DEMANDE_ARCHIVE_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
      };
    case demandearchiverConstants.DELETE_DEMANDE_ARCHIVE_FAILURE:
      return {
        ...state,
        error: action.payload && action.payload.error ? action.payload.error : "Une erreur s'est produite lors de la suppression du demande.",
      };

    default:
      return state;
  }
};
