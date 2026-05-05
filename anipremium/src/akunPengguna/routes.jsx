
import React from 'react';
import TableAkunPage from './containers/TableAkunPage'
import AddAkunPage from './containers/AddAkunPage'

const akunPenggunaRoutes = [
{ 
    path: "/akun",
    element: <TableAkunPage />,
  }	
,
{ 
    path: "/akun/add",
    element: <AddAkunPage />,
  }	

]

export default akunPenggunaRoutes
