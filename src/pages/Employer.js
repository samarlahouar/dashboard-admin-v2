import React, { useState } from 'react'; 

import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Dialog, DialogTitle, DialogContent, Typography, Grid, Button as MuiButton } from '@material-ui/core';
import useTable from './UseTable';
import * as employeeService from './employeeService';
import Controls from "./controls/Controls"
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import PageHeader from "./PageHeader";
import { listerEmployer, addEmployerAction, deleteEmployerAction, editEmployerAction } from '../components/Actions/employer.actions';
import { useDispatch, useSelector } from 'react-redux';
import {useEffect} from "react";
import "./Employer.css"






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
    { id: 'Nom ', label: 'Nom employé' },
    { id: 'prénom ', label: 'Prénom employé' },
    { id: 'Adresse', label: 'Adresse' },
    { id: 'Matricule', label: 'Matricule' },
    { id: 'Numéro de télephone', label: 'Numéro de télephone' },
    { id: 'Role', label: 'Role' },
    { id: 'email', label: 'email' },
    { id: 'Département', label: 'Départment' },
    { id: 'Projet', label: 'Projet' },
    { id: 'Tache', label: 'Tache' },
    { id: 'Actions', label: 'Actions', disableSorting: true }
];





  function Employees() {


   const dispatch = useDispatch();
    const [nom , setNom] = useState('');
    const [prenom , setPrenom] = useState('');
    const [adresse , setAdresse] = useState('');
    const [matricule , setMatricule] = useState('');
    const [numerodetelephone , setNumerodetelephone] = useState('');
    const [Role, setRole] = useState('');
    const [email , setEmail] = useState('');
    const [departement , setDepartement] = useState('');
    const [projet , setProjet] = useState('');
    const [tache , setTache] = useState('');

    
    const employer = useSelector(state => state.employer.employer.Employerlist || state.employer.employer);

    useEffect(() => {
       dispatch(listerEmployer());
     }, [dispatch]);

      const inputFormElements = [
        { 
            name: "nom",
            value: nom,
            onChange: (e) => { setNom(e.target.value) },
            placeholder: "Enter Nom de l'employé",
            label: "Nom employé",
            variant: "outlined",
            fullWidth: true,
            xs: 12,
            sm: 6
        },
        { 
            name: "prenom",
            value: prenom,
            onChange: (e) => {  setPrenom(e.target.value) },
            placeholder: "Enter prénom employé",
            label: "prénom employé",
            variant: "outlined",
            fullWidth: true,
            xs: 12,
            sm: 6 
        },
        { 
            name: "adresse",
            value: adresse,
            onChange: (e) => { setAdresse(e.target.value) },
            type: "adresse",
            placeholder: "Enter adresse",
            label: "adresse",
            variant: "outlined",
            fullWidth: true,
            xs: 12,
            sm: 6 
        },
        { 
            name: "matricule",
            value: matricule,
            onChange: (e) => { setMatricule(e.target.value) },
            type: "matricule",
            placeholder: "Enter matricule",
            label: "matricule",
            variant: "outlined",
            fullWidth: true,
            xs: 12,
            sm: 6 
        },
        { 
            name: "numerodetelephone",
            value: numerodetelephone,
            onChange: (e) => { setNumerodetelephone(e.target.value) },
            placeholder: "Enter numéro de télephone",
            label: "numéro de télephone",
            variant: "outlined",
            fullWidth: true,
            xs: 12,
            sm: 6 
        },
        { 
            name: "Role",
            value: Role,
            onChange: (e) => { setRole(e.target.value) },
            placeholder: "Enter Role",
            label: "Role",
            variant: "outlined",
            fullWidth: true,
            xs: 12,
            sm: 6 
        },
        { 
            name: "email",
            value: email,
            onChange: (e) => { setEmail(e.target.value) },
            placeholder: "Enter email",
            label: "email",
            variant: "outlined",
            fullWidth: true,
            xs: 12,
            sm: 6 
        },
        { 
            name: "departement",
            value: departement,
            onChange: (e) => { setDepartement(e.target.value) },
            placeholder: "Enter departement name",
            label: "departement",
            variant: "outlined",
            fullWidth: true,
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
            xs: 12,
            sm: 12 
        },
        { 
            name: "tache",
            value: tache,
            onChange: (e) => { setTache(e.target.value) },
            placeholder: "Enter le tache ",
            label: "tache",
            variant: "outlined",
            fullWidth: true,
            xs: 12,
            sm: 12 
        }
    ];

    

    const addEmployer = () => {
        const data = {};
        inputFormElements.forEach(element => {
            data[element.name] = formData[element.name];
        });
        console.log(data)
        dispatch(addEmployerAction(data))
        setOpenPopup(false);
        setFormData({});
    }
    
    





    const classes = useStyles();
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
        <><div className='header'>
            <PageHeader
                title="Nouveau Employer"
               
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
         </div>
         <div className='table-section'>
         <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Input
                        label="Recherche Employees"
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
                    <Controls.Button  text="Ajouter"  variant="outlined" startIcon={<AddIcon />} className={classes.newButton1} onClick={handleAddNew} />
                </Toolbar>

                <TblContainer>
                    <TblHead />
                    <TableBody>

                        
                        {employer.map(employe => (
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
                                    <ActionButton  color="primary"onClick={() => { setOpenPopup(true); setRecordForEdit(employe); }}><EditOutlinedIcon fontSize="small" /> </ActionButton>
                                    <ActionButton color="secondary"> <CloseIcon fontSize="small" /></ActionButton></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
         </div>
           
            
            <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
                <DialogTitle className={classes.dialogTitle}>
                    <div style={{ display: 'flex' }}>
                        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                            Employee Form
                        </Typography>
                        <ActionButton color="secondary" onClick={() => setOpenPopup(false)} ><CloseIcon /> </ActionButton>
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                        <form onSubmit={e => { e.preventDefault(); addEmployer(); }}>
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
                                <Controls.Button type="submit" text="Submit" />
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
    export default  Employees