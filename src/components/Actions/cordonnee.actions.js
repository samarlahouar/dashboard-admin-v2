import axios from "axios";

import { cordonneeConstants } from "../Actions/constantes";

export const listerCordonnee = () => {
  return async (dispatch) => {
    dispatch({ type:  cordonneeConstants.GET_ALL_CORDONNEE_REQUEST });
    try {
      const res = await axios.get("http://localhost:3000/cordonnees/lister");
      if (res.status === 200) {
        dispatch({
          type:  cordonneeConstants.GET_ALL_CORDONNEE_SUCCESS,
          payload: { cordonnee: res.data },
        });
      }
    } catch (error) {
      dispatch({
        type:  cordonneeConstants.GET_ALL_CORDONNEE_FAILURE,
        payload: { error: error.response },
      });
    }
  };
};

export const addCordonneeAction = (data) => {
  return async (dispatch) => {
    dispatch({ type:  cordonneeConstants.ADD_CORDONNEE_REQUEST });

    try {
      const res = await axios.post("http://localhost:3000/cordonnees/ajouter ", data);
      dispatch({
        type:  cordonneeConstants.ADD_CORDONNEE_SUCCESS,
        payload: { createdCordonnee: res.data },
        
      });
    } catch (error) {
      dispatch({
        type:  cordonneeConstants.ADD_CORDONNEE_FAILURE,
        payload: { error: error.response.data }, 
      });
    }
  };
};


  




  export const editCordonneeAction = (id, data) => {
    return async (dispatch) => {
        dispatch({ type: cordonneeConstants.EDIT_CORDONNEE_REQUEST});

        try {
            const res = await axios.put(`http://localhost:3000/cordonnees/${id}/modifier`, data);
            if (res.status === 200) {
                dispatch({
                    type: cordonneeConstants.EDIT_CORDONNEE_SUCCESS,
                    payload: { id: id, updatedData: data },
                });
            }
        } catch (error) {
            dispatch({
                type: cordonneeConstants.EDIT_CORDONNEE_FAILURE,
                payload: { error: error.response },
            });
        }
    };
};