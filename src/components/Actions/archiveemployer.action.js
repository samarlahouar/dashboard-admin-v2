import axios from 'axios';
import { archiveConstants } from './constantes';

export const listerEmployerArchive = () => {
  return async (dispatch) => {
    dispatch({ type: archiveConstants.LISTE_EMPLOYER_ARCHIVE_REQUEST});
    try {
      const res = await axios.get("http://localhost:3000/archiver/lister");
      if (res.status === 200) {
        dispatch({
          type: archiveConstants.LISTE_EMPLOYER_ARCHIVE_SUCCESS,
          payload: { archiver: res.data },
        });
      }
    } catch (error) {
      dispatch({
        type: archiveConstants.LISTE_EMPLOYER_ARCHIVE_FAILURE,
        payload: { error: error.response },
      });
    }
  };
};

export const supprimerEmployerArchive = (id) => async (dispatch) => {
  try {
    dispatch({ type: archiveConstants.DELETE_EMPLOYER_ARCHIVE_REQUEST });
    await axios.delete(`http://127.0.0.1:3000/archiver/supprimer/${id}`);
    dispatch({ type: archiveConstants.DELETE_EMPLOYER_ARCHIVE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: archiveConstants.DELETE_EMPLOYER_ARCHIVE_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const ajouterArchive = (archiveData) => async (dispatch) => {
  try {
    dispatch({ type: archiveConstants.AJOUTER_EMPLOYER_ARCHIVE_REQUEST });
    const response = await axios.post('http://127.0.0.1:3000/archiver/ajouter', archiveData);
    dispatch({ type: archiveConstants.AJOUTER_EMPLOYER_ARCHIVE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: archiveConstants.AJOUTER_EMPLOYER_ARCHIVE_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

