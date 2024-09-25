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
import * as employeeService from "./employeeService";
import Controls from "../controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import PageHeader from "../PageHeader";
import {
  listerEmployer,
  editEmployerAction,
  deleteEmployerAction,
} from "../../components/Actions/employer.actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./Employer.css";
import Swal from "sweetalert2";
import MultiStepForm from "./MuliStepForm";
import EditEmployeeForm from "../Employer/EditEmployeeForm";
import ArchiveEmployer from "./archiveemployer";
import { useHistory } from "react-router-dom";
import axios from 'axios'; 
import { DataGrid } from '@mui/x-data-grid';
import { ajouterArchive } from "../../components/Actions/archiveemployer.action";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

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
  transparentBackground: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  tableHeader: {
    backgroundColor: "ffff",
    color: 'bleu ',
  },
}));



function Employees() {
  const dispatch = useDispatch();
  const [nom, setNom] = useState("");
  const [prenom, setprenom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [matricule, setMatricule] = useState("");
  const [numerodetelephone, setNumerodetelephone] = useState("");
  const [Role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [departement, setDepartement] = useState("");
  const [projet, setProjet] = useState("");
  const [tache, setTache] = useState("");

  const columns = [
    { field: 'nom', headerName: 'Nom employé', width: 130 , headerClassName: 'custom-header',},
    { field: 'prenom', headerName: 'Prénom employé', width: 130 , headerClassName: 'custom-header',},
    { field: 'adresse', headerName: 'Adresse', width: 200 , headerClassName: 'custom-header',},
    { field: 'matricule', headerName: 'Matricule', width: 130, headerClassName: 'custom-header', },
    { field: 'numerodetelephone', headerName: 'Numéro de téléphone', width: 160 , headerClassName: 'custom-header',},
    { field: 'dateDebutTravail', headerName: 'Date de début de travail', width: 180 , headerClassName: 'custom-header',},
    { field: 'Role', headerName: 'Rôle', width: 150 , headerClassName: 'custom-header',},
    { field: 'email', headerName: 'Email', width: 180 , headerClassName: 'custom-header',},
    { field: 'departement', headerName: 'Département', width: 160 , headerClassName: 'custom-header',},
    { field: 'projet', headerName: 'Projet', width: 130 , headerClassName: 'custom-header',},
    { field: 'tache', headerName: 'Tâche', width: 400, headerClassName: 'custom-header',},
    {
      field: 'actions',
      headerName: 'Actions',
      width: 210,
      headerClassName: 'custom-header',
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
  onClick={() => deleteEmployer(params.row.id)}
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
  const employer = useSelector(
    (state) => state.employer.employer.Employerlist || state.employer.employer
  ).map((employee) => ({
    ...employee,
    id: employee._id // Utilisez la propriété _id comme identifiant unique
  }));

  useEffect(() => {
    dispatch(listerEmployer());
  }, [dispatch]);

  const inputFormElements = [
    {
      name: "nom",
      value: nom,
      onChange: (e) => {
        setNom(e.target.value);
      },
      placeholder: "Enter Nom de l'employé",
      label: "Nom employé",
      variant: "outlined",
      fullWidth: true,
      xs: 12,
      sm: 6,
    },
    {
      name: "prenom",
      value: prenom,
      onChange: (e) => {
        setprenom(e.target.value);
      },
      placeholder: "Enter prénom employé",
      label: "prénom employé",
      variant: "outlined",
      fullWidth: true,
      xs: 12,
      sm: 6,
    },
    {
      name: "adresse",
      value: adresse,
      onChange: (e) => {
        setAdresse(e.target.value);
      },
      type: "adresse",
      placeholder: "Enter adresse",
      label: "adresse",
      variant: "outlined",
      fullWidth: true,
      xs: 12,
      sm: 6,
    },
    {
      name: "matricule",
      value: matricule,
      onChange: (e) => {
        setMatricule(e.target.value);
      },
      type: "matricule",
      placeholder: "Enter matricule",
      label: "matricule",
      variant: "outlined",
      fullWidth: true,
      xs: 12,
      sm: 6,
    },
    {
      name: "numerodetelephone",
      value: numerodetelephone,
      onChange: (e) => {
        setNumerodetelephone(e.target.value);
      },
      placeholder: "Enter numéro de télephone",
      label: "numéro de télephone",
      variant: "outlined",
      fullWidth: true,
      xs: 12,
      sm: 6,
    },
    {
      name: "Role",
      value: Role,
      onChange: (e) => {
        setRole(e.target.value);
      },
      placeholder: "Enter Role",
      label: "Role",
      variant: "outlined",
      fullWidth: true,
      xs: 12,
      sm: 6,
    },
    {
      name: "email",
      value: email,
      onChange: (e) => {
        setEmail(e.target.value);
      },
      placeholder: "Enter email",
      label: "email",
      variant: "outlined",
      fullWidth: true,
      xs: 12,
      sm: 6,
    },
    {
      name: "departement",
      value: departement,
      onChange: (e) => {
        setDepartement(e.target.value);
      },
      placeholder: "Enter departement name",
      label: "departement",
      variant: "outlined",
      fullWidth: true,
      xs: 12,
      sm: 6,
    },
    {
      name: "projet",
      value: projet,
      onChange: (e) => {
        setProjet(e.target.value);
      },
      placeholder: "Enter projet ",
      label: "projet",
      variant: "outlined",
      fullWidth: true,
      xs: 12,
      sm: 12,
    },
    {
      name: "tache",
      value: tache,
      onChange: (e) => {
        setTache(e.target.value);
      },
      placeholder: "Enter le tache ",
      label: "tache",
      variant: "outlined",
      fullWidth: true,
      xs: 12,
      sm: 12,
    },
  ];

  const [nouveauTableau, setNouveauTableau] = useState([]);
  const [employees, setEmployer] = useState([]); // Définir la variable employees et la fonction setEmployees avec useState
  const [prevEmployees, setPrevEmployees] = useState([]);

  const history = useHistory();

  const deleteEmployer = async (id) => {
    try {
        if (!id) {
            console.error("L'ID de l'employé est manquant");
            return;
        }

        // Afficher une alerte de confirmation avant de supprimer l'employé
        const confirmation = await Swal.fire({
            title: "Êtes-vous sûr?",
            text: "Vous ne pourrez pas récupérer cet employé une fois supprimé!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Oui, supprimer!",
            cancelButtonText: "Annuler",
        });

        // Si l'utilisateur confirme la suppression
        if (confirmation.isConfirmed) {
            // Envoyer une requête DELETE au backend pour supprimer l'employé
            const deleteResponse = await axios.get(`http://localhost:3000/Employer/${id}/supprimer`);

            // Vérifier si la suppression s'est faite avec succès (statut 200)
            if (deleteResponse.status === 200) {
                // Récupérer les données de l'employé supprimé depuis la réponse du backend
                const deletedEmployee = deleteResponse.data.deletedEmployer;

                // Ajouter les données de l'employé dans le tableau d'archives
                dispatch(ajouterArchive(deletedEmployee));

                // Déplacer les données de l'employé vers la page Archiver en transmettant les données via l'objet state
                history.push({
                    pathname: "/archiveemployer",
                    state: { deletedEmployee: deletedEmployee },
                });

                // Afficher une alerte de succès
                await Swal.fire(
                    "Supprimé!",
                    "L'employé a été supprimé et ajouté à la page d'archives avec succès.",
                    "success"
                );
            } else {
                throw new Error("La suppression de l'employé a échoué.");
            }
        }
    } catch (error) {
        console.error("Une erreur s'est produite lors de la suppression de l'employé :", error);
        // Afficher une alerte d'erreur en cas d'échec
        await Swal.fire(
            "Erreur",
            "Une erreur s'est produite lors de la suppression de l'employé.",
            "error"
        );
    }
};


  const [openPopup, setOpenPopup] = useState(false);
  const [id, setId] = useState("");
  const editEmploye = async () => {
    // Vérifiez que l'ID est défini et non vide
    if (!id) {
      console.error("L'ID de l'employer est manquant");
      return;
    }

    const data = {};
    inputFormElements.forEach((element) => {
      data[element.name] = formData[element.name];
    });

    console.log(data);

    // Assurez-vous que les données nécessaires sont présentes dans l'objet data
    if (!data) {
      console.error("Les données de employe sont manquantes");
      return;
    }

    try {
      await dispatch(editEmployerAction(id, data)); // Passer l'ID et les données à la fonction editProjetAction
      await dispatch(listerEmployer());
      setOpenPopup(false);
      setFormData({});

      // Afficher une alerte de succès
      Swal.fire({
        icon: "success",
        title: "Succès!",
        text: "La modification du projet a été effectuée avec succès!",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Erreur lors de la modification du projet:", error);

      // Afficher une alerte d'erreur en cas d'échec de la modification
      Swal.fire({
        icon: "error",
        title: "Erreur!",
        text: "Une erreur s'est produite lors de la modification du projet. Veuillez réessayer plus tard.",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  };

  const [selectedEmploye, setSelectedEmploye] = useState(null);
  const [edit, setEdit] = useState(false);
  const handlecloseEdit = () => setEdit(false);

  const handleFormModifeir = async (e) => {
    e.preventDefault();
    console.log("Formulaire de modification soumis !");
    console.log("ID de projet:", id);
    await editEmploye(id);
    setOpenPopup(false); // Fermer le popup après soumission
    setFormData({}); // Réinitialiser les données du formulaire
    handlecloseEdit();
  };
  const handleFormSubmit = (data) => {
    console.log("Form data:", data);
    setOpenPopup(false); // Fermer le popup après soumission
    handlecloseEdit();
  };
  const [openEditForm, setOpenEditForm] = useState(false); // État pour contrôler l'ouverture du formulaire d'édition
  const [selectedEmployee, setSelectedEmployee] = useState(null); // État pour stocker les données de l'employé sélectionné

  const handleShowEdit = (employee) => {
    setSelectedEmployee(employee); // Mettre à jour l'état avec les données de l'employé sélectionné
    setOpenEditForm(true); // Ouvrir le formulaire d'édition en mettant à jour l'état
  };

  const classes = useStyles();

  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState(employeeService.getAllEmployees());
  const [filterFn, setFilterFn] = useState({ fn: (items) => items });
  const [formData, setFormData] = useState({});

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, filterFn);

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredEmployees = employer.filter(
    (employe) =>
      employe.hasOwnProperty("nom") &&
      employe.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleAddNew = () => {
    setOpenPopup(true); // Ouvrir le formulaire à plusieurs étapes
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
const handleShowDetails = (employeeData) => {
  setShowDetails(true);
  setSelectedEmployee(employeeData);
};
// Déclaration de l'état pour contrôler l'affichage du popup et stocker les données de l'employé sélectionné
const [showDetails, setShowDetails] = useState(false);

const EmployeeDetailsPopup = ({ open, handleClose, employee }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Employee Details</DialogTitle>
      <DialogContent>
        {/* Vérifier si employee est défini avant d'afficher les détails */}
        {employee && (
          <>
            <div>Nom: {employee.nom}</div>
            <div>Prénom: {employee.prenom}</div>
            <div>Adresse: {employee.adresse}</div>
            <div>matricule: {employee.matricule}</div>
          <div>numero de télephone: {employee.numerodetelephone}</div>
          <div>date Début de Travail: {employee.dateDebutTravail}</div>
          <div>Role: {employee.Role}</div>
          <div>Email: {employee.email}</div>
          <div>Département: {employee.departement}</div>
          <div>Projet: {employee.projet}</div>
          <div>Tache: {employee.tache}</div>          </>
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
      <div className="header">
        <PageHeader

          title="Liste des Employés"
          icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
          style={{ color: '#003cff' }} // Changer la couleur du titre en bleu (#003cff)

        />
      </div>
      <div className="table-section">
        <Paper className={classes.pageContent}>
          <Toolbar>
            <Controls.Input
              label="Recherche Employés"
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
            <Controls.Button
              text="Ajouter"
              variant="outlined"
              startIcon={<AddIcon />}
              className={classes.newButton}
              onClick={handleAddNew} // Déclenche l'ouverture du formulaire à plusieurs étapes
            />
          </Toolbar>

          <MultiStepForm
            open={openPopup} // Passez l'état pour ouvrir/fermer le formulaire à plusieurs étapes
            setOpen={setOpenPopup} // Fonction pour modifier l'état d'ouverture/fermeture du formulaire à plusieurs étapes
          />
<div style={{ height: 400, width: '100%' }}>
  <DataGrid
    rows={filteredEmployees} // Utiliser filteredEmployees au lieu de employer
    columns={columns}
    pageSize={5}
    checkboxSelection
  />
</div>
{/* Ajoutez le composant EmployeeDetailsPopup ici */}
<EmployeeDetailsPopup 
  open={showDetails} 
  handleClose={() => setShowDetails(false)} 
  employee={selectedEmployee} 
/>
        </Paper>
        {openEditForm && (
          <EditEmployeeForm
            open={openEditForm}
            setOpen={setOpenEditForm}
            employeeData={selectedEmployee}
          />
        )}
      </div>
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
export default Employees;
