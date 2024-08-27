import React from 'react';
import { HashRouter as Router, Routes,Route } from 'react-router-dom';
import Layout from './components/Layout';
import ToDoTable from './components/ToDoTable';
import Home from './components/Home';
import Modal from './components/Modal';

function App() {

  return (
    <Layout>
      
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/to-do" element={<ToDoTable />} />
          </Routes>
        </div>
      </Router>

      <Modal />

    </Layout>
  );
}

export default App;
