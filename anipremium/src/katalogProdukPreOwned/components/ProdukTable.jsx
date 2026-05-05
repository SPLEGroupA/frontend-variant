
import React from 'react';
import { Link, useNavigate } from "react-router";
import { useParams } from "@/commons/hooks/useParams"
import { useAuth } from '@/commons/auth';
import { Button, Modal, Spinner } from '@/commons/components';
import * as Layouts from "@/commons/layouts";
const ProdukTable = ({ listProdukPreOwned,
	}) => {
  const { checkPermission } = useAuth();
  
  return (
  <>
    <Layouts.ListComponentTableLayout
  	  items={[listProdukPreOwned]}
  	  itemsAttrs={[
          {
            id: "kondisi",
            condition: "",
            label: "Kondisi",
            featureName: "kondisi",
            editable: false
          }
  ]}
  	/>
  </>
  )
};

export default ProdukTable;
