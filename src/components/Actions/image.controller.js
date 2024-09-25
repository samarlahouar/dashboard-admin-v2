import axios from 'axios';

export const UPLOAD_IMAGE_REQUEST = 'UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_FAIL = 'UPLOAD_IMAGE_FAIL';
export const LIST_IMAGES_REQUEST = 'LIST_IMAGES_REQUEST';
export const LIST_IMAGES_SUCCESS = 'LIST_IMAGES_SUCCESS';
export const LIST_IMAGES_FAIL = 'LIST_IMAGES_FAIL';

export const DELETE_IMAGE_REQUEST = 'DELETE_IMAGE_REQUEST';
export const DELETE_IMAGE_SUCCESS = 'DELETE_IMAGE_SUCCESS';
export const DELETE_IMAGE_FAIL = 'DELETE_IMAGE_FAIL';

export const uploadImage = (formData) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_IMAGE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await axios.post('http://localhost:3000/images/upload', formData, config);

    dispatch({
      type: UPLOAD_IMAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPLOAD_IMAGE_FAIL,
      payload: error.response && error.response.data.error
        ? error.response.data.error
        : error.message,
    });
  }
};

export const listImages = () => async (dispatch) => {
  try {
    dispatch({ type: LIST_IMAGES_REQUEST });

    // Utilisez l'URL qui renvoie la liste des images dans le dossier "upload" du backend
    const { data } = await axios.get('http://localhost:3000/images/lister');

    dispatch({
      type: LIST_IMAGES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_IMAGES_FAIL,
      payload: error.response && error.response.data.error
        ? error.response.data.error
        : error.message,
    });
  }
};


// Action pour supprimer une image en fonction de son ID
export const deleteImage = (imageId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_IMAGE_REQUEST });

    // Envoyer une requête DELETE pour supprimer l'image avec l'ID spécifié
    await axios.delete(`http://localhost:3000/images/${imageId}/delete`);
    

    dispatch({ type: DELETE_IMAGE_SUCCESS, payload: imageId });
  } catch (error) {
    dispatch({
      type: DELETE_IMAGE_FAIL,
      payload: error.response && error.response.data.error
        ? error.response.data.error
        : error.message,
    });
  }
};
