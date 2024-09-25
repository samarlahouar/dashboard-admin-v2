import React, { useState } from 'react';
import { Paper, Stepper, Step, StepLabel, Button, Typography, TextField, MenuItem, TextareaAutosize, Dialog, DialogContent, Grid } from '@material-ui/core';
import Swal from 'sweetalert2';
import axios from 'axios'; 
import Employer from "../Employer/Employer.js";
import { listerEmployer } from '../../components/Actions/employer.actions.js';
import {listerProjet} from "../../components/Actions/projet.actions";
import {listerDepartement} from "../../components/Actions/departement.actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";




function Step1({ handleNext, handleChange, formData }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        handleNext();
    };

    return (
        <>
            <Typography variant="h6">Étape 1</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            name="nom"
                            label="Nom Employé"
                            value={formData.nom}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="prenom"
                            label="Prénom Employé"
                            value={formData.prenom}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="adresse"
                            label="Adresse"
                            value={formData.adresse}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
  name="matricule"
  label="Matricule"
  value={formData.matricule}
  onChange={handleChange}
  fullWidth
  required
  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
/>
                    </Grid>
                </Grid>
                <Button type="submit"   style={{ backgroundColor: '#3f51b5', color: 'white', float: 'left' }}>Suivant</Button>
            </form>
        </>
    );
}

function Step2({ handleNext, handleBack, handleChange, formData, setFormData }) {
  const [dateError, setDateError] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();
      if (dateError) {
          // Empêcher la soumission du formulaire si une erreur de date est présente
          return;
      }
      handleNext();
  };

  const handleDateChange = (e) => {
      const selectedDate = new Date(e.target.value);
      const currentDate = new Date();
      if (selectedDate > currentDate) {
          setDateError('La date de début de travail ne peut pas être dans le futur.');
      } else {
          setDateError('');
      }
      setFormData({ ...formData, dateDebutTravail: e.target.value }); // Mettre à jour les données du formulaire
  };

  return (
      <>
          <Typography variant="h6">Étape 2</Typography>
          <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                  <Grid item xs={12}>
                      <TextField
                          name="numerodetelephone"
                          label="Numéro de Téléphone"
                          value={formData.numerodetelephone}
                          onChange={handleChange}
                          fullWidth
                          required
                          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', minLength: 8, maxLength: 8 }}
                      />
                  </Grid>
                  {/* Autres champs de saisie */}
                  <Grid item xs={12}>
                      <TextField
                          name="Role"
                          select
                          label="Rôle"
                          value={formData.Role}
                          onChange={handleChange}
                          fullWidth
                          required
                          >
                          <MenuItem value="Ressources humaines (RH) ">Ressources humaines (RH) </MenuItem>
                          <MenuItem value="Finance/Comptabilité">Finance/Comptabilité</MenuItem>
                          <MenuItem value="Ventes et marketing ">Ventes et marketing </MenuItem>
                          <MenuItem value="Service client">Service client</MenuItem>
                          <MenuItem value="Développement commercial">Développement commercial</MenuItem>
                          <MenuItem value="Informatique/Technologie">Informatique/Technologie</MenuItem>
                          <MenuItem value="Administration ">Administration </MenuItem>
                          <MenuItem value="Contrôleurs qualité "> Contrôleurs qualité</MenuItem>
                          <MenuItem value="Techniciens"> Techniciens</MenuItem>
                          <MenuItem value="Ingénieurs en qualité "> Ingénieurs en qualité</MenuItem>
                          <MenuItem value=" Responsables de la production"> Responsables de la production</MenuItem>
            
            
                      </TextField>
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                          name="email"
                          label="Email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          fullWidth
                          required
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                          label="Date de début de travail"
                          type="date"
                          value={formData.dateDebutTravail}
                          onChange={handleDateChange}
                          InputLabelProps={{
                              shrink: true,
                          }}
                          fullWidth
                          error={!!dateError}
                          helperText={dateError}
                          required
                      />
                  </Grid>
              </Grid>
                <Button onClick={handleBack} color="secondary">Précédent</Button>
                <Button type="submit" color="primary" style={{ backgroundColor: '#3f51b5', color: 'white' }}>Suivant</Button>
            </form>
        </>
    );
}

function Step3({ handleNext, handleBack, formData, handleChange, setFormData }) {
  const [selectedDepartement, setSelectedDepartement] = useState('');
  const [selectedProjet, setSelectedProjet] = useState("");
  const departements = useSelector(state => state.departement.departement.departementlist || []);
  const projets = useSelector(state => state.projet.projet.projetlist || []);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(listerDepartement());
      dispatch(listerProjet());
  }, [dispatch]);

  const handleSubmit = (e) => {
      e.preventDefault();
      handleNext();
  };

  const handleDepartementChange = (e) => {
      const { value } = e.target;
      setSelectedDepartement(value);
      const selectedDep = departements.find(dep => dep._id === value);
      setFormData({ ...formData, departement: selectedDep ? selectedDep.nomdeDepartement : '' });
  };

  const handleProjetChange = (e) => {
      const { value } = e.target;
      setSelectedProjet(value);
      const selectedProj = projets.find(proj => proj._id === value);
      setFormData({ ...formData, projet: selectedProj ? selectedProj.nomdeprojet : '' });
  };

  return (
      <>
          <Typography variant="h6">Étape 3</Typography>
          <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                  <Grid item xs={12}>
                      <TextField
                          name="departement"
                          select
                          label="Département"
                          value={selectedDepartement}
                          onChange={handleDepartementChange}
                          fullWidth
                          required
                      >
                          {departements && departements.length > 0 ? (
                              departements.map((departement) => (
                                  <MenuItem key={departement._id} value={departement._id}>
                                      {departement.nomdeDepartement}
                                  </MenuItem>
                              ))
                          ) : (
                              <MenuItem value="">Aucun département disponible</MenuItem>
                          )}
                      </TextField>
                  </Grid>

                  <Grid item xs={12}>
                      <TextField
                          name="projet"
                          select
                          label="Projet"
                          value={selectedProjet}
                          onChange={handleProjetChange}
                          fullWidth
                      >
                          {projets && projets.length > 0 ? (
                              projets.map((projet) => (
                                  <MenuItem key={projet._id} value={projet._id}>
                                      {projet.nomdeprojet}
                                  </MenuItem>
                              ))
                          ) : (
                              <MenuItem value="">Aucun projet disponible</MenuItem>
                          )}
                      </TextField>
                  </Grid>

                  <Grid item xs={12}>
                      <TextareaAutosize
                          name="tache"
                          placeholder="Liste des tâches"
                          value={formData.tache}
                          onChange={handleChange}
                          fullWidth
                          required
                          style={{ minHeight: 300, width: "100%" }}
                      />
                  </Grid>
              </Grid>
              <Button onClick={handleBack} color="secondary">
                  Précédent
              </Button>
              <Button type="submit" color="primary">
                  Suivant
              </Button>
          </form>
      </>
  );
}


function Step4({ handleBack, handleSubmit, setOpen, formData }) {
    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Typography variant="h6">Étape 4</Typography>
            <Button onClick={handleBack} color="secondary">Précédent</Button>
            <Button onClick={() => handleSubmit(formData)} color="primary">Modifier</Button>
            <Button onClick={handleCancel} color="secondary">Annuler</Button>
        </>
    );
}

function EditEmployeeForm({ open, setOpen, employeeData }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState(employeeData);
    const [selectedDepartement, setSelectedDepartement] = useState("");
    const [selectedProjet, setSelectedProjet] = useState("");
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };
    const handleSubmit = async () => {
        try {
          // Vérifier si employeeData est valide et contient l'ID de l'employé
          if (!employeeData || !employeeData._id) {
            throw new Error("Les données de l'employé sont invalides.");
          }
      
          // Récupérer l'ID de l'employé
          const employeeId = employeeData._id;
      
          // Envoie une requête PUT au backend pour mettre à jour les données de l'employé avec l'ID dans l'URL
          const response = await axios.post(`http://localhost:3000/Employer/${employeeId}/modifier`, formData);
      
          // Vérifier si la réponse du serveur est réussie (statut 200)
          if (response.status === 200) {
            // Mettre à jour l'état local avec les nouvelles données de l'employé reçues du backend
            setFormData(response.data);
            setOpen(false); // Ferme le formulaire de modification après la soumission
      
            // Affiche une notification de succès
            Swal.fire({
              icon: 'success',
              title: 'Succès!',
              text: 'Les données de l\'employé ont été mises à jour avec succès!',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
            });
            dispatch(listerEmployer());

          } else {
            throw new Error("La modification de l'employé a échoué.");
          }
        } catch (error) {
          // Gère les erreurs de mise à jour
          console.error("Erreur lors de la mise à jour des données de l'employé:", error);
          // Affiche une notification d'erreur
          Swal.fire({
            icon: 'error',
            title: 'Erreur!',
            text: 'Une erreur s\'est produite lors de la mise à jour des données de l\'employé. Veuillez réessayer plus tard.',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
          });
        }
      };
      
    
    const getStepContent = (step) => {
        switch (step) {
            case 1:
                return <Step1 handleNext={handleNext} 
                handleChange={handleChange}
                 formData={formData} />;
            case 2:
                return <Step2 handleNext={handleNext} 
                handleBack={handleBack}
                 handleChange={handleChange}
                  formData={formData}
                   setFormData={setFormData} />;
                case 3:
                return <Step3
                handleNext={handleNext}
                handleBack={handleBack}
                handleChange={handleChange}
                formData={formData}
                setFormData={setFormData} // Add this line to pass setFormData as a prop
                selectedDepartement={selectedDepartement}
                selectedProjet={selectedProjet}
                   />;
            case 4:
                return <Step4 handleBack={handleBack} handleSubmit={handleSubmit} setOpen={setOpen} formData={formData} />;
            default:
                return null;
        }
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogContent>
                <Paper>
                    <Stepper activeStep={step - 1}>
                        <Step>
                            <StepLabel>Étape 1</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Étape 2</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Étape 3</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Étape 4</StepLabel>
                        </Step>
                    </Stepper>
                    {getStepContent(step)}
                </Paper>
            </DialogContent>
        </Dialog>
    );
}

export default EditEmployeeForm;