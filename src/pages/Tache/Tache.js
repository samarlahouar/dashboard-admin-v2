import React, { useState } from "react";
import {
  Paper,
  makeStyles,
  Toolbar,
  InputAdornment,
  Button as MuiButton,
} from "@material-ui/core";
import useTable from "../UseTable";
import * as employeeService from "../Employer/employeeService";
import Controls from "../controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import PageHeader from "../PageHeader";
import {
  listerTache,
  addTacheAction,
  deleteTacheAction,
  editTacheAction,
} from "../../components/Actions/tache.actions";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "../Tache/Tache.css";
import Swal from 'sweetalert2';
import { DataGrid } from '@mui/x-data-grid';
import MultiStepForm from '../Tache/MultiStepForm';
import EditTacheForm from "../Tache/EditTacheForm";
import { Dialog, DialogContent, Typography } from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import AssignmentTurnedInIcon from '@material-ui/icons/Visibility';



const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
  dialogTitle: {
    paddingRight: "0px",
  },
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: "none",
  },
  secondary: {
    backgroundColor: theme.palette.secondary.light,
    "& .MuiButton-label": {
      color: theme.palette.secondary.main,
    },
  },
  primary: {
    backgroundColor: theme.palette.primary.light,
    "& .MuiButton-label": {
      color: theme.palette.primary.main,
    },
  },
  
}));

const headCells = [
  { id: "Nom de tache", label: "Nom de tache" },
  { id: "Déscription", label: "Déscription" },
  { id: "Statu", label: "statu" },
  { id: "projet", label: "projet" },
  { id: "Département", label: "Département " },
  {id: "commentaire", label:"commentaire"},
  {id: "commentaireemployee", label:"commentaireemployee"},

  { id: "actions", label: "Actions", disableSorting: true },
];

function Tache() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const tache = useSelector(
    (state) => state.tache.tache.tachelist || state.tache.tache
  );

  useEffect(() => {
    dispatch(listerTache());
  }, [dispatch]);
  
  const columns = [
    { field: 'nomdetache', headerName: 'Nom de tache', width: 200 , headerClassName: 'custom-header',},
    { field: 'description', headerName: 'Déscription', width: 200 , headerClassName: 'custom-header',},
    { 
      field: 'status', 
      headerName: 'Statut', 
      width: 150, 
      headerClassName: 'custom-header',
      renderCell: (params) => (
        <div className={getStatusColor(params.value)}>
          {params.value}
        </div>
      ),
    },    { field: 'projet', headerName: 'projet', width: 150 , headerClassName: 'custom-header',},
    { field: 'departement', headerName: 'Département', width: 150, headerClassName: 'custom-header', },
    { field: 'commentaire', headerName: 'Commentaire de directeur ', width: 200 , headerClassName: 'custom-header',},
    { field: 'commentaireemployee', headerName: 'commentaire de employée  ', width: 200 , headerClassName: 'custom-header',},


    { field: 'actions', headerName: 'Actions', width: 400, 
    headerClassName: 'custom-header',
    renderCell: (params) => (
      <>
       <div>
       <MuiButton color="primary" onClick={() => handleShowEdit(params.row)}>
  <EditOutlinedIcon />
</MuiButton>
<MuiButton
  color="secondary"
  onClick={() => deleteTache(params.row._id)} // Utilisez params.row._id
>
  <CloseIcon />
</MuiButton>
<MuiButton color="primary" onClick={() => handleView(params.row)}>
  <VisibilityIcon />
</MuiButton>
          
        </div>
      </>
    )}
  ];
  const getStatusColor = (status) => {
    switch (status) {
      case 'terminé':
        return 'terminé'; // Classe CSS pour l'état approuvé
      case 'Encours':
        return 'Encours'; // Classe CSS pour l'état en attente
      case 'Annuler':
        return 'Annuler'; // Classe CSS pour l'état annulé
      default:
        return ''; // Aucune classe par défaut
    }
  };
  const rows = tache.map((tache, index) => ({
    id: tache._id, // Utiliser _id à la place de id
    "nomdetache": tache.nomdetache,
    "description": tache.description,
    "status": tache.status,
    "projet": tache.projet,
    "departement": tache.departement,
    "commentaire": tache.commentaire,
    "commentaireemployee": tache.commentaireemployee,
  }));
  const [tachePopup, setTachePopup] = useState(null);

  const [openTachePopup, setOpenTachePopup] = useState(false);
  const handleView = (tacheData) => {
    setTachePopup(tacheData);
    setOpenTachePopup(true);
  };

  const deleteTache = async (id) => {
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
          await dispatch(deleteTacheAction(id));
          await dispatch(listerTache());

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

  const [id, setId] = useState("");
  const editTache = async () => {
    // Vérifiez que id est défini et non vide
    if (!id) {
        console.error("L'ID de tâche est manquant");
        return;
    }

    const data = {};
    columns.forEach((element) => {
        data[element.name] = formData[element.name];
    });

    console.log(data);

    // Assurez-vous que les données nécessaires sont présentes dans l'objet data
    if (!data) {
        console.error("Les données de tâche sont manquantes");
        return;
    }

    try {
        await dispatch(editTacheAction(id, data)); // Passer l'id et les données à la fonction editEmployerAction
        await dispatch(listerTache());
        setOpenPopup(false);
        setFormData({});

        Swal.fire({
            icon: 'success',
            title: 'Succès!',
            text: 'La modification de la tâche s\'est effectuée avec succès!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        });
    } catch (error) {
        console.error('Erreur lors de la modification de la tâche:', error);

        Swal.fire({
            icon: 'error',
            title: 'Erreur!',
            text: 'Une erreur s\'est produite lors de la modification de la tâche. Veuillez réessayer plus tard.',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK'
        });
    }
};
  const [edit, setEdit] = useState(false);
  const handlecloseEdit = () => setEdit(false);
  

 
  const handleFormSubmit = (data) => {
    console.log("Form data:", data);
    setOpenPopup(false); // Fermer le popup après soumission
    handlecloseEdit();
  };
  const handleShowEdit = (Tache) => {
    // Vérifiez si l'objet Tache est valide et contient un champ _id ou id
    if (Tache && (Tache._id || Tache.id)) {
        // Utilisez Tache._id s'il est disponible, sinon utilisez Tache.id
        const TacheId = Tache._id || Tache.id;
        console.log("ID de département:", TacheId);
        setOpenEditForm(true); // Ouvrir le formulaire de modification
        setSelectedTache({ ...Tache, _id: TacheId }); // Assurez-vous que _id est présent dans l'objet
    } else {
        console.error("Objet département invalide ou champ _id manquant:", Tache);
        // Afficher éventuellement un message d'erreur à l'utilisateur
        // alert("Données de département invalides. Veuillez réessayer.");
    }
};
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selectedTache, setSelectedTache] = useState(null);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState(employeeService.getAllEmployees());
  const [filterFn, setFilterFn] = useState({ fn: (items) => items });
  const [openPopup, setOpenPopup] = useState(false);
  const [formData, setFormData] = useState({});

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);
    

  // État pour stocker les lignes d'origine non filtrées
  const [originalRows, setOriginalRows] = useState([]);

  // État pour stocker les lignes filtrées
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    // Mettre à jour les données originales et filtrées lorsqu'il y a un changement dans les tâches
    setOriginalRows(tache);
    setFilteredRows(tache);
  }, [tache]);

    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = (e) => {
      const searchTerm = e.target.value.toLowerCase();
      // Filtrer les lignes d'origine en fonction du terme de recherche
      const filteredData = originalRows.filter((row) =>
        row["nomdetache"].toLowerCase().includes(searchTerm)
      );
      // Mettre à jour les lignes filtrées
      setFilteredRows(filteredData);
    };
  const handleAddNew = () => {
    setRecordForEdit(null);
    setOpenPopup(true);
  };
  const validate = (fieldValues = formData) => {
    let temp = {};
    // Validation logic...
    return Object.values(temp).every((val) => val === "");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleFormSubmit(formData);
      setFormData({});
    }
  };
  

  return (
    <>
      <PageHeader
        title="Liste des tâches"
        icon={<AssignmentTurnedInIcon fontSize="large" />}
        />
      <Paper className={classes.pageContent}>
        <Toolbar>
        <Controls.Input
          label="Recherche tâche"
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
            <Controls.Button text="Ajouter"  variant="outlined" startIcon={<AddIcon />} className={classes.newButton3} onClick={handleAddNew} />
        </Toolbar>
        <MultiStepForm
            open={openPopup} // Passez l'état pour ouvrir/fermer le formulaire à plusieurs étapes
            setOpen={setOpenPopup} // Fonction pour modifier l'état d'ouverture/fermeture du formulaire à plusieurs étapes
          />
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid
  rows={filteredRows}
  columns={columns}
  pageSize={5}
  checkboxSelection
  getRowId={(row) => row._id} // Spécifier la fonction pour extraire l'ID de chaque ligne
/>
        </div>



        
      </Paper>


       {/* Popup pour afficher les données de la tâche */}
       <Dialog
  open={openTachePopup}
  onClose={() => setOpenTachePopup(false)}
  maxWidth="sm"
  fullWidth
>
  <DialogContent>
    <Typography variant="h6">Détails de la tâche</Typography>
    {tachePopup && (
      <div>
        <Typography>Nom de tâche: {tachePopup.nomdetache}</Typography>
        <Typography>Déscription: {tachePopup.description}</Typography>
        <Typography>Status: {tachePopup.status}</Typography>
        <Typography>Projet: {tachePopup.projet}</Typography>
        <Typography>Département: {tachePopup.departement}</Typography>
        <Typography>commentaire: {tachePopup.commentaire}</Typography>


      </div>
    )}
  </DialogContent>
</Dialog>

      {openEditForm && (
    <EditTacheForm
        open={openEditForm}
        setOpen={setOpenEditForm}
        TacheData={selectedTache} // Passer les données du département sélectionné
    />
)}
            
    </>
  );
}

function ActionButton(props) {
  const { color, children, onClick } = props;
  const classes = useStyles();

  return (
    <MuiButton
      className={`${classes.root} ${classes[color]}`}
      onClick={onClick}
    >
      {children}
    </MuiButton>
  );
}
export default Tache;
