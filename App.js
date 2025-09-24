import React, { useState } from "react";
import PPVCHPage from "./PPVCHPage";

function App() {
  const [page, setPage] = useState("main");

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      {page === "main" && (
        <>
          <h1>Головна сторінка</h1>
          <button onClick={() => setPage("ppvch")}>ППВЧ</button>
        </>
      )}
      {page === "ppvch" && (
        <PPVCHPage onBack={() => setPage("main")} />
      )}
    </div>
  );
}

export default App;
