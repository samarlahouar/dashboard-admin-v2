import React, { useState } from 'react'; 
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Dialog, DialogTitle, DialogContent, Typography, Grid, Button as MuiButton } from '@material-ui/core';
import useTable from './UseTable';
import * as employeeService from '../pages/employeeService';
import Controls from "./controls/Controls"
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import PageHeader from "../pages/PageHeader";
//import { listerEmployer, addEmployerAction, deleteEmployerAction, editEmployerAction } from '../../Action/employer.actions';
//import { useDispatch , useSelector } from 'react-redux'; 
//import {useEffect} from "react";
import "./projet.css";





























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
    },
}));

const headCells = [
    { id: 'Nom de projet', label: 'Nom de projet' },
    { id: 'Déscription', label: 'Déscription' },
    { id: 'Objectif', label: 'Objectif' },
    { id: 'matricule', label: 'matricule' },
    { id: 'type', label: 'type' },
    { id: 'cout ', label: 'cout' },
    { id: 'statut de progresion', label: 'statut de progresion' },
    { id: 'les taches à faire', label: 'les taches à faire' },
    { id: 'Résponsable', label: 'Résponsable' },
    { id: 'Employées', label: 'Employer' },
    { id: 'actions', label: 'Actions', disableSorting: true }
];





function Projets() {
  const classes = useStyles();

  const [ nomdeprojet, setNomdeprojet] = useState('');
  const [déscription , setDéscription] = useState('');
  const [objectif , setObjectif] = useState('');
  const [type , setType] = useState('');
  const [statutdeprogresion, setStatutdeprogresion] = useState('');
  const [responsable , setResponsable] = useState('');
  const [employées , setEmployées] = useState('');
  const [matricule, setMatricule] = useState('');
  const [cout, setCout] = useState(''); 
  const [Lestachesàfaire, setLestachesàfaire] = useState(''); 


  const inputFormElements = [
      { 
          name: "Nom de projet",
          value: nomdeprojet,
          onChange: (e) => { setNomdeprojet(e.target.value) },
          placeholder: "Enter Nom de projet",
          label: "Nom de projet",
          variant: "outlined",
          fullWidth: true,
          required: true,
          xs: 12,
          sm: 6
      },
      { 
        name: "Déscription",
        value: déscription,
        onChange: (e) => { setDéscription(e.target.value) },
        placeholder: ".....",
        label: "Déscriptiont",
        variant: "outlined",
        fullWidth: true,
        required: true,
        xs: 12,
        sm: 6
    },  { 
        name: "Objectif",
        value: objectif,
        onChange: (e) => { setObjectif(e.target.value) },
        placeholder: "Enter Objectif",
        label: "Objectif",
        variant: "outlined",
        fullWidth: true,
        required: true,
        xs: 12,
        sm: 6
    },  { 
        name: "Matricule",
        value: matricule,
        onChange: (e) => { setMatricule(e.target.value) },
        placeholder: "Enter votre matricule",
        label: "matricule",
        variant: "outlined",
        fullWidth: true,
        required: true,
        xs: 12,
        sm: 6
    },  { 
        name: "type",
        value: type,
        onChange: (e) => { setType(e.target.value) },
        placeholder: "Enter type",
        label: "type",
        variant: "outlined",
        fullWidth: true,
        required: true,
        xs: 12,
        sm: 6
    },  { 
        name: "cout",
        value:cout,
        onChange: (e) => { setCout(e.target.value) },
        placeholder: "Enter le cout de projet",
        label: "cout",
        variant: "outlined",
        fullWidth: true,
        required: true,
        xs: 12,
        sm: 6
    },
    { 
        name: "statutdeprogrésion",
        value: statutdeprogresion,
        onChange: (e) => { setStatutdeprogresion(e.target.value) },
        placeholder: "Enter statut de progrésion",
        label: "statut de progrésion",
        variant: "outlined",
        fullWidth: true,
        required: true,
        xs: 12,
        sm: 6
    },
      
    { 
        name: "lestachesàfaire",
        value:Lestachesàfaire,
        onChange: (e) => { setLestachesàfaire(e.target.value) },
        placeholder: "Enter les taches à faire pour ce projet",
        label: "les taches à faire",
        variant: "outlined",
        fullWidth: true,
        required: true,
        xs: 12,
        sm: 6
    },
      
    { 
        name: "Résponsable",
        value:responsable,
        onChange: (e) => { setResponsable(e.target.value) },
        placeholder: "Enter le Résponsable",
        label: "Résponsable",
        variant: "outlined",
        fullWidth: true,
        required: true,
        xs: 12,
        sm: 6
    },
      
    { 
        name: "Employées",
        value: employées,
        onChange: (e) => { setEmployées(e.target.value) },
        placeholder: "Enter les Employées",
        label: "Employées",
        variant: "outlined",
        fullWidth: true,
        required: true,
        xs: 12,
        sm: 6
    },
      
   
  ];

  const addProjet = () => {
      const data ={
         nomdeprojet,
         déscription,
         objectif,
         type,
         statutdeprogresion,
         Lestachesàfaire,
         responsable,
         employées,
      }
      
  }






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
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "") return items;
                else return items.filter(x => x.fullName.toLowerCase().includes(target.value));
            }
        });
    };

    const handleAddNew = () => {
        setRecordForEdit(null);
        setOpenPopup(true);
    };

    const handleFormSubmit = (data) => {
        console.log('Form data:', data);
        setOpenPopup(false);
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
                title="Nouveau Projet"
               
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Input
                        label="Recherche projet"
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
                    <Controls.Button text="Ajouter"  variant="outlined" startIcon={<AddIcon />} className={classes.newButton2} onClick={handleAddNew} />
                </Toolbar>

                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {recordsAfterPagingAndSorting().map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.nomdeprojet}</TableCell>
                                <TableCell>{item.déscription}</TableCell>
                                <TableCell>{item.objectif}</TableCell>
                                <TableCell>{item.type}</TableCell>
                                <TableCell>{item.statutdeprogression}</TableCell>
                                <TableCell>{item.lestachesàfaire}</TableCell>
                                <TableCell>{item.responsable}</TableCell>
                                <TableCell>{item.employées}</TableCell>
                               
                                <TableCell>
                                    <ActionButton  color="primary"onClick={() => { setOpenPopup(true); setRecordForEdit(item); }}><EditOutlinedIcon fontSize="small" /> </ActionButton>
                                    <ActionButton color="secondary"> <CloseIcon fontSize="small" /></ActionButton></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
                <DialogTitle className={classes.dialogTitle}>
                    <div style={{ display: 'flex' }}>
                        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                            Projet Form
                        </Typography>
                        <ActionButton color="secondary" onClick={() => setOpenPopup(false)} ><CloseIcon /> </ActionButton>
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                    <form onSubmit={onSubmit}>
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
                            <Controls.Button type="submit" text="Submit"  onClick={addProjet}/>
                            <Controls.Button text="Reset" color="default" onClick={() => setFormData({})} />
                        </div>
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
    export default  Projets