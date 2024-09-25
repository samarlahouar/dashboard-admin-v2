import React, { useState } from "react";
import {Paper,Stepper,Step,StepLabel,Button,Typography,TextField,MenuItem,TextareaAutosize,Dialog,
DialogContent,
  Grid,
} from "@material-ui/core";
import Swal from "sweetalert2";
import {listerProjet} from "../../components/Actions/projet.actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios"; // Importez axios
import {listerDepartement} from "../../components/Actions/departement.actions";
import {listerEmployer} from "../../components/Actions/employer.actions";

function Step1({ handleNext,  formData,handleChange }) {
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
        <Button
  type="submit"
  variant="contained"
  style={{ backgroundColor: '#3f51b5', color: 'white', float: 'left' }}
>
  Suivant
</Button>      </form>
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
    // Validation du formulaire, puis passer à l'étape suivante
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
    setFormData({ ...formData, dateDebutTravail: e.target.value });
  };

  return (
    <>
      <Typography variant="h6">Étape 2</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
        <TextField
  name="numerodetelephone"
  label="Numéro de Téléphone"
  value={formData.numerodetelephone}
  onChange={handleChange}
  fullWidth
  required
  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', minLength: 8, maxLength: 8 }}
/>
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
            />
          </Grid>
        </Grid>
        <Button onClick={handleBack} color="secondary">
          Précédent
        </Button>
        <Button type="submit" variant="contained" style={{ backgroundColor: '#3f51b5', color: 'white' }}>
          Suivant
        </Button>
      </form>
    </>
  );
}
function Step3({handleNext,handleBack,formData,handleChange,setFormData}) {
    
  const [selectedDepartement, setSelectedDepartement] = useState('');
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
  
const handleSubmit = (e) => {
  e.preventDefault();
  handleNext();
};

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
    setSelectedDepartement(value); // Stocker le type de département
    const selectedDep = departements.find(dep => dep._id === value);
    setFormData({ ...formData, departement: selectedDep ? selectedDep.nomdeDepartement : '' });
    console.log("Département sélectionné :", selectedDep ? selectedDep.nomdeDepartement : '');
  };
  
  const handleProjetChange = (e) => {
    const { value } = e.target;
    setSelectedProjet(value); // Stocker le nom du projet
    const selectedProj = projets.find(proj => proj._id === value);
    setFormData({ ...formData, projet: selectedProj ? selectedProj.nomdeprojet : '' }); // Utiliser le nom du projet
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
                {` Nom de département : ${departement.nomdeDepartement}`}
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
            label="projet"
            preventValue={setSelectedProjet}
            value={selectedProjet}  
            onChange={handleProjetChange} 
            fullWidth
          >
            {projets && projets.length > 0 ? (
              projets.map((projet) => (
                <MenuItem key={projet._id} value={projet._id}>
                  {` Nom de projet : ${projet.nomdeprojet}  `}
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
        <Button type="submit"  variant="contained" style={{ backgroundColor: '#3f51b5', color: 'white' }}>
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
    nom: "",
    prenom: "",
    adresse: "",
    matricule: "",
    numerodetelephone: "",
    Role: "",
    email: "",
    dateDebutTravail: "",
    departement: "",
    projet: "",
    tache: "",
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
  const [employer, setEmployer] = useState([]);
  const dispatch = useDispatch();

  const addEmployer = async (data) => {
    try {
      // Vérifier si les données sont vides avant de les envoyer au backend
      if (
        !data.nom ||
        !data.prenom ||
        !data.adresse ||
        !data.matricule ||
        !data.numerodetelephone ||
        !data.Role ||
        !data.email ||
        !data.dateDebutTravail ||
        !data.departement ||
        !data.projet ||
        !data.tache
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
      await axios.post("http://localhost:3000/Employer/ajouter ", data);
      setEmployer([...employer, data]);
      // Réinitialiser le formulaire ou fermer la popup après l'ajout
      setFormData({
        nom: "",
        prenom: "",
        adresse: "",
        matricule: "",
        numerodetelephone: "",
        Role: "",
        email: "",
        dateDebutTravail: "",
        departement: "",
        projet: "",
        tache: "",
      });
      setOpen(false);
     
      // Afficher une alerte de succès
      Swal.fire({
        icon: "success",
        title: "Succès!",
        text: "Un nouvel employé a été ajouté avec succès!",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
      dispatch(listerEmployer());
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'employé:", error);

      // Afficher une alerte d'échec
      Swal.fire({
        icon: "error",
        title: "Erreur!",
        text: "Une erreur s'est produite lors de l'ajout de l'employé. Veuillez réessayer plus tard.",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêcher le comportement par défaut du formulaire

    // Appeler la fonction addEmployer en passant les données formData comme argument
    addEmployer(formData);

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
  selectedDepartement={selectedDepartement}
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
