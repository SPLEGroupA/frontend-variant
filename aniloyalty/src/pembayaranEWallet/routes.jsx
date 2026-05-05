
import React from 'react';
import TablePembayaranEWalletPage from './containers/TablePembayaranEWalletPage'
import AddPembayaranEWalletPage from './containers/AddPembayaranEWalletPage'

const pembayaranEWalletRoutes = [
{ 
    path: "/pembayaran-ewallet",
    element: <TablePembayaranEWalletPage />,
  }	
,
{ 
    path: "",
    element: <AddPembayaranEWalletPage />,
  }	

]

export default pembayaranEWalletRoutes
