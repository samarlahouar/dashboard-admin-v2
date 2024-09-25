import {
    UPLOAD_IMAGE_REQUEST,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAIL,
   
      LIST_IMAGES_REQUEST,
      LIST_IMAGES_SUCCESS,
      LIST_IMAGES_FAIL,


      DELETE_IMAGE_REQUEST,
      DELETE_IMAGE_SUCCESS,
      DELETE_IMAGE_FAIL,
   
  } from '../Actions/image.controller';
  
  export const imageUploadReducer = (state = {}, action) => {
    switch (action.type) {
      case UPLOAD_IMAGE_REQUEST:
        return { loading: true };
      case UPLOAD_IMAGE_SUCCESS:
        return { loading: false, success: true, image: action.payload };
      case UPLOAD_IMAGE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
 
  
  
  export const imageListReducer = (state = { images: [] }, action) => {
    switch (action.type) {
      case LIST_IMAGES_REQUEST:
        return { loading: true, images: [] };
      case LIST_IMAGES_SUCCESS:
        return { loading: false, images: action.payload };
      case LIST_IMAGES_FAIL:
        return { loading: false, error: action.payload, images: [] };
      case DELETE_IMAGE_REQUEST:
        return { ...state, loading: true };
      case DELETE_IMAGE_SUCCESS:
        return {
          ...state,
          loading: false,
          images: state.images.filter(image => image._id !== action.payload),
        };
      case DELETE_IMAGE_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  