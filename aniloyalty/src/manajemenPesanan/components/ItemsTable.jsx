
import React from 'react';
import { Link, useNavigate } from "react-router";
import { useParams } from "@/commons/hooks/useParams"
import { useAuth } from '@/commons/auth';
import { Button, Modal, Spinner } from '@/commons/components';
import * as Layouts from "@/commons/layouts";
const ItemsTable = ({ listOrderItems,
	}) => {
  const { checkPermission } = useAuth();
  
  return (
  <>
    <Layouts.ListComponentTableLayout
  	  items={[listOrderItems]}
  	  itemsAttrs={[
          {
            id: "idOrderItem",
            condition: "",
            label: "Id Order Item",
            featureName: "id_order_item",
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
  	/>
  </>
  )
};

export default ItemsTable;
