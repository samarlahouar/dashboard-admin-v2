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
import { Select, InputLabel, FormControl } from "@material-ui/core";

import Swal from "sweetalert2";
import axios from "axios"; // Importez axios
import { listerProjet } from "../../components/Actions/projet.actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { listerDepartement } from "../../components/Actions/departement.actions";

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
              name="nomdeDepartement"
              label="Nom de Departement"
              value={formData.nomdeDepartement}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <Button type="submit"style={{ backgroundColor: '#3f51b5', color: 'white' }}>Suivant</Button>
      </form>
    </>
  );
}

function Step2({ handleNext, handleBack, handleChange, formData }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation du formulaire, puis passer à l'étape suivante
    handleNext();
  };

  return (
    <>
      <Typography variant="h6">Étape 2</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextareaAutosize
              name="déscription"
              placeholder="Déscription de département"
              value={formData.déscriptions}
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
        <Button type="submit" style={{ backgroundColor: '#3f51b5', color: 'white' }} color="primary">
          Suivant
        </Button>
      </form>
    </>
  );
}
function Step3({ handleNext, handleBack, formData, setFormData }) {
  const [selectedProjets, setSelectedProjets] = useState([]);
  const [projetListe, setProjetListe] = useState([]);

  const projets = useSelector((state) => state.projet.projet.projetlist || []);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("projets récupérés :", projets);
    dispatch(listerProjet());
  }, [dispatch]);

  const handleProjetChange = (e) => {
    setSelectedProjets(e.target.value);
  };

  const handleAddProjet = () => {
    const newProjetListe = [...projetListe, ...selectedProjets];
    setProjetListe(newProjetListe);
    const selectedProjectsNames = selectedProjets.map(
      (projId) => projets.find((proj) => proj._id === projId).nomdeprojet
    );
    setFormData({
      ...formData,
      projet: newProjetListe
        .map(
          (projId) => projets.find((proj) => proj._id === projId).nomdeprojet
        )
        .join(", "),
    });
    setSelectedProjets([]);
  };

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
            <FormControl fullWidth>
              <InputLabel id="projet-label">Projet</InputLabel>
              <Select
                labelId="projet-label"
                id="projet"
                multiple
                value={selectedProjets}
                onChange={handleProjetChange}
                fullWidth
              >
                {projets.map((projet) => (
                  <MenuItem key={projet._id} value={projet._id}>
                    {projet.nomdeprojet}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Projets sélectionnés :</Typography>
            {projetListe.map((projectId) => (
              <Typography key={projectId}>
                {projets.find((proj) => proj._id === projectId).nomdeprojet}
              </Typography>
            ))}
          </Grid>
        </Grid>
        <Button onClick={handleBack} color="secondary">
          Précédent
        </Button>
        <Button type="button" onClick={handleAddProjet} color="primary">
          Ajouter Projet
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
  const [formData, setFormData] = useState({
    nomdeDepartement: "",
    déscription: "",
    projet: "",
  });
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
  const [Departement, setDepartement] = useState([]);
  const dispatch = useDispatch();

  const addDepartement = async (data) => {
    try {
      // Vérifier si les données sont vides avant de les envoyer au backend
      if (!data.nomdeDepartement || !data.déscription || !data.projet) {
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
      await axios.post("http://localhost:3000/departement/ajouter ", data);
      setDepartement([...Departement, data]);
      // Réinitialiser le formulaire ou fermer la popup après l'ajout
      setFormData({
        nomdeDepartement: "",
        déscription: "",
        projet: "",
      });
      setOpen(false);

      // Afficher une alerte de succès
      Swal.fire({
        icon: "success",
        title: "Succès!",
        text: "Un nouvel departement a été ajouté avec succès!",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
      dispatch(listerDepartement());

    } catch (error) {
      console.error("Erreur lors de l'ajout de département:", error);

      // Afficher une alerte d'échec
      Swal.fire({
        icon: "error",
        title: "Erreur!",
        text: "Une erreur s'est produite lors de l'ajout de département. Veuillez réessayer plus tard.",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêcher le comportement par défaut du formulaire

    // Appeler la fonction addEmployer en passant les données formData comme argument
    addDepartement(formData);

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
          />
        );
      case 3:
        return (
          <Step3
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            formData={formData}
            setFormData={setFormData} // Add this line to pass setFormData as a prop
            selectedProjet={selectedProjet}
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
