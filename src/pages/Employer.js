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
import useTable from "./UseTable";
import * as employeeService from "./employeeService";
import Controls from "./controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import PageHeader from "./PageHeader";
import {
  listerEmployer,
  addEmployerAction,
  deleteEmployerAction,
  editEmployerAction,
} from "../components/Actions/employer.actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./Employer.css";
import Swal from 'sweetalert2';


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
  { id: "Nom ", label: "Nom employé" },
  { id: "prénom ", label: "Prénom employé" },
  { id: "Adresse", label: "Adresse" },
  { id: "Matricule", label: "Matricule" },
  { id: "Numéro de télephone", label: "Numéro de télephone" },
  { id: "Role", label: "Role" },
  { id: "email", label: "émail" },
  { id: "Département", label: "Départment" },
  { id: "projet", label: "projet" },
  { id: "Tache", label: "Tache" },
  { id: "Actions", label: "Actions", disableSorting: true },
];

function Employees() {
  const dispatch = useDispatch();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [matricule, setMatricule] = useState("");
  const [numerodetelephone, setNumerodetelephone] = useState("");
  const [Role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [departement, setDepartement] = useState("");
  const [projet, setProjet] = useState("");
  const [tache, setTache] = useState("");

  const employer = useSelector(
    (state) => state.employer.employer.Employerlist || state.employer.employer
  );

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
        setPrenom(e.target.value);
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

  const addEmployer = async () => { // Déclarez la fonction comme asynchrone
    const data = {};
    inputFormElements.forEach((element) => {
      data[element.name] = formData[element.name];
    });
    console.log(data);
  
    try {
      await dispatch(addEmployerAction(data));
      await dispatch(listerEmployer());
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
  const deleteEmployer = async (id) => {
    // Afficher une alerte de confirmation avant de supprimer l'employé
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer cet employé?',
      text: "Cette action est irréversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then(async (result) => {
      if (result.isConfirmed) {
        // L'utilisateur a confirmé la suppression, donc supprimer l'employé
        await dispatch(deleteEmployerAction(id));
        await dispatch(listerEmployer());
  
        // Afficher une alerte de succès si l'employé est supprimé avec succès
        Swal.fire(
          'Supprimé!',
          'L\'employé a été supprimé avec succès.',
          'success'
        );
      } else {
        // L'utilisateur a annulé la suppression, donc ne rien faire
        Swal.fire(
          'Annulé',
          'L\'employé n\'a pas été supprimé.',
          'error'
        );
      }
    });
  };

  const [id,setId]=useState('');
  const editEmployer = async () => {
    // Vérifiez que id est défini et non vide
    if (!id) {
        console.error("L'ID de l'employé est manquant");
        return;
    }
  
    const data = {};
    inputFormElements.forEach((element) => {
        data[element.name] = formData[element.name];
    });
  
    console.log(data);
  
    // Assurez-vous que les données nécessaires sont présentes dans l'objet data
    if (!data) {
        console.error("Les données de l'employé sont manquantes");
        return;
    }

    try {
        // Appel de l'action de modification avec l'ID et les données mises à jour
        await dispatch(editEmployerAction(id, data)); 
        await dispatch(listerEmployer());
        setOpenPopup(false);
        setFormData({});

        // Afficher l'alerte de succès en vert
        Swal.fire({
            icon: 'success',
            title: 'Succès!',
            text: 'La modification de l\'employé a été effectuée avec succès!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        });
    } catch (error) {
        console.error('Erreur lors de la modification de l\'employé:', error);

        // Afficher l'alerte d'échec en rouge
        Swal.fire({
            icon: 'error',
            title: 'Erreur!',
            text: 'Une erreur s\'est produite lors de la modification de l\'employé. Veuillez réessayer plus tard.',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK'
        });
    }
};
  
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState(employeeService.getAllEmployees());
  const [filterFn, setFilterFn] = useState({ fn: (items) => items });
  const [openPopup, setOpenPopup] = useState(false);
  const [formData, setFormData] = useState({});

  const [edit, setEdit] = useState(false);
  const handlecloseEdit = () => setEdit(false);
  const handleShowEdit = (employe) => {
    console.log("ID de l'employé:", employe._id); // Vérifier l'ID de l'employé

    setEdit(true); // Ouvrir le dialogue de modification
    setOpenPopup(false); // Fermer le dialogue d'ajout s'il est ouvert
    setId(employe._id); // Mettre à jour l'ID de l'employé sélectionné
    // Remplir le formulaire avec les données de l'employé sélectionné
    setFormData({
      nom: employe.nom,
      prenom: employe.prenom,
      adresse: employe.adresse,
      email: employe.email,
      matricule: employe.matricule,
      numerodetelephone: employe.numerodetelephone,
      Role: employe.Role,
      departement: employe.departement,
      projet: employe.projet,
      tache: employe.tache,
    });
  };

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);


    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };
    const filteredEmployees = employer.filter((employe) =>
  employe.nom.toLowerCase().includes(searchTerm.toLowerCase())
);
 const handleFormModifeir = async (e) => {
    e.preventDefault();
    console.log("Formulaire de modification soumis !");
    console.log("ID de l'employé:", id);
    await editEmployer(id);
    setOpenPopup(false); // Fermer le popup après soumission
    setFormData({}); // Réinitialiser les données du formulaire
    handlecloseEdit();
  };
  const handleAddNew = () => {
    setRecordForEdit(null);
    setOpenPopup(true); // Ouvrir le dialogue d'ajout
  };
  const handleFormSubmit = (data) => {
    console.log("Form data:", data);
    setOpenPopup(false); // Fermer le popup après soumission
    handlecloseEdit();
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
      <div className="header">
        <PageHeader
          title="Liste des Employés"
          icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
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
              className={classes.newButton1}
              onClick={handleAddNew}
            />
          </Toolbar>

          <TblContainer>
            <TblHead />
            <TableBody>
              {filteredEmployees.map((employe) => (
                <TableRow key={employe.id}>
                  <TableCell>{employe.nom}</TableCell>
                  <TableCell>{employe.prenom}</TableCell>
                  <TableCell>{employe.adresse}</TableCell>
                  <TableCell>{employe.matricule}</TableCell>
                  <TableCell>{employe.numerodetelephone}</TableCell>
                  <TableCell>{employe.Role}</TableCell>
                  <TableCell>{employe.email}</TableCell>
                  <TableCell>{employe.departement}</TableCell>
                  <TableCell>{employe.projet}</TableCell>
                  <TableCell>{employe.tache}</TableCell>
                  <TableCell>
                    <ActionButton
                      color="primary"
                      onClick={() => handleShowEdit(employe)}
                    >
                      <EditOutlinedIcon fontSize="small" />
                     </ActionButton>{" "}
                    <ActionButton
                      color="secondary"
                      onClick={() => deleteEmployer(employe._id)}
                    >
                      {" "}
                      <CloseIcon fontSize="small" />
                    </ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          <TblPagination />
        </Paper>
      </div>
   {/* Popup pour ajouter */}
      <Dialog
        open={openPopup }maxWidth="md"  classes={{ paper: classes.dialogWrapper }}>
        <DialogTitle className={classes.dialogTitle}>
          <div style={{ display: "flex" }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              Ajouter un Employé
            </Typography>
            <ActionButton color="secondary" onClick={() => setOpenPopup(false)}><CloseIcon />{" "}</ActionButton>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={(e) => { e.preventDefault();addEmployer(); }} >
            <Grid container>
              {inputFormElements.map((item, index) => (
                <Grid item xs={item.xs} sm={item.sm} key={index}>
                  <Controls.Input
                    name={item.name}
                    label={item.label}
                    placeholder={item.placeholder}
                    variant={item.variant}
                    fullWidth={item.fullWidth}
                    required={item.required}
                    value={formData[item.name] || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, [item.name]: e.target.value })
                    }
                  />
                </Grid>
              ))}
            </Grid>
            <div>
              <Controls.Button type="submit" text="Submit" /><Controls.Button text="Reset" color="default" onClick={() => setFormData({})}
              />
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Popup pour modifier */}
      <Dialog open={edit} onClose={handlecloseEdit} maxWidth="md">
  <DialogTitle>
    <div style={{ display: "flex" }}>
      <Typography variant="h6" style={{ flexGrow: 1 }}>
        Employé à Modifier
      </Typography>
      <ActionButton color="secondary" onClick={handlecloseEdit}>
        <CloseIcon />
      </ActionButton>
    </div>
  </DialogTitle>
  <DialogContent dividers>
    <form onSubmit={handleFormModifeir}>
      <Grid container spacing={3}>
        {inputFormElements.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Controls.Input
              label={item.label}
              name={item.name}
              value={formData[item.name] || ""}
              onChange={(e) =>
                setFormData({ ...formData, [item.name]: e.target.value })
              }
              fullWidth
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <div>
            <Controls.Button type="submit" text="Submit" />
            <Controls.Button
              text="Reset"
              color="default"
              onClick={() => {
                setEdit(false); // Fermer le popup de modification
                handlecloseEdit(); // Fermer le popup
                setFormData({}); // Réinitialiser les données du formulaire
              }}
            />
          </div>
        </Grid>
      </Grid>
    </form>
  </DialogContent>
</Dialog>
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
