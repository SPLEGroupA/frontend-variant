
import React from 'react';
import TableProdukPreOwnedPage from './containers/TableProdukPreOwnedPage'
import AddProdukPreOwnedPage from './containers/AddProdukPreOwnedPage'

const katalogProdukPreOwnedRoutes = [
{ 
    path: "/produk-pre-owned",
    element: <TableProdukPreOwnedPage />,
  }	
,
{ 
    path: "",
    element: <AddProdukPreOwnedPage />,
  }	

]

export default katalogProdukPreOwnedRoutes
