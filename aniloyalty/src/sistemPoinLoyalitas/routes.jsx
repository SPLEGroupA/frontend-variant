
import React from 'react';
import TableAkunWithPoinPage from './containers/TableAkunWithPoinPage'
import RedeemPoinPage from './containers/RedeemPoinPage'

const sistemPoinLoyalitasRoutes = [
{ 
    path: "/akun-poin",
    element: <TableAkunWithPoinPage />,
  }	
,
{ 
    path: "/akun-poin/redeem",
    element: <RedeemPoinPage />,
  }	

]

export default sistemPoinLoyalitasRoutes
