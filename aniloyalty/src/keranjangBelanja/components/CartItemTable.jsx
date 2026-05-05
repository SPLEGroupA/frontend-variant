
import React from 'react';
import { Link, useNavigate } from "react-router";
import { useParams } from "@/commons/hooks/useParams"
import { useAuth } from '@/commons/auth';
import { Button, Modal, Spinner } from '@/commons/components';
import * as Layouts from "@/commons/layouts";
const CartItemTable = ({ listCartItem,
		 

	}) => {
  const { checkPermission } = useAuth();
  
  return (
  <>
    <Layouts.ListComponentTableLayout
  	  items={[listCartItem]}
  	  itemsAttrs={[
          {
            id: "idCartItem",
            condition: "",
            label: "Id Cart Item",
            featureName: "id_cart_item",
            editable: false
          }
  ,        {
            id: "quantity",
            condition: "",
            label: "Quantity",
            featureName: "quantity",
            editable: false
          }
  ,        {
            id: "hargaSatuan",
            condition: "isCurrency",
            label: "Harga Satuan",
            featureName: "harga_satuan",
            editable: false
          }
  ]}
        itemsEvents={(cartItemItem) => [
          <Link to=''>
            <Button 
               id="_TKA_KB_TBL_lst_del"
               variant=
                          "secondary"
               onClick={() => delete(cartItemItem)}
            >
               Delete
            </Button>
          </Link>
        ]}
  	/>
  </>
  )
};

export default CartItemTable;
