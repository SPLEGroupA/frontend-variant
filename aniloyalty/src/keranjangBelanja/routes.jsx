
import React from 'react';
import KeranjangPage from './containers/KeranjangPage'
import AddItemPage from './containers/AddItemPage'

const keranjangBelanjaRoutes = [
{ 
    path: "/keranjang",
    element: <KeranjangPage />,
  }	
,
{ 
    path: "/keranjang/add",
    element: <AddItemPage />,
  }	

]

export default keranjangBelanjaRoutes
