import React from 'react';

function ToDoItem({ id, name, complete, notApplicable, toggleCompletion, toggleNotApplicable }) {
  // Determine if the item should be struck through
  const isStrikethrough = complete || notApplicable;

  return (
    <tr data-id={id} className={isStrikethrough ? 'strikethrough' : ''}>
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
