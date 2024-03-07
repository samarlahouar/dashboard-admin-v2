import axios from "axios";

import {EmployerConstants } from "../Actions/constantes";

export const listerEmployer = () => {
  return async (dispatch) => {
    dispatch({ type: EmployerConstants.GET_ALL_EMPLOYER_REQUEST });
    try {
      const res = await axios.get("http://localhost:3000/Employer/lister");
      if (res.status === 200) {
        dispatch({
          type: EmployerConstants.GET_ALL_EMPLOYER_SUCCESS,
          payload: { employer: res.data },
        });
      }
    } catch (error) {
      dispatch({
        type: EmployerConstants.GET_ALL_EMPLOYER_FAILURE,
        payload: { error: error.response },
      });
    }
  };
};

export const addEmployerAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: EmployerConstants.ADD_EMPLOYER_REQUEST });

    try {
      const res = await axios.post("http://localhost:3000/Employer/ajouter ", data);
      dispatch({
        type: EmployerConstants.ADD_EMPLOYER_SUCCESS,
        payload: { createdEmployer: res.data },
        
      });
    } catch (error) {
      dispatch({
        type: EmployerConstants.ADD_EMPLOYER_FAILURE,
        payload: { error: error.response.data }, 
      });
    }
  };
};

export const deleteEmployerAction = (id) => {
    return async (dispatch) => {
      dispatch({ type: EmployerConstants.DELETE_EMPLOYER_REQUEST });
      try {
        const res = await axios.get(`http://localhost:3000/Employer/${id}/supprimer`);
        if (res.status === 200) {
          dispatch({
            type: EmployerConstants.DELETE_EMPLOYER_SUCCESS,
            payload: { message: res.data },
          });
        }
      } catch (error) {
        dispatch({
          type: EmployerConstants.DELETE_EMPLOYER_FAILURE,
          payload: { error: error.response },
        });
      }
    };
  };
  



  export const editEmployerAction = (id, data) => {
    return async (dispatch) => {
      dispatch({ type: EmployerConstants.EDIT_EMPLOYER_REQUEST });
  
      try {
        const res = await axios.post(`http://localhost:3000/Employer/${id}/modifier`, data);
        if (res.status === 200) {
          dispatch({
            type: EmployerConstants.EDIT_EMPLOYER_SUCCESS,
            payload: { message: res.data },
          });
        }
      } catch (error) {
        dispatch({
          type: EmployerConstants.EDIT_EMPLOYER_FAILURE,
          payload: { error: error.response },
        });
      }
    };
  };