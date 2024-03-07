import axios from "axios";

import { ProjetConstants } from "../Actions/constantes";

export const listerProjet = () => {
  return async (dispatch) => {
    dispatch({ type:  ProjetConstants.GET_ALL_PROJET_REQUEST });
    try {
      const res = await axios.get("http://localhost:3000/projet/lister");
      if (res.status === 200) {
        dispatch({
          type:  ProjetConstants.GET_ALL_PROJET_SUCCESS,
          payload: { projet: res.data },
        });
      }
    } catch (error) {
      dispatch({
        type:  ProjetConstants.GET_ALL_PROJET_FAILURE,
        payload: { error: error.response },
      });
    }
  };
};

export const addProjetAction = (data) => {
  return async (dispatch) => {
    dispatch({ type:  ProjetConstants.ADD_PROJET_REQUEST });

    try {
      const res = await axios.post("http://localhost:3000/projet/ajouter ", data);
      dispatch({
        type:  ProjetConstants.ADD_PROJET_SUCCESS,
        payload: { createdProjet: res.data },
        
      });
    } catch (error) {
      dispatch({
        type:  ProjetConstants.ADD_PROJET_FAILURE,
        payload: { error: error.response.data }, 
      });
    }
  };
};

export const deleteProjetAction = (id) => {
    return async (dispatch) => {
      dispatch({ type:  ProjetConstants.DELETE_PROJET_REQUEST });
      try {
        const res = await axios.get(`http://localhost:3000/projet/${id}/supprimer`);
        if (res.status === 200) {
          dispatch({
            type:  ProjetConstants.DELETE_PROJET_SUCCESS,
            payload: { message: res.data },
          });
        }
      } catch (error) {
        dispatch({
          type:  ProjetConstants.DELETE_PROJET_FAILURE,
          payload: { error: error.response },
        });
      }
    };
  };
  




  export const editProjetAction = (id, data) => {
    return async (dispatch) => {
        dispatch({ type: ProjetConstants.EDIT_PROJET_REQUEST });

        try {
            const res = await axios.post(`http://localhost:3000/projet/${id}/modifier`, data);
            if (res.status === 200) {
                dispatch({
                    type: ProjetConstants.EDIT_PROJET_SUCCESS,
                    payload: { id: id, updatedData: data },
                });
            }
        } catch (error) {
            dispatch({
                type: ProjetConstants.EDIT_PROJET_FAILURE,
                payload: { error: error.response },
            });
        }
    };
};