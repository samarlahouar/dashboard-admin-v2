import axios from 'axios';

export const uploadFile = (files, projet) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));
      formData.append('projet', projet);

      const response = await axios.post('http://localhost:3000/pdfs/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      dispatch({ type: 'UPLOAD_FILE_SUCCESS', payload: response.data.files });
    } catch (error) {
      dispatch({ type: 'UPLOAD_FILE_FAILURE', payload: error.message });
    }
  };
};

export const fetchPdfs = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3000/pdfs/list');
      dispatch({ type: 'FETCH_PDFS_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_PDFS_FAILURE', payload: error.message });
    }
  };
};
