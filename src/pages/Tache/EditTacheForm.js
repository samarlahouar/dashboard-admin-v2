import React, { useState, useEffect } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  MenuItem,
  TextareaAutosize,
  Dialog,
  DialogContent,
  Grid,
} from "@material-ui/core";
import Swal from "sweetalert2";
import axios from "axios";
import { listerTache } from "../../components/Actions/tache.actions";
import { useDispatch, useSelector } from "react-redux";
import {listerDepartement} from "../../components/Actions/departement.actions";
import {listerProjet} from "../../components/Actions/projet.actions";
import { RadioGroup, FormControlLabel, Radio ,FormControl ,FormLabel} from '@material-ui/core';

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
              name="nomdetache"
              label="Nom de la tache"
              value={formData ? formData.nomdetache : ""}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
          <FormControl component="fieldset">
  <FormLabel component="legend">Status</FormLabel>
  <RadioGroup
    aria-label="status"
    name="status"
    value={formData ? formData.status : ""}
    onChange={handleChange}
    row
  >
    <FormControlLabel value="Encours" control={<Radio />} label="Encours" />
    <FormControlLabel value="Annuler" control={<Radio />} label="Annuler" />
    <FormControlLabel value="Terminer" control={<Radio />} label="Terminer" />
  </RadioGroup>
</FormControl>
          
          </Grid>
        </Grid>
        <Button type="submit" style={{ backgroundColor: '#3f51b5', color: 'white' }}>Suivant</Button>
      </form>
    </>
  );
}
function Step2({ handleNext, handleBack, handleChange, formData , setFormData}) {

  const [selectedDepartement, setSelectedDepartement] = useState("");
const [departementListe, setDepartementListe] = useState([]);
const [selectedProjet, setSelectedProjet] = useState("");
const [ProjetListe, setProjetListe] = useState([]);


const departements = useSelector(state => state.departement.departement.departementlist || []);
const projets = useSelector(state => state.projet.projet.projetlist ||[]);
const dispatch = useDispatch();
  
useEffect(() => {
  console.log("Départements récupérés :", departements);
  dispatch(listerDepartement());
}, [dispatch]);

useEffect(() => {
    console.log("projet récupérés :", projets);
    dispatch(listerProjet());
  }, [dispatch]);


  const updateDepartementListe = (value) => {
    const selectedDepartement = departements.find((dep) => dep._id === value);
    if (selectedDepartement) {
      setDepartementListe([selectedDepartement]);
    } else {
      setDepartementListe([]);
    }
  };
  
  const updateProjetListe = (value) => {
      const selectedProjet = projets.find((proj) => proj._id === value);
      if (selectedProjet) {
        setProjetListe([selectedProjet]);
      } else {
        setProjetListe([]);
      }
    };
  
    const handleDepartementChange = (e) => {
      const { value } = e.target;
      setSelectedDepartement(value); // Mettre à jour la valeur sélectionnée pour le département
      const selectedDep = departements.find(dep => dep._id === value);
      setFormData({ ...formData, departement: selectedDep ? selectedDep.nomdeDepartement : '' }); // Mettre à jour les données du formulaire avec le nom du département
    };
    
    const handleProjetChange = (e) => {
      const { value } = e.target;
      setSelectedProjet(value); // Mettre à jour la valeur sélectionnée pour le projet
      const selectedProj = projets.find(proj => proj._id === value);
      setFormData({ ...formData, projet: selectedProj ? selectedProj.nomdeprojet : '' }); // Mettre à jour les données du formulaire avec le nom du projet
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      // Vérifier si les champs de projet et de département sont remplis
      if (!selectedProjet || !selectedDepartement) {
        // Afficher un message d'erreur
        Swal.fire({
          icon: "warning",
          title: "Attention!",
          text: "Veuillez sélectionner un projet et un département.",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        return;
      }
      handleNext();
    };
  return (
    <>
      <Typography variant="h6">Étape 2</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
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
        {projet.nomdeprojet} {/* Afficher le nom du projet */}
      </MenuItem>
    ))
  ) : (
    <MenuItem value="">Aucun projet disponible</MenuItem>
  )}
</TextField>

        </Grid>

        
          <Grid item xs={12}>
          <TextField
          name="departement"
          select
          label="Département"
          value={selectedDepartement} 
          onChange={handleDepartementChange} 
          fullWidth
          >
            {departements && departements.length > 0 ? (
    departements.map((departement) => (
      <MenuItem key={departement._id} value={departement._id}>
        {departement.nomdeDepartement} {/* Afficher le nom du département */}
      </MenuItem>
    ))
  ) : (
    <MenuItem value="">Aucun département disponible</MenuItem>
  )}
</TextField> 
        
        </Grid>

        </Grid>
        <Button onClick={handleBack} color="secondary">
          Précédent
        </Button>
        <Button type="submit" color="primary" style={{ backgroundColor: '#3f51b5', color: 'white' }}>
          Suivant
        </Button>
      </form>
    </>
  );
}


function Step3({ handleNext, handleBack, handleChange, formData }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };

  return (
    <>
      <Typography variant="h6">Étape 3</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextareaAutosize
              name="description"
              placeholder="Description"
              value={formData ? formData.description: ""}
              onChange={handleChange}
              fullWidth
              required
              style={{ minHeight: 300, width: "100%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              name="commentaire"
              placeholder="commentaire de directeur  "
              value={formData.commentaire}
              onChange={handleChange}
              fullWidth
              required
              style={{ minHeight: 300, width: "100%" }} // Définir une hauteur minimale personnalisée et une largeur de 100%
            />
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

function Step4({ handleBack, handleSubmit, setOpen }) {
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Typography variant="h6">Étape 4</Typography>
      <Button onClick={handleBack} color="secondary">
        Précédent
      </Button>
      <Button onClick={handleSubmit} color="primary">
        Modifier
      </Button>
      <Button onClick={handleCancel} color="secondary">
        Annuler
      </Button>
    </>
  );
}

function EditTacheForm({ open, setOpen, TacheData }) {
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  useEffect(() => {
    setFormData(TacheData);
}, [TacheData]);

const [selectedDepartement, setSelectedDepartement] = useState("");
  const [selectedProjet, setSelectedProjet] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
        const response = await axios.post(`http://localhost:3000/tache/${TacheData._id}/modifier`, formData);
        if (response.status === 200) {
            setFormData(response.data);
            setOpen(false);
            dispatch(listerTache());

            Swal.fire({
                icon: 'success',
                title: 'Succès!',
                text: 'Les données du tache ont été mises à jour avec succès!',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            });
            listerTache();
        } else {
            throw new Error("La modification du tache a échoué.");
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour des données du tache:", error);
        Swal.fire({
            icon: 'error',
            title: 'Erreur!',
            text: 'Une erreur s\'est produite lors de la mise à jour des données du département. Veuillez réessayer plus tard.',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
        });
    }
};




  const getStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <Step1
            handleNext={handleNext}
            handleChange={handleChange}
            formData={formData}
          />
        );
      case 2:
        return (
          <Step2
            handleNext={handleNext}
          handleBack={handleBack}
          handleChange={handleChange}
          formData={formData}
          setFormData={setFormData} // Add this line to pass setFormData as a prop
          selectedDepartement={selectedDepartement}
          selectedProjet={selectedProjet}
          
          />
        );
      case 3:
        return (
          <Step3
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            formData={formData}
          />
        );
      case 4:
        return (
          <Step4
            handleBack={handleBack}
            handleSubmit={handleSubmit}
            setOpen={setOpen}
          />
        );
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

export default EditTacheForm;
