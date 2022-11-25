import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button } from "@mui/material";
import EditTraining from "./EditTraining";
import AddTraining from "./AddTraining";

export default function TrainingList() {
  const [trainings, setTrainings] = useState([]);

  const [columnDefs] = useState([
    { field: "id", sortable: true, filter: true },
    { field: "date", sortable: true, filter: true },
    { field: "duration", sortable: true, filter: true },
    { field: "activity", sortable: true, filter: true },
    {
      width: 150,
      cellRenderer: (params) => (
        <EditTraining data={params.data} updateTraining={updateTraining} />
      ),
    },
    {
      cellRenderer: (params) => (
        <Button
          color="error"
          size="small"
          onClick={() => deleteTraining(params.data)}
        >
          Delete
        </Button>
      ),
    },
  ]);

  useEffect(() => {
    getCars();
  }, []);

  const getTrainings = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then((response) => {
        if (response.ok) return response.json();
        else alert("Something went wrong");
      })
      .then((data) => setTrainings(data._embedded.cars))
      .catch((err) => console.error);
  };

  const addTraining = (training) => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(training),
    })
      .then((response) => {
        if (response.ok) getCars();
        else alert("Something went wrong when adding a training");
      })
      .catch((err) => console.error(err));
  };

  const deleteTraining = (data) => {
    if (window.confirm("Are you sure?")) {
      fetch(data._links.car.href, { method: "DELETE" })
        .then((response) => {
          if (response.ok) getCars();
          else alert("Something went wrong in deletion");
        })
        .catch((err) => console.error(err));
    }
  };

  const updateTraining = (training, url) => {
    fetch(url, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(training),
    })
      .then((response) => {
        if (response.ok) getTrainings();
        else alert("Something went wrong when editing");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div
      className="ag-theme-material"
      style={{ height: 650, width: "90%", margin: "auto" }}
    >
      <AddTraining addTraining={addTraining} />
      <AgGridReact
        rowData={trainings}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
}
