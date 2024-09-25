import { demandedecompteConstants } from "../Actions/constantes";

const initalState = {
  compte: [],
  error: null,
  createdC: {} ,
   message : "",
};

export default (state = initalState, action) => {
  switch (action.type) {
    // get all evenement
    case demandedecompteConstants.LISTE_COMPTE_REQUEST:
      state = {
        ...state,
      };
      break;
    case demandedecompteConstants.LISTE_COMPTE_SUCCESS:
      state = {
        ...state,
        compte: action.payload.compte,
      };
      break;

    case demandedecompteConstants.LISTE_COMPTE_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    // add contact
    case demandedecompteConstants.AJOUTER_COMPTE_REQUEST:
      state = {
        ...state,
      };
      break;

    case demandedecompteConstants.AJOUTER_COMPTE_SUCCESS:
      state = {
        ...state,
        createdC: action.payload.createdCompte,
      };
      break;
    case demandedecompteConstants.AJOUTER_COMPTE_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;

    // delet evenement
    case demandedecompteConstants.DELETE_COMPTE_REQUEST:
      state = {
        ...state,
      };
      break;

    case demandedecompteConstants.DELETE_COMPTE_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case demandedecompteConstants.DELETE_COMPTE_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
   break;

   //edit evenement

   case demandedecompteConstants.EDIT_COMPTE_REQUEST:
      state = {
        ...state,
      };
      break;

    case demandedecompteConstants.EDIT_COMPTE_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case demandedecompteConstants.EDIT_COMPTE_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
   break;
  
   case demandedecompteConstants.SEND_CONFIRMATION_EMAIL_REQUEST:
    state = {
      ...state,
    };
    break;

  case demandedecompteConstants.SEND_CONFIRMATION_EMAIL_SUCCESS:
    state = {
      ...state,
      message: action.payload.message,
    };
    break;
  case demandedecompteConstants.SEND_CONFIRMATION_EMAIL_FAILURE:
    state = {
      ...state,
      error: action.payload.error,
    };
 break;
 case demandedecompteConstants.SEND_REJECTION_EMAIL_REQUEST:
  state = {
    ...state,
  };
  break;

case demandedecompteConstants.SEND_REJECTION_EMAIL_SUCCESS:
  state = {
    ...state,
    message: action.payload.message,
  };
  break;
case demandedecompteConstants.SEND_REJECTION_EMAIL_FAILURE:
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
