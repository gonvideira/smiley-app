import React from 'react';

function Modal({ isOpen }) {
  return (
    <div id="modal1" className={`modal ${isOpen ? 'open' : ''}`}>
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
  );
}

export default Modal;
