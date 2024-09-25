import React, { useState } from "react";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Grid,
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
import { listerProjet, addProjetAction, deleteProjetAction, editProjetAction } from '../../components/Actions/projet.actions';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./projet.css";
import Swal from 'sweetalert2';
import { DataGrid } from '@mui/x-data-grid';
import MultiStepForm from '../projet/MultiStepForm';
import EditProjetForm from "../projet/EditProjetForm";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';




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

function Projet() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const projet = useSelector(state => state.projet.projet.projetlist|| state.projet.projet);

  useEffect(() => {
    dispatch(listerProjet());
  }, [dispatch]);

  const [nomdeprojet, setnomdeprojet] = useState("");
  const [description, setdescription] = useState("");
  const [objectif, setobjectif] = useState("");
  const [periodeestimé, setperiodeestimé] = useState("");
  const [type,settype] = useState("");
  const [cout,setcout] = useState("");
  const [statutdeprogression, setstatutdeprogression] = useState("");
  const [lestaches, setlestaches] = useState("");
  const [responsable, setresponsable] = useState("");
  const [employés, setemployés] = useState("");

  const columns = [
    { field: 'nomdeprojet', headerName: 'Nom de projet', width: 200 , headerClassName: 'custom-header',},
    { field: 'responsable', headerName: 'Résponsable', width: 200 , headerClassName: 'custom-header',},
    {
      field: 'objectif',
      headerName: 'Objectif',
       headerClassName: 'custom-header',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'pre-line' }}>
          {params.row.objectif}
        </div>
      ),
    },
      { field: 'periodeestimé', headerName: 'Période estimé', width: 200 , headerClassName: 'custom-header',},
    { field: 'type', headerName: 'Type', width: 130 , headerClassName: 'custom-header',},
    { field: 'cout', headerName: 'Cout', width: 130 , headerClassName: 'custom-header',},
    {
      field: 'statutdeprogression',
      headerName: 'Statut de progression',
      width: 200,
      headerClassName: 'custom-header',
      renderCell: (params) => (
        <div
          style={{
            backgroundColor: getProgressColor(params.row.statutdeprogression),
            padding: '8px',
            borderRadius: '4px',
          }}
        >
          {params.row.statutdeprogression}
        </div>
      ),
    },    {
      field: 'lestaches',
      headerName: 'Les taches',
       headerClassName: 'custom-header',
      width: 400,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'pre-line' }}>
          {params.row.lestaches.split('\n').map((task, index) => (
            <div key={index}>{task}</div>
          ))}
        </div>
      ),
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 400,
       headerClassName: 'custom-header',
      renderCell: (params) => (
        <div style={{ whiteSpace: 'pre-line' }}>
          {params.row.description.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      ),
    },  {
      field: 'employés',
      headerName: 'Employés',
      width: 300,
       headerClassName: 'custom-header',
      renderCell: (params) => (
        <div style={{ whiteSpace: 'pre-line' }}>
          {params.row.employés.split(', ').map((employee, index, array) => (
            <React.Fragment key={index}>
              {employee}
              {index !== array.length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
     headerClassName: 'custom-header',
      width: 210,
      renderCell: (params) => (
        <div>
       <MuiButton
  color="primary"
  onClick={() => handleShowEdit(params.row)}
>
  <EditOutlinedIcon />
</MuiButton>

<MuiButton
  color="secondary"
  onClick={() => deleteProjet(params.row.id)}
>
  <CloseIcon />
</MuiButton>
<MuiButton color="primary" onClick={() => handleShowDetails(params.row)}>
          <VisibilityOutlinedIcon />
        </MuiButton>
          
        </div>
      ),
    },
  ];

  const getProgressColor = (progress) => {
    const percentage = parseInt(progress); // Ensure progress is an integer
    if (percentage >= 0 && percentage <= 30) {
      return 'red'; // For 0-30% completion, set background color to red
    } else if (percentage >= 40 && percentage <= 90) {
      return 'lightblue'; // For 40-90% completion, set background color to light blue
    } else if (percentage === 100) {
      return 'lightgreen'; // For 100% completion, set background color to light green
    } else {
      return 'inherit'; // For other values, use default background color
    }
  };
   // Convertir les données de l'ancien tableau vers le format requis par le nouveau tableau
   const rows = projet.map((projet) => ({
    id: projet._id,
    nomdeprojet: projet.nomdeprojet,
    description: projet.description,
    objectif: projet.objectif,
    periodeestimé: projet.periodeestimé,
    type: projet.type,
    cout: projet.cout,
    statutdeprogression: projet.statutdeprogression,
    lestaches: projet.lestaches,
    responsable: projet.responsable,
    employés: projet.employés,
  }));

  const inputFormElements = [
    {
      name: "nomdeprojet",
      value: nomdeprojet,
      onChange: (e) => {
        setnomdeprojet(e.target.value);
      },
      placeholder: "Enter Nom de projet",
      label: " nomdeprojet",
      variant: "outlined",
      fullWidth: true,
      xs: 12,
      sm: 6,
    },
    {
      name: "description",
      value: description,
      onChange: (e) => {
        setdescription(e.target.value);
      },
      placeholder: ".....",
      label: "description",
      variant: "outlined",
      fullWidth: true,
      xs: 12,
      sm: 6,
    },
    {
      name: "objectif",
      value: objectif,
      onChange: (e) => {
        setobjectif(e.target.value);
      },
      placeholder: "Enter objectif",
      label: "objectif",
      variant: "outlined",
      fullWidth: true,

      xs: 12,
      sm: 6,
    },
    {
      name: "periodeestimé",
      value: periodeestimé,
      onChange: (e) => {
        setperiodeestimé(e.target.value);
      },
      placeholder: "Enter la periode estimé",
      label: "periodeestimé",
      variant: "outlined",
      fullWidth: true,

      xs: 12,
      sm: 6,
    },
    {
      name: "type",
      value: type,
      onChange: (e) => {
        settype(e.target.value);
      },
      placeholder: "Enter type",
      label: "type",
      variant: "outlined",
      fullWidth: true,

      xs: 12,
      sm: 6,
    },
    {
      name: "cout",
      value: cout,
      onChange: (e) => {
        setcout(e.target.value);
      },
      placeholder: "Enter le cout de projet",
      label: "cout",
      variant: "outlined",
      fullWidth: true,

      xs: 12,
      sm: 6,
    },
    {
      name: "statutdeprogression",
      value: statutdeprogression,
      onChange: (e) => {
        setstatutdeprogression(e.target.value);
      },
      placeholder: "Enter statut de progréssion",
      label: "statutdeprogression",
      variant: "outlined",
      fullWidth: true,

      xs: 12,
      sm: 6,
    },

    {
      name: "lestaches",
      value: lestaches,
      onChange: (e) => {
        setlestaches(e.target.value);
      },
      placeholder: "Enter les taches à faire pour ce projet",
      label: "lestaches",
      variant: "outlined",
      fullWidth: true,

      xs: 12,
      sm: 6,
    },

    {
      name: "responsable",
      value: responsable,
      onChange: (e) => {
        setresponsable(e.target.value);
      },
      placeholder: "Enter le Résponsable",
      label: "responsable",
      variant: "outlined",
      fullWidth: true,

      xs: 12,
      sm: 6,
    },

    {
      name: "employés",
      value: employés,
      onChange: (e) => {
        setemployés(e.target.value);
      },
      placeholder: "Enter les  employés",
      label: " employés",
      variant: "outlined",
      fullWidth: true,
      xs: 12,
      sm: 6,
    },
  ];

  const addProjet = async () => {
    const data = {};
    inputFormElements.forEach((element) => {
      data[element.name] = formData[element.name];
    });
    console.log(data);

    try {
        await dispatch(addProjetAction(data));
        await dispatch(listerProjet());
        setOpenPopup(false);
        setFormData({});

        // Afficher l'alerte de succès en vert
        Swal.fire({
            icon: 'success',
            title: 'Succès!',
            text: 'Un nouveau projet a été ajouté avec succès!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du projet:', error);

        // Afficher l'alerte d'échec en rouge
        Swal.fire({
            icon: 'error',
            title: 'Erreur!',
            text: 'Une erreur s\'est produite lors de l\'ajout du projet. Veuillez réessayer plus tard.',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK'
        });
    }
};
const deleteProjet = async (id) => {
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
          await dispatch(deleteProjetAction(id));
          await dispatch(listerProjet());

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

  const [id,setId]=useState('');
 const editProjet = async () => {
    // Vérifiez que l'ID est défini et non vide
    if (!id) {
        console.error("L'ID de projet est manquant");
        return;
    }
  
    const data = {};
    inputFormElements.forEach((element) => {
        data[element.name] = formData[element.name];
    });
  
    console.log(data);
  
    // Assurez-vous que les données nécessaires sont présentes dans l'objet data
    if (!data) {
        console.error("Les données de projet sont manquantes");
        return;
    }

    try {
        await dispatch(editProjetAction(id, data)); // Passer l'ID et les données à la fonction editProjetAction
        await dispatch(listerProjet());
        setOpenPopup(false);
        setFormData({});

        // Afficher une alerte de succès
        Swal.fire({
            icon: 'success',
            title: 'Succès!',
            text: 'La modification du projet a été effectuée avec succès!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        });
    } catch (error) {
        console.error('Erreur lors de la modification du projet:', error);

        // Afficher une alerte d'erreur en cas d'échec de la modification
        Swal.fire({
            icon: 'error',
            title: 'Erreur!',
            text: 'Une erreur s\'est produite lors de la modification du projet. Veuillez réessayer plus tard.',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK'
        });
    }
};

 
  const [edit, setEdit] = useState(false);
  const handlecloseEdit = () => setEdit(false);
  
  const handleFormModifeir = async (e) => {
    e.preventDefault();
    console.log("Formulaire de modification soumis !");
    console.log("ID de projet:", id);
    await editProjet(id);
    setOpenPopup(false); // Fermer le popup après soumission
    setFormData({}); // Réinitialiser les données du formulaire
    handlecloseEdit();
  };
  const handleFormSubmit = (data) => {
    console.log("Form data:", data);
    setOpenPopup(false); // Fermer le popup après soumission
    handlecloseEdit();
  };
  const handleShowEdit = (projet) => {
    // Check if the project object has the expected fields
    if (projet && (projet._id || projet.id)) {
        // Use projet._id if available, otherwise use projet.id
        const projectId = projet._id || projet.id;
        console.log("ID de projet:", projectId);
        setOpenEditForm(true);
        setOpenPopup(false);
        setSelectedProjet({ ...projet, _id: projectId }); // Ensure _id field is present
    } else {
        console.error("Invalid project object or missing _id field:", projet);
        // Optionally, display an error message to the user
        // alert("Invalid project data. Please try again.");
    }
};
 
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState(employeeService.getAllEmployees());
  const [filterFn, setFilterFn] = useState({ fn: (items) => items });
  const [openPopup, setOpenPopup] = useState(false);
  const [formData, setFormData] = useState({});
  const [openEditForm, setOpenEditForm] = useState(false); // État pour contrôler l'ouverture du formulaire d'édition
const [selectedProjet, setSelectedProjet] = useState(null); // État pour stocker les données de l'employé sélectionné

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, filterFn);

    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };
    const filteredRows = rows.filter((row) =>
  row.nomdeprojet.toLowerCase().includes(searchTerm.toLowerCase())
);
    useEffect(() => {
      setFilterFn({
        fn: (items) => {
          if (searchTerm === "") {
            return items; // Si aucun terme de recherche, retourner tous les enregistrements
          } else {
            // Sinon, filtrer les enregistrements basés sur le terme de recherche
            return items.filter((item) =>
              item.nomdeprojet.toLowerCase().includes(searchTerm.toLowerCase())
            );
          }
        },
      });
    }, [searchTerm]);
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


  
  // Fonction pour afficher les détails de l'employé dans un popup
const handleShowDetails = (projetData) => {
  setShowDetails(true);
  setSelectedProjet(projetData);
};
// Déclaration de l'état pour contrôler l'affichage du popup et stocker les données de l'employé sélectionné
const [showDetails, setShowDetails] = useState(false);

const ProjetDetailsPopup = ({ open, handleClose, projet }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>projet Details</DialogTitle>
      <DialogContent>
        {/* Vérifier si employee est défini avant d'afficher les détails */}
        {projet && (
          <>
            <div>Nom de projet: {projet.nomdeprojet}</div>
            <div>responsable: {projet.responsable}</div>
            <div>objectif: {projet.objectif}</div>
            <div>periodeestimé: {projet.periodeestimé}</div>
          <div>type: {projet.type}</div>
          <div>cout: {projet.cout}</div>
          <div>statutdeprogression: {projet.statutdeprogression}</div>
          <div>les taches: {projet.lestaches}</div>
          <div>description: {projet.description}</div>
          <div>employés: {projet.employés}</div>

                   </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
};

  return (
    <>
      <PageHeader
        title=" Liste des Projets"
        icon={<WorkOutlineIcon fontSize="large" />}
        />
      <Paper className={classes.pageContent}>
        <Toolbar>
        <Controls.Input
  label="Recherche Projet"
  className={classes.searchInput}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <Search />
      </InputAdornment>
    ),
  }}
  value={searchTerm} // Ajoutez cet attribut pour refléter l'état du terme de recherche
  onChange={handleSearch}
/>
          <Controls.Button
            text="Ajouter"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton3}
            onClick={handleAddNew}
          />
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
/>
    </div>

    {/* Ajoutez le composant EmployeeDetailsPopup ici */}
<ProjetDetailsPopup 
  open={showDetails} 
  handleClose={() => setShowDetails(false)} 
  projet={selectedProjet} 
/>
        
      </Paper>
      {openEditForm && (
    <EditProjetForm
        open={openEditForm}
        setOpen={setOpenEditForm}
        ProjetData={selectedProjet} // Passer les données du projet sélectionné comme prop
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
export default Projet;
