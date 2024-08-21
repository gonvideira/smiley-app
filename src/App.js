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
      var apiKey = 'patsuPhP7B8hzAKdc.ec002908afcae642f7f28135b13a9a0952590e440ca8f510b6e2c6a57d861c10';
    
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
    
      var response = UrlFetchApp.fetch(url, options);
      var responseCode = response.getResponseCode();
      
      if (responseCode !== 200) {
        Logger.log('Error fetching data from Airtable: ' + response.getContentText());
        throw new Error('Failed to fetch data from Airtable. Response code: ' + responseCode);
      }
    
      var data = JSON.parse(response.getContentText());
    
      // Check if data.records exists before proceeding
      if (!data.records) {
        Logger.log('No records found in the response: ' + JSON.stringify(data));
        throw new Error('No records found in the response');
      }
    
      var todoItems = data.records.map(function(record) {
        return {
          id: record.id,
          name: record.fields['Name'],
          complete: record.fields['Complete'] || false,
          notApplicable: record.fields['Not applicable'] || false
        };
      });
    
      console.log(todoItems);
      return todoItems;
    }

    // Simulate fetching data from a server
    //const fetchedItems = [
    //  { id: 1, name: "Task 1", complete: false, notApplicable: false },
    //  { id: 2, name: "Task 2", complete: true, notApplicable: false },
      // Add more items as needed
    //];

    const fetchedItems = getToDoItems();
    setItems(fetchedItems);
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
      <h3>To-Do List for {new Date().toISOString().split('T')[0]}</h3>
      <table className="responsive-table">
        <thead>
          <tr>
            <th>Complete</th>
            <th>N/A</th>
            <th>Task</th>
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

      <button className="btn waves-effect waves-light" onClick={handleSubmit}>
        Submit
      </button>

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
