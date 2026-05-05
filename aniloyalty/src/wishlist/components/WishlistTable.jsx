
import React from 'react';
import { Link, useNavigate } from "react-router";
import { useParams } from "@/commons/hooks/useParams"
import { useAuth } from '@/commons/auth';
import { Button, Modal, Spinner } from '@/commons/components';
import * as Layouts from "@/commons/layouts";
const WishlistTable = ({ listWishlist,
		 

	}) => {
  const { checkPermission } = useAuth();
  
  return (
  <>
    <Layouts.ListComponentTableLayout
  	  items={[listWishlist]}
  	  itemsAttrs={[
          {
            id: "namaProduk",
            condition: "",
            label: "Nama Produk",
            featureName: "nama",
            editable: false
          }
  ,        {
            id: "harga",
            condition: "isCurrency",
            label: "Harga",
            featureName: "harga",
            editable: false
          }
  ]}
        itemsEvents={(wishlistItem) => [
          <Link to=''>
            <Button 
               id="_TKA_DE_WL_TBL_lst_del"
               variant=
                          "secondary"
               onClick={() => remove(wishlistItem)}
            >
               Remove
            </Button>
          </Link>
        ]}
  	/>
  </>
  )
};

export default WishlistTable;
