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
import { listerProjet, addProjetAction, deleteProjetAction, editProjetAction } from '../components/Actions/projet.actions';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./projet.css";
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
  { id: "nomdeprojet", label: "Nom de projet" },
  { id: "description", label: "Déscription" },
  { id: "objectif", label: "Objectif" },
  { id: "periodeestimé", label: "Période estimé" },
  { id: "type", label: "Type" },
  { id: "cout ", label: "Cout" },
  { id: "statutdeprogresion", label: "Statut de progresion" },
  { id: "lestaches ", label: "Les taches " },
  { id: "responsable", label: "Résponsable" },
  { id: " employés", label: " Employés" },
  { id: "actions", label: "Actions", disableSorting: true },
];

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
};
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
  const handleShowEdit = (projet) => {
    console.log("ID de projet:", projet._id); // Vérifier l'ID de l'employé

    setEdit(true); // Ouvrir le dialogue de modification
    setOpenPopup(false); // Fermer le dialogue d'ajout s'il est ouvert
    setId(projet._id); // Mettre à jour l'ID de l'employé sélectionné
    // Remplir le formulaire avec les données de l'employé sélectionné
    setFormData({
      nomdeprojet: projet. nomdeprojet,
      description: projet. description,
       objectif: projet. objectif,
       periodeestimé: projet. periodeestimé,
       type: projet. type,
      cout: projet.cout,
      statutdeprogression: projet.statutdeprogression,
      lestaches: projet.lestaches,
      responsable: projet.responsable,
      employés: projet.employés,
    });
  };
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
 
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState(employeeService.getAllEmployees());
  const [filterFn, setFilterFn] = useState({ fn: (items) => items });
  const [openPopup, setOpenPopup] = useState(false);
  const [formData, setFormData] = useState({});

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
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
        title=" Liste des Projets"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
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

        <TblContainer>
          <TblHead />
          <TableBody>
  {projet.map((projet) => {
    if (projet.nomdeprojet.toLowerCase().includes(searchTerm.toLowerCase())) {
      return (
        <TableRow key={projet.id}>
          <TableCell>{projet.nomdeprojet}</TableCell>
          <TableCell>{projet.description}</TableCell>
          <TableCell>{projet.objectif}</TableCell>
          <TableCell>{projet.periodeestimé}</TableCell>
          <TableCell>{projet.type}</TableCell>
          <TableCell>{projet.cout}</TableCell>
          <TableCell>{projet.statutdeprogression}</TableCell>
          <TableCell>{projet.lestaches}</TableCell>
          <TableCell>{projet.responsable}</TableCell>
          <TableCell>{projet.employés}</TableCell>
          <TableCell>
            <ActionButton
              color="primary"
              onClick={() => handleShowEdit(projet)}
            >
              <EditOutlinedIcon fontSize="small" />
            </ActionButton>{" "}
            <ActionButton
              color="secondary"
              onClick={() => deleteProjet(projet._id)}
            >
              <CloseIcon fontSize="small" />
            </ActionButton>
          </TableCell>
        </TableRow>
      );
    } else {
      return null;
    }
  })}
</TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
         {/* Popup pour ajouter */}
      <Dialog
        open={openPopup}
        maxWidth="md"
        classes={{ paper: classes.dialogWrapper }}
      >
        <DialogTitle className={classes.dialogTitle}>
          <div style={{ display: "flex" }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              Ajouter un Projet 
            </Typography>
            <ActionButton color="secondary" onClick={() => setOpenPopup(false)}>
              <CloseIcon />{" "}
            </ActionButton>
          </div>
        </DialogTitle>
        <DialogContent dividers>
        
        <form onSubmit={e => { e.preventDefault(); addProjet(); }}>
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
              <Controls.Button type="submit" text="Submit" />
              <Controls.Button
                text="Reset"
                color="default"
                onClick={() => setFormData({})}
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
        Projet à Modifier
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
export default Projet;
