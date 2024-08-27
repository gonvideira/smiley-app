import React from 'react';

function Modal({ isOpen }) {
  return (
    <div id="modal1" className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">

        <div className="progress">
          <div className="indeterminate"></div>
        </div>

      </div>
    </div>
  );
}

export default Modal;
