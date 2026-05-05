
import React from 'react';
import TablePesananPage from './containers/TablePesananPage'
import DetailPesananPage from './containers/DetailPesananPage'

const manajemenPesananRoutes = [
{ 
    path: "/pesanan",
    element: <TablePesananPage />,
  }	
,
{ 
    path: "/pesanan/:id_pesanan",
    element: <DetailPesananPage />,
  }	

]

export default manajemenPesananRoutes
