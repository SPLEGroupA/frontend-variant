
import React from 'react';
import WishlistPage from './containers/WishlistPage'
import AddWishlistPage from './containers/AddWishlistPage'

const wishlistRoutes = [
{ 
    path: "/wishlist",
    element: <WishlistPage />,
  }	
,
{ 
    path: "/wishlist/add",
    element: <AddWishlistPage />,
  }	

]

export default wishlistRoutes
