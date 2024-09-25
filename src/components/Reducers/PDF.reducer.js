const initialState = {
    files: [],
    error: null
  };
  
  const pdfReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPLOAD_FILE_SUCCESS':
        return {
          ...state,
          files: [...state.files, ...action.payload],
          error: null
        };
      case 'UPLOAD_FILE_FAILURE':
        return {
          ...state,
          error: action.payload
        };
      case 'FETCH_PDFS_SUCCESS':
        return {
          ...state,
          files: action.payload,
          error: null
        };
      case 'FETCH_PDFS_FAILURE':
        return {
          ...state,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default pdfReducer;
  