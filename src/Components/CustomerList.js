import React, { useState, useEffect, useCallback, useRef } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";
import Button from '@mui/material/Button';

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = React.useState(false);
  const gridRef = useRef();
  
  useEffect(() => {
    getCustomers();
  }, []);

  
  const getCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content));
  };

  const exportData = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  const addCustomer = (customer) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Customer added successfully");
          setOpen(true);
          getCustomers();
        } else {
          alert("Something went wrong when adding a customer");
        }
      })
      .catch((err) => console.error(err));
  };


  const updateCustomer = (updatedCustomer, link) => {
    fetch(link, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updatedCustomer),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Customer edited succesfully");
          setOpen(true);
          getCustomers();
        } else {
          alert("Something went wrong when editing");
        }
      })
      .catch((err) => console.error(err));
  };

  const deleteCustomer = (link) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      fetch(link, { method: "DELETE" }).then((response) => {
        if (response.ok) {
          console.log("Customer deleted successfully");
          setOpen(true);
          getCustomers();
        } else {
          alert("Something went wrong!");
        }
      });
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);


  const addTraining = (training) => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(training),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Training was added succesfully");
          setOpen(true);
          getCustomers();
        } else {
          alert("Something went wrong with adding a training");
        }
      })
      .catch((err) => console.error(err));
  };

  const columns = [
    { field: "firstname", sortable: true, filter: true, width: 140 },
    { field: "lastname", sortable: true, filter: true, width: 140 },
    { field: "email", sortable: true, filter: true, width: 180 },
    { field: "phone", sortable: true, filter: true, width: 140 },
    { field: "streetaddress", sortable: true, filter: true, width: 150 },
    { field: "postcode", sortable: true, filter: true, width: 120 },
    { field: "city", sortable: true, filter: true, width: 110 },
    {
      headerName: "",
      width: 180,
      field: "links.0.href",
      cellRenderer: params => <AddTraining addTraining={addTraining} params={params} />
    },
    {
      headerName: "",
      width: 90,
      field: "links.0.href",
      cellRenderer: params =>  <EditCustomer updateCustomer={updateCustomer} params={params} />
    },
    {
      headerName: "",
      width: 90,
      field: "links.0.href",
      cellRenderer: params => <IconButton color="error" onClick={() => deleteCustomer(params.value)}>
          <DeleteIcon />
        </IconButton>
    },
  ];

  return (
    <div className="ag-theme-material" style={{ height: 600, width: "90%" }}>
      <Button id="Exportcustomers" variant="outlined" onClick={() => exportData()}>Export Customers Data</Button>
      <AddCustomer addCustomer={addCustomer} />
      <AgGridReact
        ref={gridRef}
        columnDefs={columns}
        rowData={customers}
        pagination={true}
        paginationPageSize={10}
        suppressCellFocus={true}
      />
    </div>
  );
}
