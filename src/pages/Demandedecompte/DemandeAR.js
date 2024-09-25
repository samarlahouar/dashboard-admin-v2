import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import axios from "axios"; // Importez axios
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { listerDemandeArchive } from "../../components/Actions/archive.demande";
import Swal from 'sweetalert2';


function DemandeAR() {
  const dispatch = useDispatch();
  const archiveDemande = useSelector((state) => state.archiveDemande.archiveDemande);

  useEffect(() => {
    dispatch(listerDemandeArchive());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    Nom: '', 
    Prenom: '',
    email :'',
    phone :'',
    Matricule:'',
    username:'',
    password:'', 
    role:''


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
    Nom: '', // Modifier ce champ pour qu'il soit de type String
    Prenom: '',
    email :'',
    phone :'',
    Matricule:'',
    username:'',
    password:'',
    role:''
  });
};
// Ajoutez une fonction pour ouvrir le dialogue d'édition et pré-remplir les données du congé
const handleEditOpen = (archiveDemande) => {
  setSelectedConge(archiveDemande); // Set the selected conge to state
  setFormData({ // Populate the form data with the selected conge data
    id: archiveDemande._id,
    Nom: archiveDemande.Nom || '',
    Prenom: archiveDemande.Prenom || '',
    email: archiveDemande.email || '',
    phone: archiveDemande.phone || '',
    Datedefin: archiveDemande.Datedefin || '',
    Matricule: archiveDemande.Matricule || '',
    username: archiveDemande.username || '',
    password: archiveDemande.password || '',
    role: archiveDemande.role || ''



  });
  setEditOpen(true); // Open the edit dialog
};
  // Convertir les données de l'ancien tableau vers le format requis par le nouveau tableau
  const rows = archiveDemande ? archiveDemande.map((archiveDemande) => ({
    id: archiveDemande._id,
    Nom: archiveDemande.Nom || '',
    Prenom: archiveDemande.Prenom || '',
    email: archiveDemande.email || '',
    phone: archiveDemande.phone || '',
    Datedefin: archiveDemande.Datedefin || '',
    Matricule: archiveDemande.Matricule || '',
    username: archiveDemande.username || '',
    password: archiveDemande.password || '',
    role: archiveDemande.role || ''

  })) : [];
 
  const deleteConge = async (id) => {
    try {
        if (!id) {
            console.error("L'ID du demande est manquant");
            return;
        }

        // Envoyer une requête DELETE au backend pour supprimer le congé
        const deleteResponse = await axios.delete(`http://localhost:3000/archiveDemande/${id}/supprimer`);

        // Vérifier si la suppression s'est faite avec succès (statut 200)
        if (deleteResponse.status === 200) {
            // Afficher une alerte de succès
            await Swal.fire(
                "Supprimé!",
                "Le demande a été supprimé avec succès.",
                "success"
            );
            
            // Rafraîchir la liste des congés après la suppression
            dispatch(listerDemandeArchive());
            
            // Rediriger l'utilisateur vers une autre page si nécessaire
            // history.push("/autre-page");
        } else {
            throw new Error("La suppression du demande a échoué.");
        }
    } catch (error) {
        console.error("Une erreur s'est produite lors de la suppression du demande :", error);
        // Afficher une alerte d'erreur en cas d'échec
        await Swal.fire(
            "Erreur",
            "Une erreur s'est produite lors de la suppression du demande.",
            "error"
        );
    }
};
  
  // Définir les colonnes de votre tableau
  const columns = [
    { field: 'Nom', headerName: 'Nom ', width: 100 , headerClassName: 'custom-header',},
    { field: 'Prenom', headerName: 'Prenom', width: 100, headerClassName: 'custom-header', },
    { field: 'email', headerName: "email", width: 200 , headerClassName: 'custom-header',},
    { field: 'phone', headerName: "phone", width: 100, headerClassName: 'custom-header', },
    { field: 'Matricule', headerName: "Matricule", width: 200, headerClassName: 'custom-header', },
    { field: 'username', headerName: "username", width: 200 , headerClassName: 'custom-header',},
    { field: 'password', headerName: "password", width: 200 , headerClassName: 'custom-header',},
    { field: 'role', headerName: "role", width: 200 , headerClassName: 'custom-header',},

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
  <h2 className="custom-title">Les Demandes Archivé   </h2>
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

export default DemandeAR;
