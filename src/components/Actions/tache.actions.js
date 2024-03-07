import axios from "axios";

import {TacheConstants } from "../Actions/constantes";

export const listerTache = () => {
  return async (dispatch) => {
    dispatch({ type: TacheConstants.GET_ALL_TASKS_REQUEST });
    try {
      const res = await axios.get("http://localhost:3000/tache/lister");
      if (res.status === 200) {
        dispatch({
          type: TacheConstants.GET_ALL_TASKS_SUCCESS,
          payload: { tache: res.data },
        });
      }
    } catch (error) {
      dispatch({
        type: TacheConstants.GET_ALL_TASKS_FAILURE,
        payload: { error: error.response },
      });
    }
  };
};

export const addTacheAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: TacheConstants.ADD_TASKS_REQUEST });

    try {
      const res = await axios.post("http://localhost:3000/tache/ajouter ", data);
      dispatch({
        type: TacheConstants.ADD_TASKS_REQUEST,
        payload: { createdTache: res.data },
        
      });
    } catch (error) {
      dispatch({
        type: TacheConstants.ADD_TASKS_FAILURE,
        payload: { error: error.response.data }, 
      });
    }
  };
};

export const deleteTacheAction = (id) => {
    return async (dispatch) => {
      dispatch({ type: TacheConstants.DELETE_TASKS_REQUEST });
      try {
        const res = await axios.get(`http://localhost:3000/tache/${id}/supprimer`);
        if (res.status === 200) {
          dispatch({
            type: TacheConstants.DELETE_TASKS_SUCCESS,
            payload: { message: res.data },
          });
        }
      } catch (error) {
        dispatch({
          type: TacheConstants.DELETE_TASKS_FAILURE,
          payload: { error: error.response },
        });
      }
    };
  };
  




  
  export const editTacheAction = (id, data) => {
    return async (dispatch) => {
        dispatch({ type: TacheConstants.EDIT_TASKS_REQUEST });

        try {
            const res = await axios.post(`http://localhost:3000/tache/${id}/modifier`, data);
            if (res.status === 200) {
                dispatch({
                    type: TacheConstants.EDIT_TASKS_SUCCESS,
                    payload: { id: id, updatedData: data },
                });
            }
        } catch (error) {
            dispatch({
                type: TacheConstants.EDIT_TASKS_FAILURE,
                payload: { error: error.response },
            });
        }
    };
};