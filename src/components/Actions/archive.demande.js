import axios from 'axios';
import { demandearchiverConstants } from './constantes';

export const listerDemandeArchive = () => {
  return async (dispatch) => {
    dispatch({ type: demandearchiverConstants.LISTE_DEMANDE_ARCHIVE_REQUEST});
    try {
      const res = await axios.get("http://localhost:3000/archiveDemande/lister");
      if (res.status === 200) {
        dispatch({
          type: demandearchiverConstants.LISTE_DEMANDE_ARCHIVE_SUCCESS,
          payload: { archiveDemande: res.data },
        });
      }
    } catch (error) {
      dispatch({
        type: demandearchiverConstants.LISTE_DEMANDE_ARCHIVE_FAILURE,
        payload: { error: error.response },
      });
    }
  };
};

export const supprimerDemandeArchive = (id) => async (dispatch) => {
  try {
    dispatch({ type: demandearchiverConstants.DELETE_DEMANDE_ARCHIVE_REQUEST});
    await axios.delete(`http://localhost:3000/archiveDemande/${id}/supprimer`);
    dispatch({ type: demandearchiverConstants.DELETE_DEMANDE_ARCHIVE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: demandearchiverConstants.DELETE_DEMANDE_ARCHIVE_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const ajouterDemande = (archiveData) => async (dispatch) => {
  try {
    dispatch({ type: demandearchiverConstants.AJOUTER_DEMANDE_ARCHIVE_REQUEST });
    const response = await axios.post('http://127.0.0.1:3000/archiveDemande/ajouter', archiveData);
    dispatch({ type: demandearchiverConstants.AJOUTER_DEMANDE_ARCHIVE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: demandearchiverConstants.AJOUTER_DEMANDE_ARCHIVE_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

