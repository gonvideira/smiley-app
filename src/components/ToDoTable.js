import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';
import ToDoItem from './ToDoItem';
import Dashboard from './Dashboard';

const ToDoTable = () => {

  const [items, setItems] = useState([]);
  const [empty,setEmpty] = useState(false); // to control whether there are tasks

  const navigate = useNavigate();

  // Function to open the modal
  const openModal = () => {
    const modal = M.Modal.getInstance(document.getElementById('modal1'));
    modal.open();
  };

  // Function to close the modal
  const closeModal = useCallback(() => {
    const modal = M.Modal.getInstance(document.getElementById('modal1'));
    if (modal) {
      modal.close();
      console.log('Modal closed');
      document.body.style.overflow = 'auto'; // Ensure scrolling is restored
    }
  }, []);

  // Function to fetch To-Do items from the Airtable API
  const getToDoItems = useCallback(() => {
    const baseId = process.env.REACT_APP_BASE_ID;
    const tableName = 'Daily tasks';
    const viewName = "Maria Today view";
    const apiKey = process.env.REACT_APP_AIRTABLE_API;

    if (!apiKey) {
      console.error('API key is missing!');
      closeModal(); // close Modal if no API KEY
      return;
    }

    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?view=${encodeURIComponent(viewName)}`;

    const options = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      }
    };

    return fetch(url, options)
      .then(response => response.json())
      .then(data => {
        const list = data.records.map(record => ({
          id: record.id,
          name: record.fields['Name'],
          complete: record.fields['Complete'] || false,
          notApplicable: record.fields['Not applicable'] || false,
          date: record.fields['Date']
        }));
        setItems(list);
      })
      .catch(error => console.error('Error fetching to-do items:', error))
  }, [closeModal]);

  useEffect(() => {
    const elem = document.getElementById('modal1');
    const options = {
      'dismissible': false
    };
    M.Modal.init(elem, options);
    openModal(); // Open the modal before fetching data
    getToDoItems().finally(() => {
      closeModal();
      console.log(items.length)
    }); // Fetch to-do items when component mounts and close Modal when it finishes
    setEmpty(items.length === 0); // Set empty state based on the fetched items
  }, [getToDoItems, closeModal, items.length]);

  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/');  // Redirect to the Home page if not authenticated
    }
  }, [navigate]);

  // Toggle completion status of a to-do item
  const toggleCompletion = (id, isComplete) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, complete: isComplete, notApplicable: !isComplete ? item.notApplicable : false } : item
      )
    );
  };

  // Toggle not applicable status of a to-do item
  const toggleNotApplicable = (id, isNotApplicable) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, notApplicable: isNotApplicable, complete: !isNotApplicable ? item.complete : false } : item
      )
    );
  };

  // Handle form submission with batching
  function handleSubmit() {
    openModal(); // Open Modal before submiting data

    const updatedItems = items.map(item => ({
      id: item.id,
      fields: {
        'Complete': item.complete,
        'Not applicable': item.notApplicable
      }
    }));

    const baseId = process.env.REACT_APP_BASE_ID;
    const tableName = 'Daily tasks';
    const apiKey = process.env.REACT_APP_AIRTABLE_API;
    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

    const options = (records) => ({
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ records })
    });

    // Function to send a batch of records
    const sendBatch = (batch) => {
      return fetch(url, options(batch))
        .then(response => response.json())
        .catch(error => {
          console.error('Error updating to-do items:', error);
          throw error;  // Re-throw to ensure the modal closes on error
        });
    };

    // Split updatedItems into chunks of 10
    const batches = [];
    for (let i = 0; i < updatedItems.length; i += 10) {
      batches.push(updatedItems.slice(i, i + 10));
    }

    // Process each batch sequentially
    batches.reduce((promiseChain, currentBatch) => {
      return promiseChain.then(() => sendBatch(currentBatch));
    }, Promise.resolve())
      .then(() => {
        console.log('All batches submitted!');
        return getToDoItems(); // Re-fetch the updated data from Airtable
      })
      .catch(() => { })
      .finally(() => closeModal()); // Close the modal after submission and re-fetching;
  }

  return (
    <div>
      <Dashboard />
      {empty ? (
        // Show "CONGRATS" message when there are no items
        <div className="center-align section">
          <h5>PARABÉNS</h5>
          <p>Já acabaste as tarefas todas de hoje!!</p>
        </div>
      ) : (
        <div>
          <h5 className="center">🚧 tarefas para {new Date().toISOString().split('T')[0]} 🚧</h5>
          <table className="striped">
            <thead>
              <tr>
                <th>OK</th>
                <th>N/A</th>
                <th>Tarefa</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <ToDoItem
                  key={item.id}
                  {...item}
                  toggleCompletion={toggleCompletion}
                  toggleNotApplicable={toggleNotApplicable}
                />
              ))}
            </tbody>
          </table>
          <div className="section">
            <button className="btn waves-effect waves-light section" onClick={handleSubmit}>
              Atualizar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToDoTable;
