
import React from 'react';
import TablePreOrderPage from './containers/TablePreOrderPage'
import AddPreOrderPage from './containers/AddPreOrderPage'

const preOrderRoutes = [
{ 
    path: "/preorder",
    element: <TablePreOrderPage />,
  }	
,
{ 
    path: "/preorder/add",
    element: <AddPreOrderPage />,
  }	

]

export default preOrderRoutes
