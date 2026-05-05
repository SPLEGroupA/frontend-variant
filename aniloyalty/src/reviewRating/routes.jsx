
import React from 'react';
import TableProdukWithRatingPage from './containers/TableProdukWithRatingPage'
import AddReviewPage from './containers/AddReviewPage'

const reviewRatingRoutes = [
{ 
    path: "/produk-rating",
    element: <TableProdukWithRatingPage />,
  }	
,
{ 
    path: "/produk-rating/review",
    element: <AddReviewPage />,
  }	

]

export default reviewRatingRoutes
