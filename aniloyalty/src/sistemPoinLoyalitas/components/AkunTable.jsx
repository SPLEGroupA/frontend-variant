
import React from 'react';
import { Link, useNavigate } from "react-router";
import { useParams } from "@/commons/hooks/useParams"
import { useAuth } from '@/commons/auth';
import { Button, Modal, Spinner } from '@/commons/components';
import * as Layouts from "@/commons/layouts";
const AkunTable = ({ listAkunWithPoin,
	}) => {
  const { checkPermission } = useAuth();
  
  return (
  <>
    <Layouts.ListComponentTableLayout
  	  items={[listAkunWithPoin]}
  	  itemsAttrs={[
          {
            id: "poin",
            condition: "",
            label: "Poin",
            featureName: "poin",
            editable: false
          }
  ]}
  	/>
  </>
  )
};

export default AkunTable;
