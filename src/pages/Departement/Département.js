import React, { useState, useEffect } from 'react';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Dialog, DialogTitle, DialogContent, Typography, Grid, Button as MuiButton } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import PageHeader from "../PageHeader";
import Controls from "../controls/Controls";
import useTable from '../UseTable';
import * as employeeService from '../Employer/employeeService';
import { listerDepartement, addDepartementAction, deleteDepartementAction, editDepartementAction } from '../../components/Actions/departement.actions';
import { useDispatch, useSelector } from 'react-redux';
import "./Département.css";
import Swal from 'sweetalert2';
import { DataGrid } from '@mui/x-data-grid';
import MultiStepForm from './MultiStepForm';
import EditDeparetementForm from "./EditDepartementForm";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';



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
    const [nomdeDepartement, setnomdeDepartement] = useState('');
    const [déscription, setDéscription] = useState('');
    const [projet, setProjet] = useState('');

    
    const columns = [
        { field: '_id', headerName: 'ID', width: 70 , headerClassName: 'custom-header',}, // Utilisez '_id' comme identifiant unique
        { field: 'nomdeDepartement', headerName: 'Nom de Département', width: 200, headerClassName: 'custom-header', },
        { field: 'déscription', headerName: 'Déscription', width: 200 , headerClassName: 'custom-header',},
        {
            field: 'projet',
            headerName: 'Projet',
            width: 200,
            headerClassName: 'custom-header',
            renderCell: (params) => (
              <div style={{ whiteSpace: 'pre-line' }}>
                {params.row.projet.split('\n').map((project, index) => (
                  <div key={index}>{project}</div>
                ))}
              </div>
            ),
          },        {
            field: 'actions',
            headerName: 'Actions',
            width: 470,
            
             headerClassName: 'custom-header',
            renderCell: (params) => (
                <div>
                    <MuiButton color="primary" onClick={() => handleShowEdit(params.row)}> {/* Utilisez params.row pour passer les données du département */}
    <EditOutlinedIcon />
</MuiButton>
                    <MuiButton color="secondary" onClick={() => deleteDepartement(params.row._id)}> {/* Utilisez '_id' comme identifiant unique */}
                        <CloseIcon />
                    </MuiButton>

                    <MuiButton color="primary" onClick={() => handleShowDetails(params.row)}>
          <VisibilityOutlinedIcon />
        </MuiButton>
                </div>
            ),
        },
    ];
     // Convertir les données de l'ancien tableau vers le format requis par le nouveau tableau
   const rows = departement.map((departement) => ({
    id:departement._id,
    nomdeDepartement:departement.nomdeDepartement,
    déscription:departement.déscription,
   projet:departement.projet,
  
  }));


    const inputFormElements = [
        { 
            name: "nomdeDepartement",
            value: nomdeDepartement,
            onChange: (e) => { setnomdeDepartement(e.target.value) },
            placeholder: "Enter Nom de département",
            label: "nomdeDepartement",
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
  const handleShowEdit = (departement) => {
    // Vérifiez si l'objet departement est valide et contient un champ _id ou id
    if (departement && (departement._id || departement.id)) {
        // Utilisez departement._id s'il est disponible, sinon utilisez departement.id
        const departementId = departement._id || departement.id;
        console.log("ID de département:", departementId);
        setOpenEditForm(true); // Ouvrir le formulaire de modification
        setSelectedDepartement({ ...departement, _id: departementId }); // Assurez-vous que _id est présent dans l'objet
    } else {
        console.error("Objet département invalide ou champ _id manquant:", departement);
        // Afficher éventuellement un message d'erreur à l'utilisateur
        // alert("Données de département invalides. Veuillez réessayer.");
    }
};



 
  const [openEditForm, setOpenEditForm] = useState(false); // État pour contrôler l'ouverture du formulaire d'édition
  const [selectedDepartement, setSelectedDepartement] = useState(null); // État pour stocker les données de l'employé sélectionné
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
            dep.nomdeDepartement.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredDepartement(filtered);
    };
    const filteredDepartements = departement.filter(dep => {
        // Vérifier si dep est défini et si le nom du département correspond au terme de recherche
        return dep && dep.nomdeDepartement && dep.nomdeDepartement.toLowerCase().includes(searchTerm.toLowerCase());
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


    const selectDepartement = (departementData) => {
        setShowDetails(true);
        setSelectedDepartement(departementData);
    };

 // Déclarez une fonction pour réinitialiser le département sélectionné
const resetSelectedDepartement = () => {
    setShowDetails(false);
    setSelectedDepartement(null); // Correction ici
};
   // Fonction pour afficher les détails de l'employé dans un popup
const handleShowDetails = (departementData) => {
    setShowDetails(true);
    setSelectedDepartement(departementData); // Correction ici
};
  // Déclaration de l'état pour contrôler l'affichage du popup et stocker les données de l'employé sélectionné
  const [showDetails, setShowDetails] = useState(false);
  
  const DepartementDetailsPopup = ({ open, handleClose, departement }) => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>departement Details</DialogTitle>
        <DialogContent>
          {/* Vérifier si departement est défini avant d'afficher les détails */}
          {departement && (
            <>
              <div>nomdeDepartement: {departement.nomdeDepartement}</div>
              <div>déscription: {departement.déscription}</div>
              <div>projet: {departement.projet}</div>
              
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
                title="Liste des  Départements"
             icon={<ApartmentOutlinedIcon fontSize="large" />} />
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
                <MultiStepForm
            open={openPopup} // Passez l'état pour ouvrir/fermer le formulaire à plusieurs étapes
            setOpen={setOpenPopup} // Fonction pour modifier l'état d'ouverture/fermeture du formulaire à plusieurs étapes
          />
             {/* Affichez la composante MultiStepForm et transmettez les données des départements */}
             <MultiStepForm departements={departement} />

             
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

<DepartementDetailsPopup 
    open={showDetails} 
    handleClose={resetSelectedDepartement} 
    departement={selectedDepartement} 
/>
            </Paper>
            {openEditForm && (
    <EditDeparetementForm
        open={openEditForm}
        setOpen={setOpenEditForm}
        departementData={selectedDepartement} // Passer les données du département sélectionné
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
            onClick={onClick}>
            {children}
        </MuiButton>
    )
    
}
    export default  Departement