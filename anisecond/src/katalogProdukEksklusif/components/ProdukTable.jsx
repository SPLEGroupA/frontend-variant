
import React from 'react';
import { Link, useNavigate } from "react-router";
import { useParams } from "@/commons/hooks/useParams"
import { useAuth } from '@/commons/auth';
import { Button, Modal, Spinner } from '@/commons/components';
import * as Layouts from "@/commons/layouts";
const ProdukTable = ({ listProdukEksklusif,
	}) => {
  const { checkPermission } = useAuth();
  
  return (
  <>
    <Layouts.ListComponentTableLayout
  	  items={[listProdukEksklusif]}
  	  itemsAttrs={[
          {
            id: "isEksklusif",
            condition: "",
            label: "Is Eksklusif",
            featureName: "is_eksklusif",
            editable: false
          }
  ]}
  	/>
  </>
  )
};

export default ProdukTable;
