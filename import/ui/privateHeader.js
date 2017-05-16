import React from 'react';
import {Accounts} from 'meteor/accounts-base';

//stateless functional component
const PrivateHeader = (props)=>{
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <button className="button--header" onClick={()=>Accounts.logout()}>Logout</button>
      </div>
    </div>
  )
}

export default PrivateHeader;
