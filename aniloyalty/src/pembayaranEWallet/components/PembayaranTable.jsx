
import React from 'react';
import { Link, useNavigate } from "react-router";
import { useParams } from "@/commons/hooks/useParams"
import { useAuth } from '@/commons/auth';
import { Button, Modal, Spinner } from '@/commons/components';
import * as Layouts from "@/commons/layouts";
const PembayaranTable = ({ listPembayaranEWallet,
	}) => {
  const { checkPermission } = useAuth();
  
  return (
  <>
    <Layouts.ListComponentTableLayout
  	  items={[listPembayaranEWallet]}
  	  itemsAttrs={[
          {
            id: "eWalletProvider",
            condition: "",
            label: "EWallet Provider",
            featureName: "ewallet_provider",
            editable: false
          }
  ]}
  	/>
  </>
  )
};

export default PembayaranTable;
