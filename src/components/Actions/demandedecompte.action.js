import axios from "axios";

import {demandedecompteConstants } from "../Actions/constantes";

export const listerCompte= () => {
  return async (dispatch) => {
    dispatch({ type: demandedecompteConstants.LISTE_COMPTE_REQUEST});
    try {
      const res = await axios.get("http://localhost:3000/demandedecompte/lister");
      if (res.status === 200) {
        dispatch({
          type: demandedecompteConstants.LISTE_COMPTE_SUCCESS,
          payload: { compte: res.data },
        });
      }
    } catch (error) {
      dispatch({
        type: demandedecompteConstants.LISTE_COMPTE_FAILURE,
        payload: { error: error.response },
      });
    }
  };
};

export const addCompteAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: demandedecompteConstants.AJOUTER_COMPTE_REQUEST });

    try {
      const res = await axios.post("http://localhost:3000/demandedecompte/ajouter ", data);
      dispatch({
        type: demandedecompteConstants.AJOUTER_COMPTE_SUCCESS,
        payload: { createdCompte: res.data },
        
      });
    } catch (error) {
      dispatch({
        type: demandedecompteConstants.AJOUTER_COMPTE_FAILURE,
        payload: { error: error.response.data }, 
      });
    }
  };
};

export const deleteCompteAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: demandedecompteConstants.DELETE_COMPTE_REQUEST});
    try {
      const res = await axios.get(`http://localhost:3000/demandedecompte/${id}/supprimer`);
      if (res.status === 200) {
        dispatch({
          type: demandedecompteConstants.DELETE_COMPTE_SUCCESS,
          payload: { message: res.data },
        });
      }
    } catch (error) {
      dispatch({
        type: demandedecompteConstants.DELETE_COMPTE_FAILURE,
        payload: { error: error.response },
      });
    }
  };
};


  



  export const editCompteAction = (id, data) => {
    return async (dispatch) => {
        dispatch({ type: demandedecompteConstants.EDIT_COMPTE_REQUEST});

        try {
            const res = await axios.post(`http://localhost:3000/demandedecompte/${id}/modifier`, data);
            if (res.status === 200) {
                dispatch({
                    type: demandedecompteConstants.EDIT_COMPTE_SUCCESS,
                    payload: { message: res.data },
                });
            }
        } catch (error) {
            dispatch({
                type: demandedecompteConstants.EDIT_COMPTE_FAILURE,
                payload: { error: error.response },
            });
        }
    };
};
// Action pour envoyer un e-mail de confirmation
export const sendConfirmationEmail = async (email) => {
  try {
    await axios.post('http://localhost:3000/demandedecompte/send-confirmation-email', { email });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending confirmation email', error);
    throw error;
  }
};

// Action pour envoyer un e-mail de refus
export const sendRejectionEmail = async (email) => {
  try {
    await axios.post('http://localhost:3000/demandedecompte/send-rejection-email', { email });
    console.log('Rejection email sent successfully');
  } catch (error) {
    console.error('Error sending rejection email', error);
    throw error;
  }
};