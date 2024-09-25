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
import { Select, InputLabel, FormControl } from "@material-ui/core";
import Swal from "sweetalert2";
import axios from "axios";
import { listerDepartement } from "../../components/Actions/departement.actions.js";
import { listerProjet } from "../../components/Actions/projet.actions";
import { useDispatch, useSelector } from "react-redux";

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
              value={formData ? formData.déscription : ""}
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
        <Button type="submit" color="primary"style={{ backgroundColor: '#3f51b5', color: 'white' }}>
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

function EditDeparetementForm({ open, setOpen, departementData }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    setFormData(departementData);
  }, [departementData]);

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

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/departement/${departementData._id}/modifier`,
        formData
      );
      if (response.status === 200) {
        setFormData(response.data);
        setOpen(false);
        Swal.fire({
          icon: "success",
          title: "Succès!",
          text: "Les données du département ont été mises à jour avec succès!",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
        listerDepartement();
      } else {
        throw new Error("La modification du département a échoué.");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour des données du département:",
        error
      );
      Swal.fire({
        icon: "error",
        title: "Erreur!",
        text: "Une erreur s'est produite lors de la mise à jour des données du département. Veuillez réessayer plus tard.",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
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

export default EditDeparetementForm;
