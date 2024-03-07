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
  listerTache,
  addTacheAction,
  deleteTacheAction,
  editTacheAction,
} from "../components/Actions/tache.actions";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./Tache.css";
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
  { id: "Nom de tache", label: "Nom de tache" },
  { id: "Déscription", label: "Déscription" },
  { id: "Statu", label: "statu" },
  { id: "projet", label: "projet" },
  { id: " Département", label: "Département " },
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

  const [nomdetache, setNomdetache] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [projet, setProjet] = useState("");
  const [departement, setDepartement] = useState("");

  const inputFormElements = [
    {
      name: "nomdetache",
      value: nomdetache,
      onChange: (e) => {
        setNomdetache(e.target.value);
      },
      placeholder: "Enter Nom de l'employé",
      label: "Nom de tache",
      variant: "outlined",
      fullWidth: true,
      required: true,
      xs: 12,
      sm: 6,
    },
    {
      name: "description",
      value: description,
      onChange: (e) => {
        setDescription(e.target.value);
      },
      placeholder: "Enter prénom employé",
      label: "description",
      variant: "outlined",
      fullWidth: true,
      required: true,
      xs: 12,
      sm: 6,
    },
    {
      name: "status",
      value: status,
      onChange: (e) => {
        setStatus(e.target.value);
      },
      type: "Status",
      placeholder: "Status",
      label: "Status",
      variant: "outlined",
      fullWidth: true,
      required: true,
      xs: 12,
      sm: 6,
    },
    {
      name: "projet",
      value: projet,
      onChange: (e) => {
        setProjet(e.target.value);
      },
      type: "projet",
      placeholder: " projet",
      label: "projet",
      variant: "outlined",
      fullWidth: true,
      required: false,
      xs: 12,
      sm: 6,
    },
    {
      name: "departement",
      value: departement,
      onChange: (e) => {
        setDepartement(e.target.value);
      },
      placeholder: "Enter nom de département",
      label: "Departement",
      variant: "outlined",
      fullWidth: true,
      required: false,
      xs: 12,
      sm: 6,
    },
  ];

  const addTache = async () => {
    const data = {};
    inputFormElements.forEach((element) => {
        data[element.name] = formData[element.name];
    });
    console.log(data);

    try {
        await dispatch(addTacheAction(data));
        await dispatch(listerTache());
        setOpenPopup(false);
        setFormData({});

        Swal.fire({
            icon: 'success',
            title: 'Succès!',
            text: 'La tâche a été ajoutée avec succès!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la tâche:', error);

        Swal.fire({
            icon: 'error',
            title: 'Erreur!',
            text: 'Une erreur s\'est produite lors de l\'ajout de la tâche. Veuillez réessayer plus tard.',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK'
        });
    }
};
const deleteTache = async (id) => {
  // Afficher une boîte de dialogue de confirmation
  const confirmation = await Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas revenir en arrière!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
  });

  // Si l'utilisateur confirme la suppression
  if (confirmation.isConfirmed) {
      try {
          // Supprimer la tâche
          await dispatch(deleteTacheAction(id));
          await dispatch(listerTache());

          // Afficher une alerte de succès
          Swal.fire({
              icon: 'success',
              title: 'Succès!',
              text: 'La tâche a été supprimée avec succès!',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK'
          });
      } catch (error) {
          // En cas d'erreur, afficher une alerte d'erreur
          console.error('Erreur lors de la suppression de la tâche:', error);
          Swal.fire({
              icon: 'error',
              title: 'Erreur!',
              text: 'Une erreur s\'est produite lors de la suppression de la tâche. Veuillez réessayer plus tard.',
              confirmButtonColor: '#d33',
              confirmButtonText: 'OK'
          });
      }
  } else {
      // Si l'utilisateur annule, afficher un message
      Swal.fire('Annulé', 'La suppression de la tâche a été annulée :)', 'info');
  }
};

  const [id, setId] = useState("");
  const editTache = async () => {
    // Vérifiez que id est défini et non vide
    if (!id) {
        console.error("L'ID de tâche est manquant");
        return;
    }

    const data = {};
    inputFormElements.forEach((element) => {
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
  const handleShowEdit = (tache) => {
    console.log("ID de tache:", tache._id); // Vérifier l'ID de l'employé

    setEdit(true); // Ouvrir le dialogue de modification
    setOpenPopup(false); // Fermer le dialogue d'ajout s'il est ouvert
    setId(tache._id); // Mettre à jour l'ID de l'employé sélectionné
    // Remplir le formulaire avec les données de l'employé sélectionné
    setFormData({
      nomdetache: tache.nomdetache,
      description: tache.description,
      status: tache.status,
      projet: tache.projet,
      departement: tache.departement,
    });
  };

  const handleFormModifeir = async (e) => {
    e.preventDefault();
    console.log("Formulaire de modification soumis !");
    console.log("ID de tache:", id);
    await editTache(id);
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
        title="Liste des tâches"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
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
  {tache.map((tache) => {
    if (tache.nomdetache.toLowerCase().includes(searchTerm.toLowerCase())) {
      return (
        <TableRow key={tache.id}>
          <TableCell>{tache.nomdetache}</TableCell>
          <TableCell>{tache.description}</TableCell>
          <TableCell>{tache.status}</TableCell>
          <TableCell>{tache.projet}</TableCell>
          <TableCell>{tache.departement}</TableCell>
          <TableCell>
            <ActionButton color="primary" onClick={() => handleShowEdit(tache)}>
              <EditOutlinedIcon fontSize="small" />
            </ActionButton>{" "}
            <ActionButton color="secondary" onClick={() => deleteTache(tache._id)}>
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
           Ajouter une tâche
            </Typography>
            <ActionButton color="secondary" onClick={() => setOpenPopup(false)}>
              <CloseIcon />{" "}
            </ActionButton>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addTache();
            }}
          >
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
              tâche à Modifier
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
export default Tache;
