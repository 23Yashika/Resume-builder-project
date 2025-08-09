import React from "react";
import AppRouter from "./routes/AppRouter";
import { BrowserRouter } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <div>
        <AppRouter />
      </div>
    </BrowserRouter>
  );
};

export default App;
