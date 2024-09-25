import React, { useState } from "react";
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
import axios from "axios"; // Importez axios
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {listerDepartement} from "../../components/Actions/departement.actions";
import {listerProjet} from "../../components/Actions/projet.actions";
import {
  listerTache,
} from "../../components/Actions/tache.actions";
import { RadioGroup, FormControlLabel, Radio} from '@material-ui/core';


function Step1({ handleNext, handleChange, formData }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation du formulaire, puis passer à l'étape suivante
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
              label="nom de tache"
              value={formData.nomdetache}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
          <RadioGroup
    aria-label="status"
    name="status"
    value={formData.status}
    onChange={handleChange}
    row
  >
    <FormControlLabel value="Encours" control={<Radio />} label="Encours" />
    <FormControlLabel value="Annuler" control={<Radio />} label="Annuler" />

  </RadioGroup>
          </Grid>
        </Grid>
        <Button type="submit"style={{ backgroundColor: '#3f51b5', color: 'white' }}>Suivant</Button>
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
        {departement.nomdeDepartement} 
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
        <Button type="submit" color="primary">
          Suivant
        </Button>
      </form>
    </>
  );
}

function Step3({ handleNext, handleBack, handleChange, formData }) {
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
            <TextareaAutosize
              name="description"
              placeholder="Déscription de la tache "
              value={formData.description}
              onChange={handleChange}
              fullWidth
              required
              style={{ minHeight: 300, width: "100%" }} // Définir une hauteur minimale personnalisée et une largeur de 100%
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
        <Button type="submit" color="primary" style={{ backgroundColor: '#3f51b5', color: 'white' }}>
          Suivant
        </Button>
      </form>
    </>
  );
}

function Step4({ handleBack, handleSubmit, setOpen }) {
  const handleCancel = () => {
    setOpen(false); // Fermer directement la popup
  };

  return (
    <>
      <Typography variant="h6">Étape 4</Typography>
      <Button onClick={handleBack} color="secondary">
        Précédent
      </Button>
      <Button onClick={handleSubmit} color="primary">
        Ajouter
      </Button>
      <Button onClick={handleCancel} color="secondary">
        Annuler
      </Button>
    </>
  );
}
function MultiStepForm({ open, setOpen }) {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    nomdetache: "",
    description: "",
    status: "",
    projet: "",
    departement: "",
  });
  const [selectedDepartement, setSelectedDepartement] = useState("");
  const [selectedProjet, setSelectedProjet] = useState("");

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
  const [tache, setTache] = useState([]);

  const addTache = async (data) => {
    try {
      // Vérifier si les données sont vides avant de les envoyer au backend
      if (
        !data.nomdetache ||
        !data.description ||
        !data.status ||
        !data.projet ||
        !data.departement
      ) {
        // Afficher une alerte indiquant que des champs obligatoires sont vides
        Swal.fire({
          icon: "warning",
          title: "Attention!",
          text: "Veuillez remplir tous les champs obligatoires.",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        return;
      }

      // Envoyer les données du formulaire au backend pour l'ajout
      await axios.post("http://localhost:3000/tache/ajouter ", data);
      setTache([...tache, data]);
      // Réinitialiser le formulaire ou fermer la popup après l'ajout
      setFormData({
        nomdetache: "",
        description: "",
        status: "",
        projet: "",
        departement: "",
      });
      setOpen(false);
      dispatch(listerTache());

      // Afficher une alerte de succès
      Swal.fire({
        icon: "success",
        title: "Succès!",
        text: "Un nouvel tache a été ajouté avec succès!",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de tache:", error);

      // Afficher une alerte d'échec
      Swal.fire({
        icon: "error",
        title: "Erreur!",
        text: "Une erreur s'est produite lors de l'ajout de tache . Veuillez réessayer plus tard.",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêcher le comportement par défaut du formulaire

    // Appeler la fonction addEmployer en passant les données formData comme argument
    addTache(formData);

    // Fermer la fenêtre modale du formulaire étape par étape après l'ajout
    setOpen(false);
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

export default MultiStepForm;
