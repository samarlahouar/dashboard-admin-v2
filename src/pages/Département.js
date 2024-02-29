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
import "./Département.css";

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

const headCells = [
    { id: 'type de département', label: 'type de département' },
    { id: 'Déscription', label: 'Déscription' },
    { id: 'Projet', label: 'Projet' },
    { id: 'actions', label: 'Actions', disableSorting: true }
];

function Projet() {
    const classes = useStyles();

    const [typededépartement , setTypededépartement] = useState('');
    const [déscription , setDéscription] = useState('');
    const [projet , setProjet] = useState('');

    const inputFormElements = [
        { 
            name: "Type de département",
            value: typededépartement,
            onChange: (e) => { setTypededépartement(e.target.value) },
            placeholder: "Enter Nom de département",
            label: "Nom de département",
            variant: "outlined",
            fullWidth: true,
            required: true,
            xs: 12,
            sm: 6
        },
        { 
            name: "Déscription",
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

    const addProjet = () => {
        const data = {
            typededépartement,
            déscription,
            projet
        }
       // dispatch (addEmployerAction(data))
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
                title="Nouveau Département"
              
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Input
                        label="Recherche département"
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
                    <Controls.Button text="Ajouter"  variant="outlined" startIcon={<AddIcon />} className={classes.newButton} onClick={handleAddNew} />
                </Toolbar>

                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {recordsAfterPagingAndSorting().map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.typeedépartement}</TableCell>
                                <TableCell>{item.déscription}</TableCell>
                                <TableCell>{item.projet}</TableCell>
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
                            Département Form
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

export default Projet;