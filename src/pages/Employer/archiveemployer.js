import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { listerEmployerArchive, supprimerEmployerArchive } from "../../components/Actions/archiveemployer.action";
import Swal from "sweetalert2";
import  './archivemploy.css';
import {
  Paper,
  makeStyles,
  Toolbar,
  InputAdornment,
  Button as MuiButton,
} from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import PageHeader from "../PageHeader";
import { Search } from "@material-ui/icons";
import Controls from "../controls/Controls";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
}));

const ArchiveEmployer = () => {
        const archiver = useSelector((state) => state.archiver.archiver || []).map((archiver) => ({
          ...archiver,
          id: archiver._id // Utiliser la propriété _id comme identifiant unique
        }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listerEmployerArchive());
  }, [dispatch]);

  const classes = useStyles();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArchiver, setFilteredArchiver] = useState([]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const filteredEmployees = archiver.filter((employer) => {
      return employer.nom.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredArchiver(filteredEmployees);
  }, [searchTerm, archiver]);

  const archiveEmployerColumns = [
    { field: 'nom', headerName: 'Nom employé', width: 130, headerClassName: 'custom-header', },
    { field: 'prenom', headerName: 'Prénom employé', width: 130, headerClassName: 'custom-header', },
    { field: 'adresse', headerName: 'Adresse', width: 200 , headerClassName: 'custom-header',},
    { field: 'matricule', headerName: 'Matricule', width: 130 , headerClassName: 'custom-header',},
    { field: 'numerodetelephone', headerName: 'Numéro de téléphone', width: 160 , headerClassName: 'custom-header',},
    { field: 'dateDebutTravail', headerName: 'Date de début de travail', width: 180, headerClassName: 'custom-header', },
    { field: 'Role', headerName: 'Rôle', width: 130 , headerClassName: 'custom-header',},
    { field: 'email', headerName: 'Email', width: 180, headerClassName: 'custom-header', },
    { field: 'departement', headerName: 'Département', width: 130 , headerClassName: 'custom-header',},
    { field: 'projet', headerName: 'Projet', width: 130 , headerClassName: 'custom-header',},
    { field: 'tache', headerName: 'Tâche', width: 400, headerClassName: 'custom-header',},
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      headerClassName: 'custom-header',
      renderCell: (params) => (
        <MuiButton color="secondary" onClick={() => deleteArchive(params.row.id)}>
          <CloseIcon />
        </MuiButton>
      ),
    },
  ];

  const deleteArchive = async (id) => {
    // Afficher une alerte de confirmation
    const confirmation = await Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière après cela!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    });

    // Vérifier si l'utilisateur a cliqué sur le bouton de confirmation
    if (confirmation.isConfirmed) {
      try {
        await dispatch(supprimerEmployerArchive(id));
        await dispatch(listerEmployerArchive());

        // Afficher une alerte de succès si la suppression est réussie
        Swal.fire({
          icon: 'success',
          title: 'Succès!',
          text: 'Le projet a été supprimé avec succès!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
      } catch (error) {
        console.error('Erreur lors de la suppression du projet:', error);

        // Afficher une alerte d'erreur si une erreur se produit
        Swal.fire({
          icon: 'error',
          title: 'Erreur!',
          text: 'Une erreur s\'est produite lors de la suppression du projet. Veuillez réessayer plus tard.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        });
      }
    } else {
      // Afficher une alerte si l'utilisateur annule la suppression
      Swal.fire({
        icon: 'info',
        title: 'Annulé',
        text: 'La suppression du projet a été annulée.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
    }
  }

  return (
    <div className="archiveEmployer">
      <div className="header">
        <PageHeader
          title="Liste des Employés archiver"
          icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
        />
      </div>
      <div className="table-section">
        <Paper className={classes.pageContent}>
          <Toolbar>
            <Controls.Input
              label="Recherche Employés archiver "
              className={classes.searchInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
            />
          </Toolbar>
          {filteredArchiver.length > 0 ? (
            <DataGrid
              className="datagrid"
              rows={filteredArchiver}
              columns={archiveEmployerColumns}
              pageSize={9}
              rowsPerPageOptions={[9]}
              checkboxSelection
              getRowId={(row) => row.id}
            />
          ) : (
            <div>Aucune archive à afficher</div>
          )}
        </Paper>
      </div>
    </div>
  );
};

export default ArchiveEmployer;
