import axios from "axios";

import {reunionConstants } from "../Actions/constantes";

export const listerReunion = () => {
  return async (dispatch) => {
    dispatch({ type: reunionConstants.GET_ALL_REUNION_REQUEST });
    try {
      const res = await axios.get("http://localhost:3000/reunion/lister");
      if (res.status === 200) {
        dispatch({
          type: reunionConstants.GET_ALL_REUNION_SUCCESS,
          payload: { reunion: res.data },
        });
      }
    } catch (error) {
      dispatch({
        type: reunionConstants.GET_ALL_REUNION_FAILURE,
        payload: { error: error.response },
      });
    }
  };
};

export const addReunionAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: reunionConstants.ADD_REUNION_REQUEST });

    try {
      const res = await axios.post("http://localhost:3000/reunion/ajouter", data);
      dispatch({
        type: reunionConstants.ADD_REUNION_SUCCESS,
        payload: { createdReunion: res.data },
      });
    } catch (error) {
      dispatch({
        type: reunionConstants.ADD_REUNION_FAILURE,
        payload: { error: error.response.data || "Une erreur s'est produite lors de l'ajout du reunion." }, // Gérer les erreurs sans réponse de l'API
      });
    }
  };
};

export const deleteReunionAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: reunionConstants.DELETE_REUNION_REQUEST});
    try {
      const res = await axios.get(`http://localhost:3000/reunion/${id}/supprimer`);
      if (res.status === 200) {
        dispatch({
          type: reunionConstants.DELETE_REUNION_SUCCESS,
          payload: { message: res.data },
        });
      }
    } catch (error) {
      dispatch({
        type: reunionConstants.DELETE_REUNION_FAILURE,
        payload: { error: error.response },
      });
    }
  };
};


  



export const editReunionAction = (id, data) => {
  return async (dispatch) => {
      dispatch({ type: reunionConstants.EDIT_REUNION_REQUEST });

      try {
          const res = await axios.post(`http://localhost:3000/reunion/${id}/modifier`, data);
          if (res.status === 200) {
              dispatch({
                  type: reunionConstants.EDIT_REUNION_SUCCESS,
                  payload: { message: res.data },
              });
          }
      } catch (error) {
          dispatch({
              type: reunionConstants.EDIT_REUNION_FAILURE,
              payload: { error: error.response },
          });
      }
  };
};