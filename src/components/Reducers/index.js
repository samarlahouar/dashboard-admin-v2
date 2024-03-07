import employerReducer from './employer.reducer';
import departementReducer from './departement.reducer';
import tacheReducer from './tache.reducer';
import projetReducer from './projet.reducer';

import { combineReducers } from 'redux';


const rootReducer = combineReducers({
  employer : employerReducer,
  departement : departementReducer,
  tache : tacheReducer ,
  projet : projetReducer,
 
  
});

export default rootReducer;