import React, { useState } from 'react';
import { Paper, Stepper, Step, StepLabel, Button, Typography, TextField, MenuItem, TextareaAutosize, Dialog, DialogContent, Grid } from '@material-ui/core';
import Swal from 'sweetalert2';
import { Select, InputLabel, FormControl } from "@material-ui/core";
import axios from 'axios'; 
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import projet from "../projet/projet.js";
import { listerProjet } from '../../components/Actions/projet.actions.js';
import { listerEmployer } from "../../components/Actions/employer.actions";
import {listerTache} from "../../components/Actions/tache.actions";

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
                            name="nomdeprojet"
                            label="nom de projet "
                            value={formData.nomdeprojet}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="objectif"
                            label="objectif"
                            value={formData.objectif}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
            <TextField
              name="periodeestimé"
              select
              label="periodeestimé"
              value={formData.periodeestimé}
              onChange={handleChange}
              fullWidth
              required
            >
              <MenuItem value="1 moins">1 moins</MenuItem>
              <MenuItem value="2 moins">2 moins</MenuItem>
              <MenuItem value="3 moins">3 moins</MenuItem>
              <MenuItem value="4 moins">4 moins</MenuItem>
              <MenuItem value="5 moins">5 moins</MenuItem>
              <MenuItem value="6 moins">6 moins</MenuItem>
              <MenuItem value="7 moins">7 moins</MenuItem>
              <MenuItem value="8 moins">8 moins </MenuItem>
              <MenuItem value="9 moins">9 moins</MenuItem>
              <MenuItem value="1 ans">1 ans </MenuItem>
            </TextField>
          </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="cout"
                            label="cout de la projet"
                            value={formData.cout}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                </Grid>
                <Button type="submit" style={{ backgroundColor: '#3f51b5', color: 'white' }}>Suivant</Button>
            </form>
        </>
    );
}


function Step2({
    handleNext,
    handleBack,
    handleChange,
    formData,
    setFormData,
    
  }) {
    const [selectedEmployer, setSelectedEmployer] = useState([]);
    const [EmployerListe, setEmployerListe] = useState([]);
    const employer = useSelector(
      (state) => state.employer.employer.Employerlist || state.employer.employer
    ).map((employee) => ({
      ...employee,
      id: employee._id, // Utilisez la propriété _id comme identifiant unique
    }));
    const dispatch = useDispatch();
  
  
    useEffect(() => {
      console.log(" employé récupérés :", employer);
      dispatch(listerEmployer());
    }, [dispatch]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Validation du formulaire, puis passer à l'étape suivante
      handleNext();
    };
    const updateEmployerListe = (value) => {
      const selectedEmployer = employer.filter((empl) =>
        value.includes(empl._id)
      ); // Filtrer les employés sélectionnés
      if (selectedEmployer) {
        setEmployerListe(selectedEmployer);
      } else {
        setEmployerListe([]);
      }
    };
    
    const handleEmployerChange = (e) => {
        const { value } = e.target;
        setSelectedEmployer(value); // Met à jour la liste des employeurs sélectionnés
      
        // Met à jour les données du formulaire avec les noms, prénoms et rôles des employés sélectionnés
        const selectedEmployees = employer.filter((empl) => value.includes(empl._id));
        const selectedEmployeesNames = selectedEmployees.map((empl) => empl.nom).join(", ");
        const selectedEmployeesInfo = selectedEmployees.map((empl) => `${empl.nom} ${empl.prenom} - ${empl.Role}`).join(", ");
      
        setFormData({
          ...formData,
          employés: selectedEmployeesNames,
          responsable: selectedEmployeesInfo,
        });
      };
    
    return (
      <>
        <Typography variant="h6">Étape 2</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="statutdeprogression"
                select
                label="statutdeprogression"
                value={formData.statutdeprogression}
                onChange={handleChange}
                fullWidth
                required
              >
                <MenuItem value="0%">0%</MenuItem>
                <MenuItem value="10%">10%</MenuItem>
                <MenuItem value="50%">50%</MenuItem>
                <MenuItem value="80%">80%</MenuItem>
                <MenuItem value="100%">100%</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="type"
                select
                label="type"
                value={formData.type}
                onChange={handleChange}
                fullWidth
                required
              >
                <MenuItem value="Projet commerciaux">Projet commerciaux</MenuItem>
                <MenuItem value="Projet financier">Projet financier</MenuItem>
                <MenuItem value="Projet de construction">
                  Projet de construction
                </MenuItem>
                <MenuItem value="Projet éducatif">Projet éducatif</MenuItem>
                <MenuItem value="Projet artistique">Projet artistique</MenuItem>
                <MenuItem value="Projet technologiques">
                  Projet technologique
                </MenuItem>
                <MenuItem value="Projet sociaux">Projet sociaux</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
        <TextField
          name="responsable"
          select
          label="Responsable"
          value={selectedEmployer}
          onChange={handleEmployerChange}
          fullWidth
          required
          SelectProps={{
            multiple: true, // Active la sélection multiple
            renderValue: (selected) => (
              <div>
                {selected.map((value) => (
                  <span key={value}>
                    {employer.find((employé) => employé._id === value).nom}
                     {employer.find((employé) => employé._id === value).prenom}
                      {employer.find((employé) => employé._id === value).Role}
                  </span>
                ))}
              </div>
            ),
          }}
        >
          {employer && employer.length > 0 ? (
            employer.map((employé) => (
              <MenuItem key={employé._id} value={employé._id}>
                {employé.nom} {employé.prenom} {employé.Role}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="">Aucun employé disponible</MenuItem>
          )}
        </TextField>
      </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="employés-label">Employés</InputLabel>
                <Select
                  labelId="employés-label"
                  id="employés"
                  multiple
                  value={selectedEmployer}
                  onChange={handleEmployerChange}
                  fullWidth
                >
                  {employer && employer.length > 0 ? (
                    employer.map((employé) => (
                      <MenuItem key={employé._id} value={employé._id}>
                        {employé.nom}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">Aucun employé disponible</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button onClick={handleBack} color="secondary">
            Précédent
          </Button>
          <Button type="submit" color="primary"style={{ backgroundColor: '#3f51b5', color: 'white' }}>
            Suivant
          </Button>
        </form>
      </>
    );
  }
  function Step3({ handleNext, handleBack, handleChange, formData, setFormData }) {

    const [selectedTache, setSelectedTache] = useState([]);
    const [TacheListe, setTacheListe] = useState([]);
    const tache = useSelector(
      (state) => state.tache.tache.tachelist || state.tache.tache
    );
    const dispatch = useDispatch();
  
    useEffect(() => {
      console.log(" les taches récupérés :", tache);
      dispatch(listerTache());
    }, [dispatch]);
  
  
    const updateTacheListe = (value) => {
      const selectedTache = tache.filter((tach) =>
        value.includes(tach._id)
      ); // Filtrer les taches sélectionnés
      if (selectedTache) {
        setTacheListe(selectedTache);
      } else {
        setTacheListe([]);
      }
    };
  
    const handleTacheChange = (event) => {
      setSelectedTache(event.target.value);
      const selectedTacheNames = tache
        .filter((t) => event.target.value.includes(t._id))
        .map((t) => t.nomdetache);
      setFormData({ ...formData, lestaches: selectedTacheNames.join(", ") });
    };
  
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Validation du formulaire, puis passer à l'étape suivante
      handleNext();
    };
    
  
    return (
      <>
        <Typography variant="h6">Étape 3</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel id="description-label">
                Déscription de projet
              </InputLabel>
  
              <TextareaAutosize
                name="description"
                placeholder="Déscription de projet"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                required
                style={{ minHeight: 300, width: "100%" }} // Définir une hauteur minimale personnalisée et une largeur de 100%
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="lestaches"
                select
                label="lestaches"
                value={selectedTache}
                onChange={handleTacheChange}
                fullWidth
                required
                SelectProps={{
                  multiple: true,
                  renderValue: (selected) => (
                    <div>
                      {selected.map((value) => (
                        <span key={value}>
                          {tache.find((t) => t._id === value).nomdetache}
                        </span>
                      ))}
                    </div>
                  ),
                }}
              >
                {tache && tache.length > 0 ? (
                  tache.map((t) => (
                    <MenuItem key={t._id} value={t._id}>
                  {` Nom de taches : ${t.nomdetache}`}
  
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="">Aucune tâche disponible</MenuItem>
                )}
              </TextField>
            </Grid>
          </Grid>
          <Button onClick={handleBack} color="secondary">
            Précédent
          </Button>
          <Button type="submit" color="primary"style={{ backgroundColor: '#3f51b5', color: 'white' }}>
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

function EditProjetForm({ open, setOpen, ProjetData }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState(ProjetData);

    const [selectedEmployer, setSelectedEmployer] = useState("");
  const [selectedTache, setSelectedTache] = useState([]);

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
            // Vérifier si ProjetData est valide et contient l'ID du projet
            if (!ProjetData || !ProjetData._id) {
                throw new Error("Les données de projet sont invalides.");
            }
            
            // Récupérer l'ID du projet
            const ProjetId = ProjetData._id;
            
            // Envoie une requête POST au backend pour mettre à jour les données du projet
            const response = await axios.post(`http://localhost:3000/projet/${ProjetId}/modifier`, formData);
            
            // Vérifier si la réponse du serveur est réussie (statut 200)
            if (response.status === 200) {
                // Mettre à jour l'état local avec les nouvelles données du projet reçues du backend
                setFormData(response.data);
                setOpen(false); // Ferme le formulaire de modification après la soumission
                
                // Affiche une notification de succès
                Swal.fire({
                    icon: 'success',
                    title: 'Succès!',
                    text: 'Les données du projet ont été mises à jour avec succès!',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });
                
                // Mettre à jour la liste des projets en appelant la fonction listerProjet
                listerProjet(); // Assurez-vous d'importer et d'appeler correctement votre fonction listerProjet()
            } else {
                throw new Error("La modification du projet a échoué.");
            }
        } catch (error) {
            // Gère les erreurs de mise à jour
            console.error("Erreur lors de la mise à jour des données du projet:", error);
            // Affiche une notification d'erreur
            Swal.fire({
                icon: 'error',
                title: 'Erreur!',
                text: 'Une erreur s\'est produite lors de la mise à jour des données du projet. Veuillez réessayer plus tard.',
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
                return <Step2 
                
                handleNext={handleNext}
                handleBack={handleBack}
                handleChange={handleChange}
                formData={formData}
                setFormData={setFormData} // Add this line to pass setFormData as a prop
                selectedEmployer={selectedEmployer}
                />;
            case 3:
                return <Step3
                
                handleNext={handleNext}
                handleBack={handleBack}
                handleChange={handleChange}
                formData={formData}
                setFormData={setFormData} // Add this line to pass setFormData as a prop
                selectedTache={selectedTache}
    
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

export default EditProjetForm;
