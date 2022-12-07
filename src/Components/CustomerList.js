import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button } from "@mui/material";
import EditCustomer from "./EditCustomer";
import AddCustomer from "./AddCustomer";
import TrainingList from "./TrainingList";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [value, setValue] = useState('home');
  const handleTabChange = (event, value) => {
    setValue(value);
  }
  const [columnDefs] = useState([
    //{ field: "id", sortable: true, filter: true },
    { field: "firstname", sortable: true, filter: true },
    { field: "lastname", sortable: true, filter: true },
    { field: "streetaddress", sortable: true, filter: true },
    { field: "postcode", sortable: true, filter: true },
    { field: "city", sortable: true, filter: true },
    { field: "email", sortable: true, filter: true },
    { field: "phone", sortable: true, filter: true },
    {
      width: 150,
      cellRenderer: (params) => (
        <EditCustomer data={params.data} updateCustomer={updateCustomer} />
      ),
    },
    {
      cellRenderer: (params) => (
        <Button
          color="error"
          size="small"
          onClick={() => deleteCustomer(params.data)}
        >
          Delete
        </Button>
      ),
    },
  ]);

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => {
        if (response.ok) return response.json();
        else alert("Something went wrong");
      })
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error);
  };

  const addCustomer = (customer) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (response.ok) getCustomers();
        else alert("Something went wrong when adding the customer");
      })
      .catch((err) => console.error(err));
  };

  const deleteCustomer = (data) => {
    if (window.confirm("Are you sure?")) {
      fetch(data._links.car.href, { method: "DELETE" })
        .then((response) => {
          if (response.ok) getCustomers();
          else alert("Something went wrong in deletion");
        })
        .catch((err) => console.error(err));
    }
  };

  const updateCustomer = (customer, url) => {
    fetch(url, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (response.ok) getCustomers();
        else alert("Something went wrong when editing");
      })
      .catch((err) => console.error(err));
  }
  
  return (
    <div
      className="ag-theme-material"
      style={{ height: 650, width: "90%", margin: "auto" }}
    >
      <AddCustomer addCustomer={addCustomer} />
      <AgGridReact
        rowData={customers}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
}
