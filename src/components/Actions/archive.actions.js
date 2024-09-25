import axios from 'axios';
import { archiverConstants } from './constantes';

export const listerReclamationArchive = () => {
  return async (dispatch) => {
    dispatch({ type: archiverConstants.LISTE_RECLAMATION_ARCHIVE_REQUEST});
    try {
      const res = await axios.get("http://localhost:3000/archivereclamation/lister");
      if (res.status === 200) {
        dispatch({
          type: archiverConstants.LISTE_RECLAMATION_ARCHIVE_SUCCESS,
          payload: { archiver: res.data },
        });
      }
    } catch (error) {
      dispatch({
        type: archiverConstants.LISTE_RECLAMATION_ARCHIVE_FAILURE,
        payload: { error: error.response },
      });
    }
  };
};

export const supprimerReclamationArchive = (id) => async (dispatch) => {
  try {
    dispatch({ type: archiverConstants.DELETE_RECLAMATION_ARCHIVE_REQUEST });
    await axios.delete(`http://localhost:3000/archivereclamation/${id}/supprimer`);
    dispatch({ type: archiverConstants.DELETE_RECLAMATION_ARCHIVE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: archiverConstants.DELETE_RECLAMATION_ARCHIVE_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const ajouterReclamation = (archiveData) => async (dispatch) => {
  try {
    dispatch({ type: archiverConstants.AJOUTER_RECLAMATION_ARCHIVE_REQUEST });
    const response = await axios.post('http://127.0.0.1:3000/archivereclamation/ajouter', archiveData);
    dispatch({ type: archiverConstants.AJOUTER_RECLAMATION_ARCHIVE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: archiverConstants.AJOUTER_RECLAMATION_ARCHIVE_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

