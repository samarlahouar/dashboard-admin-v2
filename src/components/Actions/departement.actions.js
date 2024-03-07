import axios from "axios";

import {DepartementConstants } from "../Actions/constantes";

export const listerDepartement = () => {
  return async (dispatch) => {
    dispatch({ type: DepartementConstants.GET_ALL_DEPARTEMENT_REQUEST });
    try {
      const res = await axios.get("http://localhost:3000/departement/lister");
      if (res.status === 200) {
        dispatch({
          type: DepartementConstants.GET_ALL_DEPARTEMENT_SUCCESS,
          payload: { departement: res.data },
        });
      }
    } catch (error) {
      dispatch({
        type: DepartementConstants.GET_ALL_DEPARTEMENT_FAILURE,
        payload: { error: error.response },
      });
    }
  };
};

export const addDepartementAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: DepartementConstants.ADD_DEPARTEMENT_REQUEST });

    try {
      const res = await axios.post("http://localhost:3000/departement/ajouter ", data);
      dispatch({
        type: DepartementConstants.ADD_DEPARTEMENT_SUCCESS,
        payload: { createdDepartement: res.data },
        
      });
    } catch (error) {
      dispatch({
        type: DepartementConstants.ADD_DEPARTEMENT_FAILURE,
        payload: { error: error.response.data }, 
      });
    }
  };
};

export const deleteDepartementAction = (id) => {
    return async (dispatch) => {
      dispatch({ type: DepartementConstants.DELETE_DEPARTEMENT_REQUEST });
      try {
        const res = await axios.get(`http://localhost:3000/departement/${id}/supprimer`);
        if (res.status === 200) {
          dispatch({
            type: DepartementConstants.DELETE_DEPARTEMENT_SUCCESS,
            payload: { message: res.data },
          });
        }
      } catch (error) {
        dispatch({
          type: DepartementConstants.DELETE_DEPARTEMENT_FAILURE,
          payload: { error: error.response },
        });
      }
    };
  };
  



  export const editDepartementAction = (id, data) => {
    return async (dispatch) => {
        dispatch({ type: DepartementConstants.EDIT_DEPARTEMENT_REQUEST });

        try {
            const res = await axios.post(`http://localhost:3000/departement/${id}/modifier`, data);
            if (res.status === 200) {
                dispatch({
                    type: DepartementConstants.EDIT_DEPARTEMENT_SUCCESS,
                    payload: { id: id, updatedData: data },
                });
            }
        } catch (error) {
            dispatch({
                type: DepartementConstants.EDIT_DEPARTEMENT_FAILURE,
                payload: { error: error.response },
            });
        }
    };
};