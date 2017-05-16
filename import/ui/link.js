import React from 'react';

import PrivateHeader from './privateHeader';
import LinksList from './linksList';
import AddLink from './addLink';
import LinksListFilters from './linksListFilters'

export default () =>{
  return(
    <div>
        <PrivateHeader title="Short Links"/>
        <div className="page-content">
          <LinksListFilters/>
          <AddLink/>
          <LinksList/>
        </div>
    </div>
  )
}
