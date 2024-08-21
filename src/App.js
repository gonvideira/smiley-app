import React, { useEffect, useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import ToDoItem from './components/ToDoItem';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Initialize all Materialize components
    M.AutoInit();

    function getToDoItems() {
      var baseId = 'appx4tiDiwnMHs5fO';
      var tableName = 'Daily tasks';
      var viewName = "Maria Today view";
      var apiKey = 'patsuPhP7B8hzAKdc.1816ca455bc6c596aef2a447b12fcd9c353b2bf35ee7cc3547f3667524675f6a';
    
      // Airtable API endpoint
      var url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?view=${encodeURIComponent(viewName)}`;
      console.log(`url: ${url}`);
    
      var options = {
        'method': 'get',
        'headers': {
          'Authorization': 'Bearer ' + apiKey,
          'Content-Type': 'application/json'
        },
        'muteHttpExceptions': true
      };
    
      fetch(url, options)
        .then(response => response.json())
        .then(data => {
          const list = data.records.map((record)=>{
            return {
              id: record.id,
              name: record.fields['Name'],
              complete: record.fields['Complete'] || false,
              notApplicable: record.fields['Not applicable'] || false,
              date: record.fields['Date']
            };
          });
          setItems(list);
          console.log(list)
        })
        .catch(error => console.error(error));
    
    }

    getToDoItems();

  }, []);

  const toggleCompletion = (id, isComplete) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, complete: isComplete, notApplicable: !isComplete ? item.notApplicable : false } : item
      )
    );
  };

  const toggleNotApplicable = (id, isNotApplicable) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, notApplicable: isNotApplicable, complete: !isNotApplicable ? item.complete : false } : item
      )
    );
  };

  function handleSubmit() {
    const modal = M.Modal.getInstance(document.getElementById('modal1'));
    modal.open();

    // Simulate form submission
    setTimeout(() => {
      modal.close();
      console.log('Form submitted!');
    }, 2000);
  }

  return (
    <div className="container">
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo center">Maria's Smiley App</a>
        </div>
      </nav>
      <h5 class="center">To-Do List for {new Date().toISOString().split('T')[0]}</h5>
      
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

      <div className="row">
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
