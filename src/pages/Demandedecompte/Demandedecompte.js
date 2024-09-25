import React, { useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { listerCompte , sendConfirmationEmail, sendRejectionEmail  } from "../../components/Actions/demandedecompte.action";
import Button from '@mui/material/Button';
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Swal from 'sweetalert2';
import {ajouterDemande } from "../../components/Actions/archive.demande";
import { useHistory } from 'react-router-dom';






const Demandedecompte  = () => {



    const compte = useSelector(state => state.demandedecompte.compte.Comptelist || [] );
    const dispatch = useDispatch();
    const history = useHistory();

  useEffect(() => {
    dispatch(listerCompte());
  }, [dispatch]);

  const handleAccept = async (id, email, username, password, role) => {
    try {
      // Vérifiez que les données ne sont pas vides
      if (!username || !password || !role) {
        if (!username) {
          console.log("Le champ username est vide");
        }
        if (!password) {
          console.log("Le champ password est vide");
        }
        if (!role) {
          console.log("Le champ role est vide");
        }
        throw new Error('Certains champs sont vides');
      }
  
      // Envoyer l'e-mail de confirmation (si nécessaire, selon votre logique)
      await sendConfirmationEmail(email);
  
      // Ajouter l'utilisateur dans la base de données en appelant la route correspondante
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }), // Envoyer les données de l'utilisateur au backend
      });
  
      if (response.ok) {
        // Rafraîchir la liste des comptes après avoir accepté la demande
        dispatch(listerCompte());
        // Afficher une notification de succès
        Swal.fire({
          icon: 'success',
          title: 'Email envoyé avec succès! et le compte sera ajouté avec succès',
          text: `L'email a été envoyé à ${email}.`,
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l\'ajout de l\'utilisateur');
      }
    } catch (error) {
      console.error("Erreur lors de l'acceptation de la demande de compte:", error);
      // Afficher une notification d'erreur
      Swal.fire({
        icon: 'error',
        title: 'Erreur lors de l\'ajout de l\'utilisateur',
        text: error.message,
      });
    }
  };
  
  const handleReject = async (id, email) => {
    try {
      // Utilisez la fonction d'action pour envoyer l'e-mail de refus
      await sendRejectionEmail(email);

      // Rafraîchir la liste des comptes après avoir refusé la demande
      dispatch(listerCompte());
    } catch (error) {
      console.error("Erreur lors du refus de la demande de compte:", error);
    }
    Swal.fire({
      icon: 'success',
      title: 'Email envoyé avec succès!',
      text: `L'email a été envoyé à ${email}.`,
  });
  };

  const [formData, setFormData] = useState({
    Nom: '', // Modifier ce champ pour qu'il soit de type String
    Prenom: '',
    email :'',
    phone :'',
    Matricule:'',
    username:'',
    password:'',
    role:''


  });

  const deleteDemande = async (id) => {
    try {
        if (!id) {
            console.error("L'ID de la demande est manquant");
            return;
        }

        // Afficher une alerte de confirmation avant de supprimer la demande
        const confirmation = await Swal.fire({
            title: "Êtes-vous sûr?",
            text: "Vous ne pourrez pas récupérer cette demande une fois supprimée!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Oui, supprimer!",
            cancelButtonText: "Annuler",
        });

        // Si l'utilisateur confirme la suppression
        if (confirmation.isConfirmed) {
            // Récupérer les détails de la demande avant la suppression
            const demandeDetailsResponse = await axios.get(`http://localhost:3000/demandedecompte/${id}`);
            const demandeDetails = demandeDetailsResponse.data; // Supposons que les détails de la demande sont retournés dans le champ data

            // Envoyer une requête DELETE au backend pour supprimer la demande
            const deleteResponse = await axios.get(`http://localhost:3000/demandedecompte/${id}/supprimer`);

            // Vérifier si la suppression s'est faite avec succès (statut 200)
            if (deleteResponse.status === 200) {
                // Ajouter la demande supprimée à la table des demandes archivées
                const archiveResponse = await axios.post(`http://localhost:3000/archivedemande/ajouter`, demandeDetails);

                // Vérifier si l'ajout aux archives s'est fait avec succès (statut 200 ou 201)
                if (archiveResponse.status === 200 || archiveResponse.status === 201) {
                    // Afficher une alerte de succès
                    await Swal.fire(
                        "Supprimé!",
                        "La demande a été supprimée et ajoutée à la page d'archives avec succès.",
                        "success"
                    );

                    // Rediriger l'utilisateur vers la page d'archives
                    history.push("/DemandeAR");
                } else {
                    console.error('Archive Response:', archiveResponse);
                    throw new Error("L'ajout de la demande à l'archive a échoué.");
                }
            } else {
                console.error('Delete Response:', deleteResponse);
                throw new Error("La suppression de la demande a échoué.");
            }
        }
    } catch (error) {
        console.error("Une erreur s'est produite lors de la suppression de la demande :", error);
        // Afficher une alerte d'erreur en cas d'échec
        await Swal.fire(
            "Erreur",
            "Une erreur s'est produite lors de la suppression de la demande.",
            "error"
        );
    }
};
  
 


 

  // Convertir les données de l'ancien tableau vers le format requis par le nouveau tableau
  const rows = compte.map((compte) => ({
    id: compte._id,
    Nom: compte.Nom, // Utilisez la clé correcte ici
    Prenom:compte.Prenom,
    email :compte.email ,
    phone :compte.phone ,
    Matricule:compte.Matricule,
    username:compte.username,
    password:compte.password,
    role:compte.role,

  }));
 
  
  

  // Définir les colonnes de votre tableau
  const columns = [
    { field: 'Nom', headerName: 'Nom ', width: 100 , headerClassName: 'custom-header', },
    { field: 'Prenom', headerName: 'Prenom', width: 100, headerClassName: 'custom-header',  },
    { field: 'email', headerName: "email", width: 200 , headerClassName: 'custom-header', },
    { field: 'phone', headerName: "phone", width: 100 , headerClassName: 'custom-header', },
    { field: 'Matricule', headerName: "Matricule", width: 200 , headerClassName: 'custom-header', },
    { field: 'username', headerName: "username", width: 200, headerClassName: 'custom-header',  },
    { field: 'password', headerName: "password", width: 200 , headerClassName: 'custom-header', },
    { field: 'role', headerName: "role", width: 200 , headerClassName: 'custom-header', },

    {
        field: 'action',
        headerName: 'Actions',
        width: 400,
         headerClassName: 'custom-header', 
        renderCell: (params) => {
          return (
            <div style={{ marginTop: '10px' }}>
            <Button 
              variant="contained" 
              color="error" 
              onClick={() => deleteDemande(params.row.id)}
              startIcon={<DeleteIcon />}
            >
              Supprimer
            </Button>
            <span style={{ marginLeft: '10px' }}></span>
            <Button 
    variant="contained" 
    color="primary" 
    onClick={() => handleAccept(params.row.id, params.row.email, params.row.username, params.row.password, params.row.role)}
>
    Accepter
</Button>
            <span style={{ marginLeft: '10px' }}></span>
            <Button variant="contained" color="secondary" onClick={() => handleReject(params.row.id, params.row.email)}>
              Refuser
            </Button>
          </div>
          );
        },
      },
    


    

        
        
  ];

 
  return (
    <div>
   <div style={{ textAlign: 'center', marginBottom: '30px' }}>
  <h2 className="custom-title">les Demandes de compte   </h2>
     
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
export default  Demandedecompte  ;
