
import React from 'react';
import TableAkunWithMembershipPage from './containers/TableAkunWithMembershipPage'
import AddAkunWithMembershipPage from './containers/AddAkunWithMembershipPage'

const sistemMembershipRoutes = [
{ 
    path: "/akun-membership",
    element: <TableAkunWithMembershipPage />,
  }	
,
{ 
    path: "",
    element: <AddAkunWithMembershipPage />,
  }	

]

export default sistemMembershipRoutes
