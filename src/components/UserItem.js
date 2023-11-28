import React from 'react';

const UserItem = ({ email, name }) => {
  return (
    <div className="product-item">  
      <p><strong>Address:</strong> {name}</p>
      <p><strong>Address:</strong> {email}</p>

    </div>
  );
};

export default UserItem;
