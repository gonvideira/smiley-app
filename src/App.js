import React, { useEffect, useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import ToDoItem from './components/ToDoItem';

function App() {
  const [items, setItems] = useState([]);

  // Function to fetch To-Do items from the Airtable API
  const getToDoItems = () => {
    const baseId = 'appx4tiDiwnMHs5fO';
    const tableName = 'Daily tasks';
    const viewName = "Maria Today view";
    const apiKey = process.env.REACT_APP_AIRTABLE_API_KEY;

    if (!apiKey) {
      console.error('API key is missing!');
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

    fetch(url, options)
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
      .catch(error => console.error('Error fetching to-do items:', error));
  };

  useEffect(() => {
    // Initialize all Materialize components
    M.AutoInit();

    // Fetch to-do items when component mounts
    getToDoItems();
  }, []);

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
    const modal = M.Modal.getInstance(document.getElementById('modal1'));
    modal.open();

    const updatedItems = items.map(item => ({
      id: item.id,
      fields: {
        'Complete': item.complete,
        'Not applicable': item.notApplicable
      }
    }));

    const baseId = 'appx4tiDiwnMHs5fO';
    const tableName = 'Daily tasks';
    const apiKey = 'patsuPhP7B8hzAKdc.1816ca455bc6c596aef2a447b12fcd9c353b2bf35ee7cc3547f3667524675f6a';
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
        modal.close();
        getToDoItems(); // Re-fetch the updated data from Airtable
      })
      .catch(() => {
        modal.close();
      });
  }

  return (
    <div className="container">
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo center">Maria's Smiley App</a>
        </div>
      </nav>
      <h5 className="center">To-Do List for {new Date().toISOString().split('T')[0]}</h5>
      
      <div className="container">
        <table className="striped">
          <thead>
            <tr>
              <th>OK</th>
              <th>N/A</th>
              <th>Tarefa</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <ToDoItem
                key={item.id}
                {...item}
                toggleCompletion={toggleCompletion}
                toggleNotApplicable={toggleNotApplicable}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="container">
        <button className="btn waves-effect waves-light" onClick={handleSubmit}>
          Atualizar
        </button>
      </div>

      {/* Modal */}
      <div id="modal1" className="modal">
        <div className="modal-content">
          <h4>Working on it...</h4>
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
