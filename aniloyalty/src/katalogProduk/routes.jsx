
import React from 'react';
import TableProdukPage from './containers/TableProdukPage'
import AddProdukPage from './containers/AddProdukPage'

const katalogProdukRoutes = [
{ 
    path: "/produk",
    element: <TableProdukPage />,
  }	
,
{ 
    path: "/produk/add",
    element: <AddProdukPage />,
  }	

]

export default katalogProdukRoutes
