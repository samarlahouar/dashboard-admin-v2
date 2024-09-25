import employerReducer from './employer.reducer';
import departementReducer from './departement.reducer';
import tacheReducer from './tache.reducer';
import projetReducer from './projet.reducer';
import archiveemployerReducer from "./archiveemployer.reducer"; // Importez le reducer correctement
import CongerReducer from './conger.reducer';
import reunionReducer from './reunion.reducer';
import evenementReducer from './evenement.reducer';
import reclamationReducer from './recalamation.reducer';
import archiveReducer from './archive.reducer';
import demandedecompteReducer from './demandedecompte.reducer';
import archiveCongerReducer from './archive.conger.reducer';
import archiveDemandeReducer from './archive.demande.reducer';
import { imageUploadReducer } from './image.reducer';
import cordonneeReducer from './cordonnee.reducer';
import pdfReducer from './PDF.reducer';




import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  employer: employerReducer,
  departement: departementReducer,
  tache: tacheReducer,
  projet: projetReducer,
  archiver : archiveemployerReducer, 
  conger: CongerReducer,
  reunion : reunionReducer,
  Evenement : evenementReducer , 
  reclamation : reclamationReducer ,
  archive : archiveReducer, 
  demandedecompte: demandedecompteReducer,
  archiveConger: archiveCongerReducer,
  archiveDemande : archiveDemandeReducer , 
  imageUpload: imageUploadReducer,
cordonnee: cordonneeReducer,
pdfs: pdfReducer,

});

export default rootReducer;
