import React from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
import { useSelector } from 'react-redux';
import './configs/lin.css';

export default function CustomPieChart() {
  const conger = useSelector(state => state.conger.conger.Congélist || state.conger.conger);
  const compte = useSelector(state => state.demandedecompte.compte.Comptelist || []);
  const departement = useSelector(state => state.departement.departement.departementlist || []);
  const employer = useSelector(
    (state) => state.employer.employer.Employerlist || state.employer.employer
  ).map((employee) => ({
    ...employee,
    id: employee._id // Utilisez la propriété _id comme identifiant unique
  }));
  const reunion = useSelector(state => state.reunion.reunion.Reunionlist || state.reunion.reunion);

  // Calculer le nombre d'éléments dans chaque catégorie
  const departmentCount = departement.length;
  const congerCount = conger.length;
  const compteCount = compte.length;
  const employeeCount = employer.length;
  const reunionCount = reunion.length;

  // Données pour le graphique
  const data = [
    { name: 'Départements', value: departmentCount },
    { name: 'Congés', value: congerCount },
    { name: 'Demandes de compte', value: compteCount },
    { name: 'Employés', value: employeeCount },
    { name: 'Réunions', value: reunionCount },
  ];

  // Couleurs pour les sections du graphique
  const colors = ['#8884d8', '#C6E4D9', '#C2BDE0', '#D69AC8', '#96DCF0'];

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx={150}
        cy={150}
        innerRadius={30}
        outerRadius={100}
        paddingAngle={5}
        cornerRadius={5}
        startAngle={-90}
        endAngle={180}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
