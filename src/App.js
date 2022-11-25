import { AppBar, Toolbar, Typography } from "@mui/material";
import "./App.css";
import CustomerList from "./Components/CustomerList";

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">List of customers</Typography>
        </Toolbar>
      </AppBar>
      <CustomerList />
    </div>
  );
}

export default App;


