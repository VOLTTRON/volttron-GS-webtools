import React from "react";
import "./App.css";
import Layout from "./containers/Layout/Layout";
import { StylesProvider } from "@material-ui/core/styles";

function App() {

  return (
    <div className="App">
      <StylesProvider injectFirst>
        <Layout />
      </StylesProvider>
    </div>
  );
}

export default App;
