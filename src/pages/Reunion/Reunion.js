import React, { useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Swal from 'sweetalert2';
import axios from "axios"; // Importez axios
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReplyIcon from '@mui/icons-material/Reply';
import { Event } from '@mui/icons-material';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { listerReunion , editReunionAction} from "../../components/Actions/reunion.actions";
import { Select, InputLabel, FormControl, Checkbox, ListItemText, Input } from "@material-ui/core";
import { listerEmployer } from "../../components/Actions/employer.actions";



const Reunion  = () => {

  const [selectedEmployer, setSelectedEmployer] = useState([]);
  const [employerListe, setEmployerListe] = useState([]);

  const dispatch = useDispatch();

  const employer = useSelector((state) => state.employer.employer.Employerlist || state.employer.employer).map((employee) => ({
    ...employee,
    id: employee._id, // Utilisez la propriété _id comme identifiant unique
  }));

  useEffect(() => {
    console.log("Employés récupérés :", employer);
    dispatch(listerEmployer());
  }, [dispatch]);

 
  const handleEmployerChange = (e) => {
    const { value } = e.target;
  
    // Mettre à jour la liste des employeurs sélectionnés
    const selectedEmployees = employer.filter((empl) => value.includes(empl._id));
    const selectedEmployeesNames = selectedEmployees.map((empl) => `${empl.nom} ${empl.prenom}`).join(", ");
    setSelectedEmployer(selectedEmployees);
  
    // Mettre à jour formData avec les employés sélectionnés
    setFormData({
      ...formData,
      Participants: selectedEmployeesNames,
    });
  };
  

  const [formData, setFormData] = useState({
    Participants: '', // Modifier ce champ pour qu'il soit de type String
    Localisation: '',
    Datedereunion: '',
    HeureReunion :''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Vérifiez d'abord si le champ de date est "Datedereunion"
    if (name === "Datedereunion") {
      console.log("Nouvelle valeur de date :", value); // Vérifiez la nouvelle valeur de la date
      setFormData({ ...formData,Datedereunion: value });
    } else {
      console.log("Nouvelle valeur :",value); // Vérifiez la nouvelle valeur pour les autres champs
      console.log("Champ modifié :",name); // Vérifiez quel champ a été modifié
      setFormData({ ...formData,[name]: value });
    }
  };


  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };






  const reunion = useSelector(state => state.reunion.reunion.Reunionlist|| state.reunion.reunion);

  useEffect(() => {
    dispatch(listerReunion());
  }, [dispatch]);

  


  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Appeler la fonction addCongé en passant les données formData comme argument
    await addReunion(formData);
    

    // Fermer la fenêtre modale du formulaire étape par étape après l'ajout
    setOpen(false);
  };
 


  const addReunion = async (data) => {
    try {
      // Vérifier si les données sont vides avant de les envoyer au backend
      if (
        !data.Datedereunion ||
        !data.Participants ||
        !data.Localisation ||
        !data.HeureReunion  
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
      await axios.post("http://localhost:3000/reunion/ajouter", data);
  
      // Réinitialiser le formulaire ou fermer la popup après l'ajout
      setFormData({
        Datedereunion: '',
        Participants: '',
        Localisation: '',
        HeureReunion :''
      });
  
      // Rafraîchir la liste des congés
      dispatch(listerReunion());
  
      // Afficher une alerte de succès
      Swal.fire({
        icon: "success",
        title: "Succès!",
        text: "Un nouveau reunion a été ajouté avec succès!",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du reunion:", error);
  
      // Afficher une alerte d'échec
      Swal.fire({
        icon: "error",
        title: "Erreur!",
        text: "Une erreur s'est produite lors de l'ajout du reunion. Veuillez réessayer plus tard.",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  };
  // Ajoutez un état pour contrôler l'ouverture du dialogue d'édition
const [editOpen, setEditOpen] = useState(false);
const [selectedReunion, setSelectedReunion] = useState(null);

const handleCloseEdit = () => {
  setEditOpen(false); // Fermez le dialogue de modification
  // Réinitialiser les données du formulaire à leur valeur initiale ou à une valeur vide
  setFormData({
    Datedereunion: '',
    Participants: '',
    Localisation: '', 
    HeureReunion :''
  });
};
// Ajoutez une fonction pour ouvrir le dialogue d'édition et pré-remplir les données du congé
const handleEditOpen = (reunion) => {
  setSelectedReunion(reunion); // Set the selected reunion to state
  setFormData({ // Populate the form data with the selected reunion data
    Participants: reunion.Participants || '',
    Localisation: reunion.Localisation || '' ,
    Datedereunion: reunion.Datedereunion || '',
    HeureReunion :reunion.HeureReunion  || ''
  });
  setEditOpen(true); // Open the edit dialog
};
  // Convertir les données de l'ancien tableau vers le format requis par le nouveau tableau
  const rows = reunion.map((reunion) => ({
    id: reunion._id,
    Datedereunion: reunion.Datedereunion,
    Participants: reunion.Participants,
    Localisation: reunion.Localisation,
    HeureReunion :reunion.HeureReunion ,
  }));
  const handleEditSubmit = async (e) => {
    e.preventDefault(); // Empêcher le comportement par défaut du formulaire
  
    // Vérifier si selectedConge est valide et contient l'ID du congé
    if (!selectedReunion|| !selectedReunion.id) {
      console.error("ID de reunion invalide.");
      return;
    }
  
    try {
      // Appeler la fonction editCongerAction pour modifier le congé
      await dispatch(editReunionAction(selectedReunion.id, formData));
  
      // Fermer la fenêtre modale de modification après la soumission
      setEditOpen(false);
        // Rafraîchir la liste des congés
        dispatch(listerReunion());
  
      // Afficher une notification de succès
      Swal.fire({
        icon: "success",
        title: "Succès!",
        text: "Les données du reunion ont été mises à jour avec succès!",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données du reunion:", error);
  
      // Afficher une notification d'erreur
      Swal.fire({
        icon: "error",
        title: "Erreur!",
        text: "Une erreur s'est produite lors de la mise à jour des données du reunion. Veuillez réessayer plus tard.",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  };

  const deleteReunion = async (id) => {
    try {
        if (!id) {
            console.error("L'ID du reunion est manquant");
            return;
        }

        // Afficher une alerte de confirmation avant de supprimer la réunion
        const confirmation = await Swal.fire({
            title: "Êtes-vous sûr?",
            text: "Vous ne pourrez pas récupérer cette réunion une fois supprimée!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Oui, supprimer!",
            cancelButtonText: "Annuler",
        });

        // Si l'utilisateur confirme la suppression
        if (confirmation.isConfirmed) {
            // Envoyer une requête DELETE au backend pour supprimer la réunion
            const deleteResponse = await axios.get(`http://localhost:3000/reunion/${id}/supprimer`);

            // Vérifier si la suppression s'est faite avec succès (statut 200)
            if (deleteResponse.status === 200) {
                // Afficher une alerte de succès
                await Swal.fire(
                    "Supprimé!",
                    "Le reunion a été supprimé avec succès.",
                    "success"
                );

                // Rafraîchir la liste des réunions après la suppression
                dispatch(listerReunion());

                // Rediriger l'utilisateur vers une autre page si nécessaire
                // history.push("/autre-page");
            } else {
                throw new Error("La suppression du reunion a échoué.");
            }
        }
    } catch (error) {
        console.error("Une erreur s'est produite lors de la suppression du reunion :", error);
        // Afficher une alerte d'erreur en cas d'échec
        await Swal.fire(
            "Erreur",
            "Une erreur s'est produite lors de la suppression du reunion.",
            "error"
        );
    }
};

  // Définir les colonnes de votre tableau
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 , headerClassName: 'custom-header',},
    { field: 'Datedereunion', headerName: 'Date de réunion', width: 130 , headerClassName: 'custom-header',},
    { field: 'Participants', headerName: 'Participants', width: 400 , headerClassName: 'custom-header',},
    { field: 'Localisation', headerName: 'Localisation', width: 130 , headerClassName: 'custom-header',},
    { field: 'HeureReunion', headerName: 'Heure de réunion', width: 130 , headerClassName: 'custom-header',},
    
      {
        field: 'action',
        headerName: 'Actions',
        width: 320,
        headerClassName: 'custom-header',
        renderCell: (params) => {
          console.log(params); // Vérifiez les paramètres reçus
          return (
            <div>
             <IconButton
  color="secondary"
  onClick={() => deleteReunion(params.row.id)}
  style={{ color: 'red' }} // Changer la couleur de l'icône "Delete" en rouge
>
  <DeleteIcon />
</IconButton>

<IconButton
  color="primary"
  onClick={() => handleEditOpen(params.row)}
  style={{ color: 'blue' }} // Changer la couleur de l'icône "Edit" en bleu
>
  <EditIcon />
</IconButton>

            
            </div>
          );
        },
      },
  ];


  return (
    <div>
     
    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
  <h2 className="custom-title">les Réunions </h2>

        <Button variant="contained" startIcon={<Event />} onClick={handleOpen}>
        Ajouter une réunion
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Ajouter une réunion</DialogTitle>
      <DialogContent>
        <TextField fullWidth margin="normal" 
        label="Localisation"
         name="Localisation"
          value={formData.Localisation} 
          onChange={handleChange} 
          />
        <FormControl fullWidth margin="normal">
          <InputLabel id="participants-label">Participants</InputLabel>
          <Select
  labelId="participants-label"
  id="participants"
  multiple
  value={selectedEmployer.map((employee) => employee._id)}
  onChange={handleEmployerChange}
  renderValue={(selected) => {
    return selectedEmployer
      .filter((employee) => selected.includes(employee._id))
      .map((employee) => `${employee.nom} ${employee.prenom}`)
      .join(", ");
  }}
  setFormData={setFormData} // Ajoutez cette ligne pour passer setFormData en tant que prop
  selectedEmployer={selectedEmployer} // Ajoutez cette ligne pour passer selectedEmployer en tant que prop
>
  {employer.map((employee) => (
    <MenuItem key={employee._id} value={employee._id}>
      <Checkbox checked={selectedEmployer.some((empl) => empl._id === employee._id)} />
      {`${employee.nom} ${employee.prenom}`}
    </MenuItem>
  ))}
</Select>
        </FormControl>
        <TextField 
  fullWidth 
  margin="normal" 
  label="Date de Réunion" 
  type="date" 
  InputLabelProps={{ shrink: true }} 
  name="Datedereunion" 
  value={formData.Datedereunion} 
  onChange={handleChange} 
/> 
<TextField
  fullWidth
  margin="normal"
  label="Heure de réunion"
  type="time"
  InputLabelProps={{
    shrink: true,
  }}
  inputProps={{
    step: 300, // 5 minutes
  }}
  name="HeureReunion"
  value={formData.HeureReunion}
  onChange={handleTimeChange}
/>


     </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button onClick={handleSubmit} variant="contained" style={{ backgroundColor: '#4caf50', color: 'white' }}>Ajouter</Button>
      </DialogActions>
    </Dialog>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
        />
      </div>


      <Dialog open={editOpen} onClose={handleClose}>
        <DialogTitle>Modifier le reunion</DialogTitle>
        <DialogContent>
        <TextField 
      fullWidth 
      margin="normal"
      label="Localisation"
      name="Localisation" 
      value={formData.Localisation}
      onChange={handleChange}
    />
     <FormControl fullWidth margin="normal">
  <InputLabel id="participants-label">Participants</InputLabel>
  <Select
    labelId="participants-label"
    id="participants"
    multiple
    value={selectedEmployer.map((employee) => employee._id)}
    onChange={handleEmployerChange}
    renderValue={(selected) => {
      return selectedEmployer
        .filter((employee) => selected.includes(employee._id))
        .map((employee) => `${employee.nom} ${employee.prenom}`)
        .join(", ");
    }}
  >
    {employer.map((employee) => (
      <MenuItem key={employee._id} value={employee._id}>
        <Checkbox checked={selectedEmployer.some((empl) => empl._id === employee._id)} />
        {`${employee.nom} ${employee.prenom}`}
      </MenuItem>
    ))}
  </Select>
</FormControl>
<TextField 
  fullWidth 
  margin="normal" 
  label="Date de Réunion" 
  type="date" 
  InputLabelProps={{ shrink: true }} 
  name="Datedereunion" 
  value={formData.Datedereunion} 
  onChange={handleChange} 
/>


<TextField
  fullWidth
  margin="normal"
  label="Heure de réunion"
  type="time"
  InputLabelProps={{
    shrink: true,
  }}
  inputProps={{
    step: 300, // 5 minutes
  }}
  name="HeureReunion"
  value={formData.HeureReunion}
  onChange={handleTimeChange}
/>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleCloseEdit}>Annuler</Button>
        <Button onClick={handleEditSubmit} color="primary">Modifier</Button>
        </DialogActions>
      </Dialog>
    </div>
  );


}
export default Reunion;
