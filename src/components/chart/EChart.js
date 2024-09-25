import React, { useEffect, useState } from "react";
import { Typography, Grid, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function EChart() {
  const { Title, Paragraph } = Typography;
  const projetList = useSelector(state => state.projet.projet.projetlist || state.projet.projet);

  const [data, setData] = useState([]);

  useEffect(() => {
    // Vérifier que projetList est défini et non vide
    if (projetList && projetList.length > 0) {
      // Créer un tableau de données pour le graphique à barres
      const newData = projetList.map(projet => ({
        nomdeprojet: projet.nomdeprojet,
        statutdeprogression: projet.statutdeprogression,
        pourcentage: parseInt(projet.statutdeprogression.replace("%", ""))
      }));
      setData(newData);
    }
  }, [projetList]);

  return (
    
    <Grid container spacing={2}>
       <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>Projet actif</Typography>
        
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <ResponsiveContainer width="100%" height={data.length * 40}>
            <BarChart data={data} layout="vertical">
              <XAxis type="number" />
              <YAxis dataKey="nomdeprojet" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="pourcentage" fill="#2b1f84" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
     
    </Grid>
  );
}

export default EChart;
