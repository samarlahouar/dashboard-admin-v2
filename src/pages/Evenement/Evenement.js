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
import { Event } from '@mui/icons-material';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { listerEvenement , editEvenementAction } from "../../components/Actions/evenement.actions";


const Evenement  = () => {



    const evenement = useSelector(state => state.Evenement.evenement.Evenementlist|| state.Evenement.evenement);  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listerEvenement());
  }, [dispatch]);

  
  const [formData, setFormData] = useState({
    Datedevenement: '', // Modifier ce champ pour qu'il soit de type String
    Localisation: '',
    HeureEvenement :''

  });

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Vérifiez d'abord si le champ de date est "Datedereunion"
    if (name === "Datedevenement") {
      console.log("Nouvelle valeur de date :", value); // Vérifiez la nouvelle valeur de la date
      setFormData({ ...formData,Datedevenement: value });
    } else {
      console.log("Nouvelle valeur :", value); // Vérifiez la nouvelle valeur pour les autres champs
      console.log("Champ modifié :", name); // Vérifiez quel champ a été modifié
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Appeler la fonction addCongé en passant les données formData comme argument
    await addEvenement(formData);
    

    // Fermer la fenêtre modale du formulaire étape par étape après l'ajout
    setOpen(false);
  };
 


  const addEvenement = async (data) => {
    try {
      // Vérifier si les données sont vides avant de les envoyer au backend
      if (
        !data.Datedevenement ||
        !data.Localisation 
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
      await axios.post("http://localhost:3000/evenement/ajouter", data);
  
      // Réinitialiser le formulaire ou fermer la popup après l'ajout
      setFormData({
        Datedevenement: '',
        Localisation: ''
      });
  
      // Rafraîchir la liste des congés
      dispatch(listerEvenement());
  
      // Afficher une alerte de succès
      Swal.fire({
        icon: "success",
        title: "Succès!",
        text: "Un nouveau evenement a été ajouté avec succès!",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du evenement:", error);
  
      // Afficher une alerte d'échec
      Swal.fire({
        icon: "error",
        title: "Erreur!",
        text: "Une erreur s'est produite lors de l'ajout du evenement. Veuillez réessayer plus tard.",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  };
  // Ajoutez un état pour contrôler l'ouverture du dialogue d'édition
const [editOpen, setEditOpen] = useState(false);
const [selectedEvenement, setSelectedEvenement] = useState(null);

const handleCloseEdit = () => {
  setEditOpen(false); // Fermez le dialogue de modification
  // Réinitialiser les données du formulaire à leur valeur initiale ou à une valeur vide
  setFormData({
    Datedevenement: '',
    Localisation: ''
  });
};
// Ajoutez une fonction pour ouvrir le dialogue d'édition et pré-remplir les données du congé
const handleEditOpen = (evenement) => {
  setSelectedEvenement(evenement); // Set the selected evenement to state
  setFormData({ // Populate the form data with the selected evenement data
    Datedevenement: evenement.Datedevenement || '',
    Localisation: evenement.Localisation || '' ,
    HeureEvenement :evenement.HeureEvenement || ''

  });
  setEditOpen(true); // Open the edit dialog
};
  // Convertir les données de l'ancien tableau vers le format requis par le nouveau tableau
  const rows = evenement.map((evenement) => ({
    id: evenement._id,
    Datedevenement: evenement.Datedevenement, // Utilisez la clé correcte ici
    Localisation: evenement.Localisation,
    HeureEvenement :evenement.HeureEvenement ,

  }));
  const handleEditSubmit = async (e) => {
    e.preventDefault(); // Empêcher le comportement par défaut du formulaire
  
    // Vérifier si selectedConge est valide et contient l'ID du congé
    if (!selectedEvenement|| !selectedEvenement.id) {
      console.error("ID de evenement invalide.");
      return;
    }
  
    try {
      // Appeler la fonction editCongerAction pour modifier le congé
      await dispatch(editEvenementAction(selectedEvenement.id, formData));
  
      // Fermer la fenêtre modale de modification après la soumission
      setEditOpen(false);
        // Rafraîchir la liste des congés
        dispatch(listerEvenement());
  
      // Afficher une notification de succès
      Swal.fire({
        icon: "success",
        title: "Succès!",
        text: "Les données du Evenement ont été mises à jour avec succès!",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données du Evenement:", error);
  
      // Afficher une notification d'erreur
      Swal.fire({
        icon: "error",
        title: "Erreur!",
        text: "Une erreur s'est produite lors de la mise à jour des données du Evenement. Veuillez réessayer plus tard.",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  };

  const deleteEvenement = async (id) => {
    try {
        if (!id) {
            console.error("L'ID du Evenement est manquant");
            return;
        }

        // Afficher une alerte de confirmation avant de supprimer l'événement
        const confirmation = await Swal.fire({
            title: "Êtes-vous sûr?",
            text: "Vous ne pourrez pas récupérer cet événement une fois supprimé!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Oui, supprimer!",
            cancelButtonText: "Annuler",
        });

        // Si l'utilisateur confirme la suppression
        if (confirmation.isConfirmed) {
            // Envoyer une requête DELETE au backend pour supprimer l'événement
            const deleteResponse = await axios.get(`http://localhost:3000/evenement/${id}/supprimer`);

            // Vérifier si la suppression s'est faite avec succès (statut 200)
            if (deleteResponse.status === 200) {
                // Afficher une alerte de succès
                await Swal.fire(
                    "Supprimé!",
                    "Le evenement a été supprimé avec succès.",
                    "success"
                );

                // Rafraîchir la liste des événements après la suppression
                dispatch(listerEvenement());

                // Rediriger l'utilisateur vers une autre page si nécessaire
                // history.push("/autre-page");
            } else {
                throw new Error("La suppression du evenement a échoué.");
            }
        }
    } catch (error) {
        console.error("Une erreur s'est produite lors de la suppression du evenement :", error);
        // Afficher une alerte d'erreur en cas d'échec
        await Swal.fire(
            "Erreur",
            "Une erreur s'est produite lors de la suppression du evenement.",
            "error"
        );
    }
};

  // Définir les colonnes de votre tableau
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 , headerClassName: 'custom-header',},
    { field: 'Datedevenement', headerName: 'Date d"evenement', width: 300 , headerClassName: 'custom-header',},
    { field: 'Localisation', headerName: 'Localisation', width: 300 , headerClassName: 'custom-header',},
    { field: 'HeureEvenement', headerName: 'Heure d evanement', width: 200 , headerClassName: 'custom-header',},

      {
        field: 'action',
        headerName: 'Actions',
        headerClassName: 'custom-header',
        width: 320,
        renderCell: (params) => {
          console.log(params); // Vérifiez les paramètres reçus
          return (
            <div>
             <IconButton
  color="secondary"
  onClick={() => deleteEvenement(params.row.id)}
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
  <h2 className="custom-title">les Evénements </h2>

        <Button variant="contained" startIcon={<Event />} onClick={handleOpen}>
        Ajouter un Evenement
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Ajouter un evenement</DialogTitle>
      <DialogContent>
        <TextField fullWidth margin="normal" 
        label="Localisation"
         name="Localisation"
          value={formData.Localisation} 
          onChange={handleChange} 
          />
        <TextField 
  fullWidth 
  margin="normal" 
  label="Date d'evenement" 
  type="date" 
  InputLabelProps={{ shrink: true }} 
  name="Datedevenement" 
  value={formData.Datedevenement} 
  onChange={handleChange} 
/>   
<TextField
  fullWidth
  margin="normal"
  label="Heure de l'évenement"
  type="time"
  InputLabelProps={{
    shrink: true,
  }}
  inputProps={{
    step: 300, // 5 minutes
  }}
  name="HeureEvenement"
  value={formData.HeureEvenement}
  onChange={handleTimeChange}
/> 
   </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button onClick={handleSubmit}  variant="contained" style={{ backgroundColor: '#4caf50', color: 'white' }}>Ajouter</Button>
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
        <DialogTitle>Modifier l'evenement</DialogTitle>
        <DialogContent>
        <TextField 
      fullWidth 
      margin="normal"
      label="Localisation"
      name="Localisation" 
      value={formData.Localisation}
      onChange={handleChange}
    />    
<TextField 
  fullWidth 
  margin="normal" 
  label="Date de l'évenement" 
  type="date" 
  InputLabelProps={{ shrink: true }} 
  name="Datedevenement" 
  value={formData.Datedevenement} 
  onChange={handleChange} 
/>
<TextField
  fullWidth
  margin="normal"
  label="Heure de l'evenement"
  type="time"
  InputLabelProps={{
    shrink: true,
  }}
  inputProps={{
    step: 300, // 5 minutes
  }}
  name="HeureEvenement"
  value={formData.HeureEvenement}
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
export default  Evenement  ;
