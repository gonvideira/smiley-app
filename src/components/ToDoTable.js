import React, { useEffect, useState } from 'react';

function ToDoTable() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    google.script.run.withSuccessHandler(setItems).getToDoItems();
  }, []);

  return (
    <table id="todoTable" className="responsive-table">
      <thead>
        <tr>
          <th>Feito</th>
          <th>N/A</th>
          <th>Tarefa</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id} data-id={item.id} className={item.complete ? 'completed' : item.notApplicable ? 'not-applicable' : ''}>
            <td>
              <label>
                <input type="checkbox" className="filled-in" checked={item.complete} onChange={() => toggleCompletion(item.id)} />
                <span></span>
              </label>
            </td>
            <td>
              <label>
                <input type="checkbox" className="filled-in" checked={item.notApplicable} onChange={() => toggleNotApplicable(item.id)} />
                <span></span>
              </label>
            </td>
            <td>{item.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ToDoTable;
