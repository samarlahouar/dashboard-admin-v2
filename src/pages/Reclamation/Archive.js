import React, { useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from "react-redux";
import { listerReclamationArchive } from "../../components/Actions/archive.actions";
import IconButton from '@mui/material/IconButton';
import Swal from 'sweetalert2';
import axios from "axios"; 
import DeleteIcon from '@mui/icons-material/Delete';

const Archive = () => {
  const archiver = useSelector((state) => state.archive.archiver || []); 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listerReclamationArchive());
  }, [dispatch]);

  const deletereclamation = async (id) => {
    try {
        if (!id) {
            console.error("L'ID du reclamation est manquant");
            return;
        }

        // Envoyer une requête DELETE au backend pour supprimer le congé
        const deleteResponse = await axios.delete(`http://localhost:3000/archivereclamation/${id}/supprimer`);


        // Vérifier si la suppression s'est faite avec succès (statut 200)
        if (deleteResponse.status === 200) {
            // Afficher une alerte de succès
            await Swal.fire(
                "Supprimé!",
                "Le reclamation a été supprimé avec succès.",
                "success"
            );
            
            // Rafraîchir la liste des congés après la suppression
            dispatch(listerReclamationArchive());
            
            // Rediriger l'utilisateur vers une autre page si nécessaire
            // history.push("/autre-page");
        } else {
            throw new Error("La suppression du reclamation a échoué.");
        }
    } catch (error) {
        console.error("Une erreur s'est produite lors de la suppression du reclamation :", error);
        // Afficher une alerte d'erreur en cas d'échec
        await Swal.fire(
            "Erreur",
            "Une erreur s'est produite lors de la suppression du reclamation.",
            "error"
        );
    }
};
  // Ajouter une propriété "id" unique à chaque réclamation en utilisant "_id"
  const rows = archiver.map((archiver) => ({
    id: archiver._id, // Utilisation de "_id" comme ID unique
    nom: archiver.nom || '',
    Datedereclamation: archiver.Datedereclamation || '',
    HeureReclamation: archiver.HeureReclamation || '',
    Reclamtion: archiver.Reclamtion || '',
    statut: archiver.statut || ''
  }));

  // Définir les colonnes de votre tableau
  const columns = [
    { field: 'nom', headerName: "Nom et prénom", width: 200 , headerClassName: 'custom-header',},
    { field: 'Datedereclamation', headerName: 'Date de Réclamation', width: 200, headerClassName: 'custom-header', },
    { field: 'HeureReclamation', headerName: 'Heure de déclaration', width: 200 , headerClassName: 'custom-header',},
    { field: 'statut', headerName: 'Statut', width: 200 , headerClassName: 'custom-header',},
    { field: 'Reclamtion', headerName: 'La Réclamation', width: 450 , headerClassName: 'custom-header',},
    {
      field: 'action',
      headerName: 'Actions',
      width: 100,
      headerClassName: 'custom-header',
      renderCell: (params) => {
        return (
          <div>
            <IconButton
  color="secondary"
  onClick={() => deletereclamation(params.row.id)}
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
    
    <>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
  <h2 className="custom-title">les Réclamations Archivé   </h2>
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
    </>
  );
}

export default Archive;
