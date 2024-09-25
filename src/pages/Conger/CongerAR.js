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
import { listerCongerArchive } from "../../components/Actions/archive.conger";
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';


function CongerAR() {
  const dispatch = useDispatch();
  const archiveConger = useSelector((state) => state.archiveConger.archiveConger);

  useEffect(() => {
    dispatch(listerCongerArchive());
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
    Commentaires: ''
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
    Commentaires: ''
  });
};
// Ajoutez une fonction pour ouvrir le dialogue d'édition et pré-remplir les données du congé
const handleEditOpen = (archiveConger) => {
  setSelectedConge(archiveConger); // Set the selected conge to state
  setFormData({ // Populate the form data with the selected conge data
    Nomdeemploye: archiveConger.Nomdeemploye || '',
    Datedelademande: archiveConger.Datedelademande || '',
    Typedeconge: archiveConger.Typedeconge || '',
    Datededebut: archiveConger.Datededebut || '',
    Datedefin: archiveConger.Datedefin || '',
    Nombredejours: archiveConger.Nombredejours || '',
    Statutdelademande: archiveConger.Statutdelademande || '',
    Raison: archiveConger.Raison || '',
    Commentaires: archiveConger.Commentaires || ''
  });
  setEditOpen(true); // Open the edit dialog
};
  // Convertir les données de l'ancien tableau vers le format requis par le nouveau tableau
  const rows = archiveConger ? archiveConger.map((archiveConger) => ({
    id: archiveConger._id,
    Nomdeemploye: archiveConger.Nomdeemploye || '',
    Datedelademande: archiveConger.Datedelademande || '',
    Typedeconge: archiveConger.Typedeconge || '',
    Datededebut: archiveConger.Datededebut || '',
    Datedefin: archiveConger.Datedefin || '',
    Nombredejours: archiveConger.Nombredejours || '',
    Statutdelademande: archiveConger.Statutdelademande || '',
    Raison: archiveConger.Raison || '',
    Commentaires: archiveConger.Commentaires || ''
  })) : [];
 
  const deleteConge = async (id) => {
    try {
        if (!id) {
            console.error("L'ID du congé est manquant");
            return;
        }

        // Envoyer une requête DELETE au backend pour supprimer le congé
        const deleteResponse = await axios.delete(`http://localhost:3000/archiveconger/${id}/supprimer`);

        // Vérifier si la suppression s'est faite avec succès (statut 200)
        if (deleteResponse.status === 200) {
            // Afficher une alerte de succès
            await Swal.fire(
                "Supprimé!",
                "Le congé a été supprimé avec succès.",
                "success"
            );
            
            // Rafraîchir la liste des congés après la suppression
            dispatch(listerCongerArchive());
            
            // Rediriger l'utilisateur vers une autre page si nécessaire
            // history.push("/autre-page");
        } else {
            throw new Error("La suppression du congé a échoué.");
        }
    } catch (error) {
        console.error("Une erreur s'est produite lors de la suppression du congé :", error);
        // Afficher une alerte d'erreur en cas d'échec
        await Swal.fire(
            "Erreur",
            "Une erreur s'est produite lors de la suppression du congé.",
            "error"
        );
    }
};
  
  // Définir les colonnes de votre tableau
  const columns = [
    { field: 'id', headerName: 'ID', width: 70, headerClassName: 'custom-header', },
    { field: 'Nomdeemploye', headerName: 'Nom de l\'employe', width: 130, headerClassName: 'custom-header', },
    { field: 'Datedelademande', headerName: 'Date de la demande', width: 150 , headerClassName: 'custom-header',},
    { field: 'Typedeconge', headerName: 'Type de conge', width: 130 , headerClassName: 'custom-header',},
    { field: 'Datededebut', headerName: 'Date de debut', width: 130 , headerClassName: 'custom-header',},
    { field: 'Datedefin', headerName: 'Date de fin', width: 130 , headerClassName: 'custom-header',},
    { field: 'Nombredejours', headerName: 'Nombre de jours', width: 130, headerClassName: 'custom-header', },
    { field: 'Statutdelademande', headerName: 'Statut de la demande', width: 150, headerClassName: 'custom-header', },
    { field: 'Raison', headerName: 'Raison', width: 130 , headerClassName: 'custom-header',},
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
  onClick={() => deleteConge(params.row.id)}
  style={{ color: 'red' }} // Changer la couleur de l'icône "Delete" en rouge
>
  <DeleteIcon />
</IconButton>
             
            </div>
          );
        },
      },
  ];

  return (
    <div>
     <div style={{ textAlign: 'center', marginBottom: '30px' }}>
  <h2 className="custom-title">Les Congés Archivé   </h2>
      
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


   
      
    
    </div>
  );
}

export default CongerAR;
