import axios from 'axios';
import { congerarchiverConstants } from './constantes';

export const listerCongerArchive = () => {
  return async (dispatch) => {
    dispatch({ type: congerarchiverConstants.LISTE_CONGER_ARCHIVE_REQUEST });
    try {
      const res = await axios.get("http://localhost:3000/archiveconger/lister");
      if (res.status === 200) {
        dispatch({
          type: congerarchiverConstants.LISTE_CONGER_ARCHIVE_SUCCESS,
          payload: { archiverConger: res.data },
        });
      }
    } catch (error) {
      dispatch({
        type: congerarchiverConstants.LISTE_CONGER_ARCHIVE_FAILURE,
        payload: { error: error.response },
      });
    }
  };
};

export const supprimerCongerArchive = (id) => async (dispatch) => {
  try {
    dispatch({ type: congerarchiverConstants.DELETE_CONGER_ARCHIVE_REQUEST });
    await axios.delete(`http://localhost:3000/archiveconger/${id}/supprimer`);
    dispatch({ type: congerarchiverConstants.DELETE_CONGER_ARCHIVE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: congerarchiverConstants.DELETE_CONGER_ARCHIVE_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
export const ajouterConger = (archiveData) => async (dispatch) => {
  try {
    dispatch({ type: congerarchiverConstants.AJOUTER_CONGER_ARCHIVE_REQUEST });
    const response = await axios.post('http://localhost:3000/archiveconger/ajouter', archiveData);
    dispatch({ type: congerarchiverConstants.AJOUTER_CONGER_ARCHIVE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: congerarchiverConstants.AJOUTER_CONGER_ARCHIVE_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

