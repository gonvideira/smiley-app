import React from 'react';
import ToDoItem from './ToDoItem';

const ToDoTable = ({ items, toggleCompletion, toggleNotApplicable }) => {
  return (
    <div>
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
  );
};

export default ToDoTable;
