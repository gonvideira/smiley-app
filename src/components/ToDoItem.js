import React from 'react';

function ToDoItem({ id, name, complete, notApplicable, toggleCompletion, toggleNotApplicable }) {
  return (
    <tr data-id={id} className={`${complete ? 'completed' : ''} ${notApplicable ? 'not-applicable' : ''}`}>
      <td>
        <label>
          <input 
            type="checkbox" 
            className="filled-in" 
            checked={complete} 
            onChange={(e) => toggleCompletion(id, e.target.checked)} 
          />
          <span></span>
        </label>
      </td>
      <td>
        <label>
          <input 
            type="checkbox" 
            className="filled-in" 
            checked={notApplicable} 
            onChange={(e) => toggleNotApplicable(id, e.target.checked)} 
          />
          <span></span>
        </label>
      </td>
      <td>{name}</td>
    </tr>
  );
}

export default ToDoItem;
