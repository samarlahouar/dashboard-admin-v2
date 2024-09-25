import axios from "axios";

import {congerConstants } from "../Actions/constantes";

export const listerConger = () => {
  return async (dispatch) => {
    dispatch({ type: congerConstants.GET_ALL_CONGER_REQUEST });
    try {
      const res = await axios.get("http://localhost:3000/conger/lister");
      if (res.status === 200) {
        dispatch({
          type: congerConstants.GET_ALL_CONGER_SUCCESS,
          payload: { conger: res.data },
        });
      }
    } catch (error) {
      dispatch({
        type: congerConstants.GET_ALL_CONGER_FAILURE,
        payload: { error: error.response },
      });
    }
  };
};

export const addCongerAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: congerConstants.ADD_CONGER_REQUEST });

    try {
      const res = await axios.post("http://localhost:3000/conger/ajouter", data);
      dispatch({
        type: congerConstants.ADD_CONGER_SUCCESS,
        payload: { createdConger: res.data },
      });
    } catch (error) {
      dispatch({
        type: congerConstants.ADD_CONGER_FAILURE,
        payload: { error: error.response.data || "Une erreur s'est produite lors de l'ajout du congé." }, // Gérer les erreurs sans réponse de l'API
      });
    }
  };
};

export const deleteCongerAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: congerConstants.DELETE_CONGER_REQUEST });
    try {
      const res = await axios.get(`http://localhost:3000/conger/${id}/supprimer`);
      if (res.status === 200) {
        dispatch({
          type: congerConstants.DELETE_CONGER_SUCCESS,
          payload: { message: res.data },
        });
      }
    } catch (error) {
      dispatch({
        type: congerConstants.DELETE_CONGER_FAILURE,
        payload: { error: error.response },
      });
    }
  };
};


  

export const editCongerAction = (id, data) => {
  return async (dispatch) => {
      dispatch({ type: congerConstants.EDIT_CONGER_REQUEST });

      try {
          const res = await axios.post(`http://localhost:3000/conger/${id}/modifier`, data);
          if (res.status === 200) {
              dispatch({
                  type: congerConstants.EDIT_CONGER_SUCCESS,
                  payload: { message: res.data },
              });

              // Envoi d'e-mails de confirmation si la modification est réussie
              await sendConfirmationEmail(data.email, data.Statutdelademande); // Utilisation de la fonction
          }
      } catch (error) {
          dispatch({
              type: congerConstants.EDIT_CONGER_FAILURE,
              payload: { error: error.response },
          });
      }
  };
};

// Action pour envoyer un e-mail de confirmation
export const sendConfirmationEmail = async (email) => {
  try {
    await axios.post('http://localhost:3000/conger/send-confirmation-email', { email });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending confirmation email', error);
    throw error;
  }
};


