import axios from "axios";

import {evenementConstants } from "../Actions/constantes";

export const listerEvenement = () => {
  return async (dispatch) => {
    dispatch({ type: evenementConstants.GET_ALL_EVENEMENT_REQUEST });
    try {
      const res = await axios.get("http://localhost:3000/evenement/lister");
      if (res.status === 200) {
        dispatch({
          type: evenementConstants.GET_ALL_EVENEMENT_SUCCESS,
          payload: { evenement: res.data },
        });
      }
    } catch (error) {
      dispatch({
        type: evenementConstants.GET_ALL_EVENEMENT_FAILURE,
        payload: { error: error.response },
      });
    }
  };
};

export const addEvenementAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: evenementConstants.ADD_EVENEMENT_REQUEST });

    try {
      const res = await axios.post("http://localhost:3000/evenement/ajouter ", data);
      dispatch({
        type: evenementConstants.ADD_EVENEMENT_SUCCESS,
        payload: { createdEvenement: res.data },
        
      });
    } catch (error) {
      dispatch({
        type: evenementConstants.ADD_EVENEMENT_FAILURE,
        payload: { error: error.response.data }, 
      });
    }
  };
};

export const deleteEvenementAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: evenementConstants.DELETE_EVENEMENT_REQUEST});
    try {
      const res = await axios.get(`http://localhost:3000/evenement/${id}/supprimer`);
      if (res.status === 200) {
        dispatch({
          type: evenementConstants.DELETE_EVENEMENT_SUCCESS,
          payload: { message: res.data },
        });
      }
    } catch (error) {
      dispatch({
        type: evenementConstants.DELETE_EVENEMENT_FAILURE,
        payload: { error: error.response },
      });
    }
  };
};


  



  export const editEvenementAction = (id, data) => {
    return async (dispatch) => {
        dispatch({ type: evenementConstants.EDIT_EVENEMENT_REQUEST});

        try {
            const res = await axios.post(`http://localhost:3000/evenement/${id}/modifier`, data);
            if (res.status === 200) {
                dispatch({
                    type: evenementConstants.EDIT_EVENEMENT_SUCCESS,
                    payload: { message: res.data },
                });
            }
        } catch (error) {
            dispatch({
                type: evenementConstants.EDIT_EVENEMENT_FAILURE,
                payload: { error: error.response },
            });
        }
    };
};