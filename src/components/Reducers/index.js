import employerReducer from './employer.reducer';


import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  employer : employerReducer,
 
  
});

export default rootReducer;