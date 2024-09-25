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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import axios from "axios"; // Importez axios
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Event } from '@mui/icons-material';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { listerReclamation , editReclamationAction } from "../../components/Actions/Reclamation.actions";
import {ajouterReclamation} from '../../components/Actions/archive.actions';
import { useHistory } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';




const Reclamation  = () => {

  const history = useHistory();


    const recalamation = useSelector(state => state.reclamation.reclamation.Reclamationlist|| state.reclamation.reclamation);  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listerReclamation());
  }, [dispatch]);

  
  const [formData, setFormData] = useState({
    nom:'',
    Datedereclamation: '', // Modifier ce champ pour qu'il soit de type String
    HeureReclamation :'',
    Reclamtion: '',
    statut:''

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
    if (name === "Datedereclamation") {
      console.log("Nouvelle valeur de date :", value); // Vérifiez la nouvelle valeur de la date
      setFormData({ ...formData,Datedereclamation: value });
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
    await addReclamation(formData);
    

    // Fermer la fenêtre modale du formulaire étape par étape après l'ajout
    setOpen(false);
  };
 


  const addReclamation = async (data) => {
    try {
      // Vérifier si les données sont vides avant de les envoyer au backend
      if (
        !data.nom ||
        !data.Datedereclamation ||
        !data.HeureReclamation ||
        !data.Reclamtion ||
        !data.statut
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
      await axios.post("http://localhost:3000/recalamation/ajouter", data);
  
      // Réinitialiser le formulaire ou fermer la popup après l'ajout
      setFormData({
        nom:'',
        Datedereclamation: '',
        HeureReclamation:'',
        Reclamtion: '',
        statut:''
      });
  
      // Rafraîchir la liste des congés
      dispatch(listerReclamation());
  
      // Afficher une alerte de succès
      Swal.fire({
        icon: "success",
        title: "Succès!",
        text: "Un nouveau reclamation a été ajouté avec succès!",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du reclamation:", error);
  
      // Afficher une alerte d'échec
      Swal.fire({
        icon: "error",
        title: "Erreur!",
        text: "Une erreur s'est produite lors de l'ajout du reclamation. Veuillez réessayer plus tard.",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  };
  // Ajoutez un état pour contrôler l'ouverture du dialogue d'édition
const [editOpen, setEditOpen] = useState(false);
const [selectedRecalamation, setselectedRecalamation] = useState(null);

const handleCloseEdit = () => {
  setEditOpen(false); // Fermez le dialogue de modification
  // Réinitialiser les données du formulaire à leur valeur initiale ou à une valeur vide
  setFormData({
    nom:'',
    Datedereclamation: '',
    HeureReclamation:'',
    Reclamtion: '', 
    statut:''
  });
};
// Ajoutez une fonction pour ouvrir le dialogue d'édition et pré-remplir les données du congé
const handleEditOpen = (recalamation) => {
  setselectedRecalamation(recalamation); // Set the selected recalamation to state
  setFormData({ // Populate the form data with the selected recalamation data
    nom:recalamation.nom || '',
    Datedereclamation: recalamation.Datedereclamation || '',
    HeureReclamation :recalamation.HeureReclamation || '' ,
    Reclamtion: recalamation.Reclamtion || '' ,
    statut:recalamation.statut || ''
  

  });
  setEditOpen(true); // Open the edit dialog
};
  // Convertir les données de l'ancien tableau vers le format requis par le nouveau tableau
  const rows = recalamation.map((recalamation) => ({
    id: recalamation._id,
    nom:recalamation.nom,
    Datedereclamation: recalamation.Datedereclamation, // Utilisez la clé correcte ici
    HeureReclamation :recalamation.HeureReclamation ,
    Reclamtion: recalamation.Reclamtion,
    statut:recalamation.statut,


  }));
  const handleEditSubmit = async (e) => {
    e.preventDefault(); // Empêcher le comportement par défaut du formulaire
  
    // Vérifier si selectedConge est valide et contient l'ID du congé
    if (!selectedRecalamation || !selectedRecalamation.id) {
        console.error("ID de reclamation invalide.");
        return;
    }
  
    // Vérifier si tous les champs requis sont remplis
    if (!formData.nom || !formData.Reclamtion || !formData.Datedereclamation || !formData.HeureReclamation || !formData.statut) {
        // Afficher une notification d'erreur indiquant à l'utilisateur de remplir tous les champs obligatoires
        Swal.fire({
            icon: "error",
            title: "Champs manquants!",
            text: "Veuillez remplir tous les champs obligatoires.",
            confirmButtonColor: "#d33",
            confirmButtonText: "OK",
        });
        return; // Sortir de la fonction sans soumettre le formulaire
    }
  
    try {
        // Appeler la fonction editCongerAction pour modifier le congé
        await dispatch(editReclamationAction(selectedRecalamation.id, formData));
  
        // Fermer la fenêtre modale de modification après la soumission
        setEditOpen(false);
        // Rafraîchir la liste des congés
        dispatch(listerReclamation());
  
        // Afficher une notification de succès
        Swal.fire({
            icon: "success",
            title: "Succès!",
            text: "Les données du reclamation ont été mises à jour avec succès!",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
        });
    } catch (error) {
        console.error("Erreur lors de la mise à jour des données du reclamation:", error);
  
        // Afficher une notification d'erreur
        Swal.fire({
            icon: "error",
            title: "Erreur!",
            text: "Une erreur s'est produite lors de la mise à jour des données du reclamation. Veuillez réessayer plus tard.",
            confirmButtonColor: "#d33",
            confirmButtonText: "OK",
        });
    }
};
  const deleteReclamation = async (id) => {
    try {
        if (!id) {
            console.error("L'ID de la réclamation est manquant");
            return;
        }

        // Afficher une alerte de confirmation avant de supprimer la réclamation
        const confirmation = await Swal.fire({
            title: "Êtes-vous sûr?",
            text: "Vous ne pourrez pas récupérer cette réclamation une fois supprimée!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Oui, supprimer!",
            cancelButtonText: "Annuler",
        });

        // Si l'utilisateur confirme la suppression
        if (confirmation.isConfirmed) {
            // Envoyer une requête DELETE au backend pour supprimer la réclamation
            const deleteResponse = await axios.get(`http://localhost:3000/recalamation/${id}/supprimer`);

            // Vérifier si la suppression s'est faite avec succès (statut 200)
            if (deleteResponse.status === 200) {
                // Récupérer les données de la réclamation supprimée depuis la réponse du backend
                const deletedReclamation = deleteResponse.data.deletedReclamation;

                // Ajouter les données de la réclamation dans le tableau d'archives
                dispatch(ajouterReclamation(deletedReclamation));

                // Rediriger l'utilisateur vers la page d'archives
                history.push("/Archive");

                // Afficher une alerte de succès
                await Swal.fire(
                    "Supprimé!",
                    "La réclamation a été supprimée et ajoutée à la page d'archives avec succès.",
                    "success"
                );
            } else {
                throw new Error("La suppression de la réclamation a échoué.");
            }
        }
    } catch (error) {
        console.error("Une erreur s'est produite lors de la suppression de la réclamation :", error);
        // Afficher une alerte d'erreur en cas d'échec
        await Swal.fire(
            "Erreur",
            "Une erreur s'est produite lors de la suppression de la réclamation.",
            "error"
        );
    }
};
const getStatutColor = (statut) => {
  if (statut === 'Consulté') {
    return '#4caf50'; // Vert clair pour le statut "Consulté"
  } else {
    return '#f44336'; // Rouge pour le statut "Non consulté"
  }
};


  // Définir les colonnes de votre tableau
  const columns = [
    { field: 'nom', headerName: "Nom et prénom", width: 200 , headerClassName: 'custom-header',},
    { field: 'Datedereclamation', headerName: 'Date de Réclamation', width: 200, headerClassName: 'custom-header', },
    { field: 'HeureReclamation', headerName: 'Heure de décalartion ', width: 200 , headerClassName: 'custom-header',},
    {
      field: 'statut',
      headerName: 'Statut',
      width: 200,
      headerClassName: 'custom-header',
      renderCell: (params) => {
        return (
          <div style={{ backgroundColor: getStatutColor(params.value), padding: '5px', borderRadius: '5px' }}>
            {params.value}
          </div>
        );
      },
    },
    { field: 'Reclamtion', headerName: 'La Réclamtion', width: 350 , headerClassName: 'custom-header',},

      {
        field: 'action',
        headerName: 'Actions',
        width: 100,
       headerClassName: 'custom-header',
        renderCell: (params) => {
          console.log(params); // Vérifiez les paramètres reçus
          return (
            <div>
              <IconButton
  color="secondary"
  onClick={() => deleteReclamation(params.row.id)}
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
  <h2 className="custom-title">les Réclamations  </h2>
        <Button variant="contained" startIcon={<Event />} onClick={handleOpen}>
        Ajouter une Réclamation
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Ajouter une Réclamation</DialogTitle>
      <DialogContent>
      <TextField fullWidth margin="normal" 
        label="nom"
         name="nom"
          value={formData.nom} 
          onChange={handleChange} 
          />

        <TextField fullWidth margin="normal" 
        label="Reclamtion"
         name="Reclamtion"
          value={formData.Reclamtion} 
          onChange={handleChange} 
          />
        <TextField 
  fullWidth 
  margin="normal" 
  label="Date de réclamation" 
  type="date" 
  InputLabelProps={{ shrink: true }} 
  name="Datedereclamation" 
  value={formData.Datedereclamation} 
  onChange={handleChange} 
/>   
<TextField
  fullWidth
  margin="normal"
  label="Heure de la réclamation "
  type="time"
  InputLabelProps={{
    shrink: true,
  }}
  inputProps={{
    step: 300, // 5 minutes
  }}
  name="HeureReclamation"
  value={formData.HeureReclamation}
  onChange={handleTimeChange}
/> 
   </DialogContent>
   <TextField select fullWidth margin="normal" label="Statut" name="statut" value={formData.statut} onChange={handleChange}>
    <MenuItem value="Non consulté">Non consulté</MenuItem>
  </TextField>

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
        <DialogTitle>Modifier votre Réclamation</DialogTitle>
        <DialogContent>

        <TextField 
  fullWidth 
  margin="normal"
  label="Nom et prénom"
  name="nom" 
  value={formData.nom}
  onChange={handleChange}
/>
        <TextField 
      fullWidth 
      margin="normal"
      label="Reclamtion"
      name="Reclamtion" 
      value={formData.Reclamtion}
      onChange={handleChange}
    />    
<TextField 
  fullWidth 
  margin="normal" 
  label="Date de l'évenement" 
  type="date" 
  InputLabelProps={{ shrink: true }} 
  name="Datedereclamation" 
  value={formData.Datedereclamation} 
  onChange={handleChange} 
/>
<TextField
  fullWidth
  margin="normal"
  label="Heure de l'reclamation"
  type="time"
  InputLabelProps={{
    shrink: true,
  }}
  inputProps={{
    step: 300, // 5 minutes
  }}
  name="HeureReclamation"
  value={formData.HeureReclamation}
  onChange={handleTimeChange}
/>
<RadioGroup
  aria-label="Statut"
  name="statut"
  value={formData.statut}
  onChange={handleChange}
  row // Pour afficher les boutons radio horizontalement
>
  <FormControlLabel value="Consulté" control={<Radio />} label="Consulté" />
  <FormControlLabel value="Non consulté" control={<Radio />} label="Non consulté" />
</RadioGroup>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleCloseEdit}>Annuler</Button>
        <Button onClick={handleEditSubmit} style={{ backgroundColor: 'green', color: 'white' }}>Modifier</Button>
        </DialogActions>
      </Dialog>
    </div>
  );


}
export default  Reclamation  ;
