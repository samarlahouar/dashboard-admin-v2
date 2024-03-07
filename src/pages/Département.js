import React, { useState, useEffect } from 'react';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Dialog, DialogTitle, DialogContent, Typography, Grid, Button as MuiButton } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import PageHeader from "../pages/PageHeader";
import Controls from "./controls/Controls";
import useTable from './UseTable';
import * as employeeService from '../pages/employeeService';
import { listerDepartement, addDepartementAction, deleteDepartementAction, editDepartementAction } from '../components/Actions/departement.actions';
import { useDispatch, useSelector } from 'react-redux';
import "./Département.css";
import Swal from 'sweetalert2';
import { DataGrid } from '@mui/x-data-grid';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px'
    },
    root: {
        margin: theme.spacing(0.5)
    },
    label: {
        textTransform: 'none'
    },
    secondary: {
        backgroundColor: theme.palette.secondary.light,
        '& .MuiButton-label': {
            color: theme.palette.secondary.main,
        }
    },
    primary: {
        backgroundColor: theme.palette.primary.light,
        '& .MuiButton-label': {
            color: theme.palette.primary.main,
        }
    }
}));


function Departement() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listerDepartement());
    }, [dispatch]);

    const departement = useSelector(state => state.departement.departement.departementlist || []);


    const classes = useStyles();
    const [typedeDepartement, setTypedeDepartement] = useState('');
    const [déscription, setDéscription] = useState('');
    const [projet, setProjet] = useState('');

    
    const columns = [
        { field: '_id', headerName: 'ID', width: 70 }, // Utilisez '_id' comme identifiant unique
        { field: 'typedeDepartement', headerName: 'Type de Département', width: 200 },
        { field: 'déscription', headerName: 'Déscription', width: 200 },
        { field: 'projet', headerName: 'Projet', width: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <div>
                    <MuiButton color="primary" onClick={() => handleShowEdit(params.row._id)}> {/* Utilisez '_id' comme identifiant unique */}
                        <EditOutlinedIcon />
                    </MuiButton>
                    <MuiButton color="secondary" onClick={() => deleteDepartement(params.row._id)}> {/* Utilisez '_id' comme identifiant unique */}
                        <CloseIcon />
                    </MuiButton>
                </div>
            ),
        },
    ];

    const inputFormElements = [
        { 
            name: "typedeDepartement",
            value: typedeDepartement,
            onChange: (e) => { setTypedeDepartement(e.target.value) },
            placeholder: "Enter Nom de département",
            label: "typedeDepartement",
            variant: "outlined",
            fullWidth: true,
            required: true,
            xs: 12,
            sm: 6
        },
        { 
            name: "déscription",
            value: déscription,
            onChange: (e) => {  setDéscription(e.target.value) },
            placeholder: "Enter Déscription",
            label: "Déscription",
            variant: "outlined",
            fullWidth: true,
            required: true,
            xs: 12,
            sm: 6 
        },
        { 
            name: "projet",
            value: projet,
            onChange: (e) => { setProjet(e.target.value) },
            placeholder: "Enter projet ",
            label: "projet",
            variant: "outlined",
            fullWidth: true,
            required: false,
            xs: 12,
            sm: 12 
        },
    ];

    const addDeparetement = async () => {
        const data = {};
        inputFormElements.forEach(element => {
            data[element.name] = formData[element.name];
        });

        console.log(data);

        try {
            await dispatch(addDepartementAction(data));
            await dispatch(listerDepartement());
            setOpenPopup(false);
            setFormData({});

            // Afficher une alerte de succès
            Swal.fire({
                icon: 'success',
                title: 'Succès!',
                text: 'Un nouveau projet a été ajouté avec succès!',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            console.error('Erreur lors de l\'ajout du projet:', error);

            // Afficher une alerte d'erreur en cas d'échec de l'ajout
            Swal.fire({
                icon: 'error',
                title: 'Erreur!',
                text: 'Une erreur s\'est produite lors de l\'ajout du projet. Veuillez réessayer plus tard.',
                confirmButtonColor: '#d33',
                confirmButtonText: 'OK'
            });
        }
    };

    const deleteDepartement = async (id) => {
        // Afficher une boîte de dialogue de confirmation
        Swal.fire({
            title: 'Êtes-vous sûr?',
            text: 'Vous ne pourrez pas revenir en arrière!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler'
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Si l'utilisateur clique sur "Oui, supprimer", supprimer le département
                await dispatch(deleteDepartementAction(id));
                await dispatch(listerDepartement());

                // Afficher une alerte de succès
                Swal.fire(
                    'Supprimé!',
                    'Le département a été supprimé avec succès.',
                    'success'
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Si l'utilisateur clique sur "Annuler", afficher une alerte indiquant que le département n'est pas supprimé
                Swal.fire(
                    'Annulé',
                    'Le département n\'a pas été supprimé.',
                    'error'
                );
            }
        });
    };

    const [id,setId]=useState('');

    const editDepartement = async () => {
        // Vérifiez que l'ID est défini et non vide
        if (!id) {
            console.error("L'ID du département est manquant");
            return;
        }
      
        const data = {};
        inputFormElements.forEach((element) => {
            data[element.name] = formData[element.name];
        });
      
        console.log(data);
      
        // Assurez-vous que les données nécessaires sont présentes dans l'objet data
        if (!data) {
            console.error("Les données du département sont manquantes");
            return;
        }
      
        try {
            await dispatch(editDepartementAction(id, data));
            await dispatch(listerDepartement());
            setOpenPopup(false);
            setFormData({});
    
            // Afficher une alerte de succès
            Swal.fire({
                icon: 'success',
                title: 'Succès!',
                text: `La modification du département a été effectuée avec succès.`,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            console.error('Erreur lors de la modification du département:', error);
    
            // Afficher une alerte d'erreur en cas d'échec de la modification
            Swal.fire({
                icon: 'error',
                title: 'Erreur!',
                text: 'Une erreur s\'est produite lors de la modification du département. Veuillez réessayer plus tard.',
                confirmButtonColor: '#d33',
                confirmButtonText: 'OK'
            });
        }
    };    

    const [edit, setEdit] = useState(false);
    const handlecloseEdit = () => setEdit(false);
    const handleShowEdit = (id) => {
        console.log("ID de département:", id); // Vérifier l'ID du département
    
        const selectedDepartement = departement.find(dep => dep._id === id);
        if (selectedDepartement) {
            setEdit(true); // Ouvrir le dialogue de modification
            setOpenPopup(false); // Fermer le dialogue d'ajout s'il est ouvert
            setId(id); // Mettre à jour l'ID du département sélectionné
            // Remplir le formulaire avec les données du département sélectionné
            setFormData({
                typedeDepartement: selectedDepartement.typedeDepartement,
                déscription: selectedDepartement.déscription,
                projet: selectedDepartement.projet,
            });
        } else {
            console.error("Département non trouvé pour l'ID:", id);
        }
    };
  const handleFormModifeir = async (e) => {
    e.preventDefault();
    console.log("Formulaire de modification soumis !");
    console.log("ID de departement:", id);
    await editDepartement(id);
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
    const [filterFn, setFilterFn] = useState({ fn: items => items });
    const [openPopup, setOpenPopup] = useState(false);
    const [formData, setFormData] = useState({});
    
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, filterFn);

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredDepartement, setFilteredDepartement] = useState([]);
    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
        const filtered = departement.filter(dep =>
            dep.typedeDepartement.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredDepartement(filtered);
    };
    const filteredDepartements = departement.filter(dep => {
        // Vérifier si dep est défini et si le nom du département correspond au terme de recherche
        return dep && dep.typedeDepartement && dep.typedeDepartement.toLowerCase().includes(searchTerm.toLowerCase());
    });



    const handleAddNew = () => {
        setRecordForEdit(null);
        setOpenPopup(true);
    };

   

    const validate = (fieldValues = formData) => {
        let temp = {};
        // Validation logic...
        return Object.values(temp).every(val => val === "");
    }

    const onSubmit = e => {
        e.preventDefault();
        if (validate()) {
            handleFormSubmit(formData);
            setFormData({});
        }
    }

    return (
        <>
            <PageHeader
                title="Liste des  Départements"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Input
                        label="Recherche Département"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            )
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button text="Ajouter"  variant="outlined" startIcon={<AddIcon />} className={classes.newButton3} onClick={handleAddNew} />
                </Toolbar>
                {filteredDepartements.length === 0 ? (
                <Typography variant="body1" style={{ textAlign: 'center', marginTop: '20px' }}>
                    Aucun département trouvé.
                </Typography>
            ) : (
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={filteredDepartements}
                        columns={columns}
                        pageSize={5}
                        checkboxSelection
                        getRowId={(row) => row._id} 
                    />
                </div>
            )}
            </Paper>
               {/* Popup pour ajouter */}
            <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
                <DialogTitle className={classes.dialogTitle}>
                    <div style={{ display: 'flex' }}>
                        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                            Ajouter un Département
                        </Typography>
                        <ActionButton color="secondary" onClick={() => setOpenPopup(false)} ><CloseIcon /> </ActionButton>
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                <form onSubmit={e => { e.preventDefault(); addDeparetement(); }}>
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
                                        value={formData[item.name] || ''}
                                        onChange={e => setFormData({ ...formData, [item.name]: e.target.value })}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <div>
                            <Controls.Button type="submit" text="Submit"  />
                            <Controls.Button text="Reset" color="default" onClick={() => setFormData({})} />
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

             {/* Popup pour modifier */}
      <Dialog open={edit} onClose={handlecloseEdit} maxWidth="md">
  <DialogTitle>
    <div style={{ display: "flex" }}>
      <Typography variant="h6" style={{ flexGrow: 1 }}>
        Département à Modifier
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
            onClick={onClick}>
            {children}
        </MuiButton>
    )
    
}
    export default  Departement