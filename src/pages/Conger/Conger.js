import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import axios from "axios"; // Importez axios
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { listerConger , editCongerAction} from '../../components/Actions/conger.actions';
import {ajouterConger} from'../../components/Actions/archive.conger';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import './conger.css';

function Conger() {
  const dispatch = useDispatch();
  const conger = useSelector(state => state.conger.conger.Congélist|| state.conger.conger);
  const history = useHistory();

  useEffect(() => {
    dispatch(listerConger());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    Nomdeemploye: '',
    Datedelademande: '',
    Typedeconge: '',
    Datededebut: '',
    Datedefin: '',
    Nombredejours: '',
    Statutdelademande: '',
    Raison: '',
    Commentaires: '',
    email :''
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
    setFormData({ ...formData, [name]: value });
  };

 

 
  // Ajoutez un état pour contrôler l'ouverture du dialogue d'édition
const [editOpen, setEditOpen] = useState(false);
const [selectedConge, setSelectedConge] = useState(null);

const handleCloseEdit = () => {
  setEditOpen(false); // Fermez le dialogue de modification
  // Réinitialiser les données du formulaire à leur valeur initiale ou à une valeur vide
  setFormData({
    Nomdeemploye: '',
    Datedelademande: '',
    Typedeconge: '',
    Datededebut: '',
    Datedefin: '',
    Nombredejours: '',
    Statutdelademande: '',
    Raison: '',
    Commentaires: '',
    email:''
  });
};
// Ajoutez une fonction pour ouvrir le dialogue d'édition et pré-remplir les données du congé
const handleEditOpen = (conge) => {
  setSelectedConge(conge); // Set the selected conge to state
  setFormData({ // Populate the form data with the selected conge data
    Nomdeemploye: conge.Nomdeemploye || '',
    Datedelademande: conge.Datedelademande || '',
    Typedeconge: conge.Typedeconge || '',
    Datededebut: conge.Datededebut || '',
    Datedefin: conge.Datedefin || '',
    Nombredejours: conge.Nombredejours || '',
    Statutdelademande: conge.Statutdelademande || '',
    Raison: conge.Raison || '',
    Commentaires: conge.Commentaires || '',
    email: conge.email || ''

  });
  setEditOpen(true); // Open the edit dialog
};
  // Convertir les données de l'ancien tableau vers le format requis par le nouveau tableau
  const rows = conger.map((conger) => ({
    id: conger._id,
    Nomdeemploye: conger.Nomdeemploye,
    Datedelademande: conger.Datedelademande,
    Typedeconge: conger.Typedeconge,
    Datededebut: conger.Datededebut,
    Datedefin: conger.Datedefin,
    Nombredejours: conger.Nombredejours,
    Statutdelademande: conger.Statutdelademande,
    Raison: conger.Raison,
    Commentaires: conger.Commentaires,
    email: conger.email,

  }));
  const handleEditSubmit = async (e) => {
    e.preventDefault(); // Empêcher le comportement par défaut du formulaire
  
    // Vérifier si selectedConge est valide et contient l'ID du congé
    if (!selectedConge || !selectedConge.id) {
        console.error("ID de congé invalide.");
        return;
    }
  
    try {
        // Appeler la fonction editCongerAction pour modifier le congé
        await dispatch(editCongerAction(selectedConge.id, formData));
  
        // Fermer la fenêtre modale de modification après la soumission
        setEditOpen(false);
  
        // Rafraîchir la liste des congés
        dispatch(listerConger());
  
        // Afficher une notification de succès
        Swal.fire({
            icon: "success",
            title: "Succès!",
            text: "Les données du congé ont été mises à jour avec succès!",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
        });
    } catch (error) {
        console.error("Erreur lors de la mise à jour des données du congé:", error);
  
        // Afficher une notification d'erreur
        Swal.fire({
            icon: "error",
            title: "Erreur!",
            text: "Une erreur s'est produite lors de la mise à jour des données du congé. Veuillez réessayer plus tard.",
            confirmButtonColor: "#d33",
            confirmButtonText: "OK",
        });
    }
};

  const deleteConger = async (id) => {
    try {
        if (!id) {
            console.error("L'ID de la congé est manquant");
            return;
        }

        // Fetch the conger details from the server
        const congerDetailsResponse = await axios.get(`http://localhost:3000/conger/${id}`);
        const congerDetails = congerDetailsResponse.data; // Assuming conger details are returned in data field

        // Afficher une alerte de confirmation avant de supprimer la congé
        const confirmation = await Swal.fire({
            title: "Êtes-vous sûr?",
            text: "Vous ne pourrez pas récupérer cette congé une fois supprimée!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Oui, supprimer!",
            cancelButtonText: "Annuler",
        });

        // Si l'utilisateur confirme la suppression
        if (confirmation.isConfirmed) {
            // Envoyer une requête DELETE au backend pour supprimer la congé
            const deleteResponse = await axios.get(`http://localhost:3000/conger/${id}/supprimer`);

            // Vérifier si la suppression s'est faite avec succès (statut 200)
            if (deleteResponse.status === 200) {
                // Dispatch the action to add the deleted conger to the archive
                dispatch(ajouterConger(congerDetails));

                // Redirect the user to the archive page
                history.push("/CongerAR");

                // Show a success alert
                await Swal.fire(
                    "Supprimé!",
                    "La congé a été supprimée et ajoutée à la page d'archives avec succès.",
                    "success"
                );
            } else {
                throw new Error("La suppression de la congé a échoué.");
            }
        }
    } catch (error) {
        console.error("Une erreur s'est produite lors de la suppression de la congé :", error);
        // Show an error alert in case of failure
        await Swal.fire(
            "Erreur",
            "Une erreur s'est produite lors de la suppression de la congé.",
            "error"
        );
    }
};


 
  
  // Définir les colonnes de votre tableau
  const columns = [
    { field: 'id', headerName: 'ID', width: 70, headerClassName: 'custom-header', },
    { field: 'Nomdeemploye', headerName: 'Nom de l\'employe', width: 130 , headerClassName: 'custom-header',},
    { field: 'Datedelademande', headerName: 'Date de la demande', width: 150 , headerClassName: 'custom-header',},
    { field: 'Typedeconge', headerName: 'Type de conge', width: 130 , headerClassName: 'custom-header',},
    { field: 'Datededebut', headerName: 'Date de debut', width: 130 , headerClassName: 'custom-header',},
    { field: 'Datedefin', headerName: 'Date de fin', width: 130 , headerClassName: 'custom-header',  },
    { field: 'Nombredejours', headerName: 'Nombre de jours', width: 130, headerClassName: 'custom-header', },
    { field: 'email', headerName: 'E-mail', width: 130, headerClassName: 'custom-header', },

    {
      field: 'Statutdelademande',
      headerName: 'Statut de la demande',
      headerClassName: 'custom-header', // Utilisation de la classe CSS personnalisée pour l'en-tête
      width: 150,
      cellClassName: (params) => getStatusColor(params.value),
    } ,   { field: 'Raison', headerName: 'Raison', width: 130 , headerClassName: 'custom-header',},
    { field: 'Commentaires', headerName: 'Commentaires', width: 290, headerClassName: 'custom-header',},
    
      {
        field: 'action',
        headerName: 'Actions',
        width: 150,
        headerClassName: 'custom-header',
        renderCell: (params) => {
          console.log(params); // Vérifiez les paramètres reçus
          return (
            <div>
            <IconButton
              color="secondary"
              onClick={() => deleteConger(params.row.id)}
              style={{ color: 'red' }} // Changer la couleur de l'icône "Delete" en rouge
            >
              <DeleteIcon />
            </IconButton>
          
            <IconButton
              color="primary"
              onClick={() => handleEditOpen(params.row)}
              style={{ color: 'blue' }} // Changer la couleur de l'icône "Reply" en bleu
            >
              <ReplyIcon />
            </IconButton>
          </div>
          );
        },
      },
  ];
  const getStatusColor = (status) => {
    switch (status) {
      case 'Approuvé':
        return 'approved'; // Classe CSS pour l'état approuvé
      case 'Refusé':
        return 'rejected'; // Classe CSS pour l'état refusé
      case 'En attente':
      default:
        return 'pending'; // Classe CSS par défaut pour l'état en attente
    }
  };
  return (
    <div>
    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
  <h2 className="custom-title">les demandes de congés</h2>
</div>
     
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
        <DialogTitle>Répondre au congé</DialogTitle>
        <DialogContent>
        <RadioGroup aria-label="Statut de la demande" name="Statutdelademande" value={formData.Statutdelademande} onChange={handleChange}>
  <FormControlLabel value="En attente" control={<Radio />} label="En attente" />
  <FormControlLabel value="Approuvé" control={<Radio />} label="Approuvé" />
  <FormControlLabel value="Refusé" control={<Radio />} label="Refusé" />
</RadioGroup>
  <TextField
    fullWidth
    margin="normal"
    label="Commentaires du directeur"
    multiline
    rows={3}
    variant="outlined"
    name="Commentaires"
    value={formData.Commentaires}
    onChange={handleChange}
  />
</DialogContent>
        <DialogActions>
        <Button onClick={handleCloseEdit}>Annuler</Button>
        <Button onClick={handleEditSubmit} variant="contained" color="primary" style={{ color: 'white' }}>Valider</Button>
        </DialogActions>
      </Dialog>


      
    
    </div>
  );
}

export default Conger;
