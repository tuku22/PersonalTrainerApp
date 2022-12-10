import { AppBar, Toolbar, Typography } from "@mui/material";
import "./App.css";
import CustomerList from "./Components/CustomerList";
import {Route, Routes, Link, BrowserRoutes as Router} from 'react-router-dom';
import Home from './Components/Home';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { useState } from 'react'
import TrainingList from "./Components/TrainingList";
import Calendar from "./Components/CalendarTraining";
import Statistics from "./Components/Statistics";

function App() {
  const [value, setValue] = useState('home');
  const handleTabChange = (event, value) => {
    setValue(value);
  }

  return (
    <div className="App">
      <Tabs value={value} onChange={handleTabChange}>
        <Tab value ="home" label="Home" />
        <Tab value="customers" label="Customers" />
        <Tab value="training" label="Training" />
        <Tab value="calendar" label="Calendar" />
        <Tab value="statistics" label="Statistics" />
      </Tabs>
      {value === "home" && <Home />}
      {value === "customers" && <CustomerList />}
      {value === "training" && <TrainingList />}
      {value ==="calendar" && <Calendar />}
      {value === "statistics" && <Statistics />}

      <AppBar position="static">
       
      </AppBar>
    
    </div>
  );
}

export default App;


