import React from 'react';


const MessagesBtn = (props) => {
  const { user, isOpen, onClick } = props;

  let className = 'btn-group';
  if (isOpen) {
    className += ' open';
  }

  return (
    <div className={className}>
      <a href="#" className="btn btn-primary dropdown-toggle" onClick={onClick}>
        Messages
      </a>      
    </div>
  );
};

export default MessagesBtn;
