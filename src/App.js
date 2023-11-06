import { useState } from "react";
import "./App.css";

import Admin from "./components/admin";
import Patient from "./components/patient";

function App() {
  const [admin, setAdmin] = useState(false);

  return (
    <div className="App">
      <header>
        <button
          onClick={() =>
            setAdmin((e) => {
              return (e = true);
            })
          }
        >
          Admin
        </button>
        <button
          onClick={() =>
            setAdmin((e) => {
              return (e = false);
            })
          }
        >
          Patient
        </button>
      </header>
      <div className="container">
        {admin && <Admin />}

        {!admin && <Patient />}
      </div>
    </div>
  );
}

export default App;
