import React from 'react'
import Main from './pages/Main';
import Detail from './pages/Detail';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/:id" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;