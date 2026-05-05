
import React from 'react';
import TablePembayaranPage from './containers/TablePembayaranPage'
import AddPembayaranPage from './containers/AddPembayaranPage'
import DetailPembayaranPage from './containers/DetailPembayaranPage'

const pembayaranRoutes = [
{ 
    path: "/pembayaran",
    element: <TablePembayaranPage />,
  }	
,
{ 
    path: "/pembayaran/add",
    element: <AddPembayaranPage />,
  }	
,
{ 
    path: "/pembayaran/:id_pembayaran",
    element: <DetailPembayaranPage />,
  }	

]

export default pembayaranRoutes
