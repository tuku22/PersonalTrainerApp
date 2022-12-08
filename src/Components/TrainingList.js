import React, { useState, useEffect, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import Button from '@mui/material/Button';


export default function TrainingList() {
  const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = useState(false);
  const gridRef = useRef();

  useEffect(() => {
    getTrainings();
  }, []);

  const getTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };

  const exportData = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  const deleteTraining = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch("https://customerrest.herokuapp.com/api/trainings/" + id, {
        method: "DELETE",
      }).then((response) => {
        if (response.ok) {
          console.log("Training was deleted successfully");
          setOpen(true);
          getTrainings();
        } else {
          alert("Something went wrong!");
        }
      });
    }
  };

  const customerName = (params) => {
    console.log(params);
    return params.data.customer.firstname + " " + params.data.customer.lastname;
  };

  const columns = [
    { field: "activity", sortable: true, filter: true, width: 150 },
    { field: "duration", sortable: true, filter: true, width: 140 },
    {
      field: "date",
      sortable: true,
      filter: true,
      width: 160,
      valueFormatter: (params) =>
        dayjs(params.value).format("DD.MM.YYYY HH:mm"),
    },
    {
      headerName: "Customer",
      valueGetter: customerName,
      width: 160,
    },
    {
      headerName: "",
      width: 90,
      field: "links.0.href",
      cellRenderer: (params) => (
        <IconButton
          color="error"
          onClick={() => deleteTraining(params.data.id)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div
      className="ag-theme-material"
      style={{ height: "600px", width: "70%" }}
    >
      <Button id="ExportTrainings" variant="outlined" onClick={() => exportData()}>Export Trainings Data</Button>
      <AgGridReact
        ref={gridRef}
        columnDefs={columns}
        rowData={trainings}
        pagination={true}
        paginationPageSize={10}
        suppressCellFocus={true}
      />
    </div>
  );
}
