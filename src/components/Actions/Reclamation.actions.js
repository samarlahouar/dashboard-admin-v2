import axios from "axios";

import { recalamationConstants } from "../Actions/constantes";

export const listerReclamation = () => {
  return async (dispatch) => {
    dispatch({ type:  recalamationConstants.GET_ALL_RECLAMATION_REQUEST });
    try {
      const res = await axios.get("http://localhost:3000/recalamation/lister");
      if (res.status === 200) {
        dispatch({
          type:  recalamationConstants.GET_ALL_RECLAMATION_SUCCESS,
          payload: { reclamation: res.data },
        });
      }
    } catch (error) {
      dispatch({
        type:  recalamationConstants.GET_ALL_RECLAMATION_FAILURE,
        payload: { error: error.response },
      });
    }
  };
};

export const addReclamationAction = (data) => {
  return async (dispatch) => {
    dispatch({ type:  recalamationConstants.ADD_RECLAMATION_REQUEST });

    try {
      const res = await axios.post("http://localhost:3000/recalamation/ajouter ", data);
      dispatch({
        type:  recalamationConstants.ADD_RECLAMATION_SUCCESS,
        payload: { createdReclamation: res.data },
        
      });
    } catch (error) {
      dispatch({
        type:  recalamationConstants.ADD_RECLAMATION_FAILURE,
        payload: { error: error.response.data }, 
      });
    }
  };
};

export const deleteReclamationAction = (id) => {
    return async (dispatch) => {
      dispatch({ type:  recalamationConstants.DELETE_RECLAMATION_REQUEST});
      try {
        const res = await axios.get(`http://localhost:3000/recalamation/${id}/supprimer`);
        if (res.status === 200) {
          dispatch({
            type:  recalamationConstants.DELETE_RECLAMATION_SUCCESS,
            payload: { message: res.data },
          });
        }
      } catch (error) {
        dispatch({
          type:  recalamationConstants.DELETE_RECLAMATION_FAILURE,
          payload: { error: error.response },
        });
      }
    };
  };
  




  export const editReclamationAction = (id, data) => {
    return async (dispatch) => {
        dispatch({ type: recalamationConstants.EDIT_RECLAMATION_REQUEST});

        try {
            const res = await axios.post(`http://localhost:3000/recalamation/${id}/modifier`, data);
            if (res.status === 200) {
                dispatch({
                    type: recalamationConstants.EDIT_RECLAMATION_SUCCESS,
                    payload: { id: id, updatedData: data },
                });
            }
        } catch (error) {
            dispatch({
                type: recalamationConstants.EDIT_RECLAMATION_FAILURE,
                payload: { error: error.response },
            });
        }
    };
};