
import React from 'react';
import { Link, useNavigate } from "react-router";
import { useParams } from "@/commons/hooks/useParams"
import { useAuth } from '@/commons/auth';
import { Button, Modal, Spinner } from '@/commons/components';
import * as Layouts from "@/commons/layouts";
const AkunTable = ({ listAkunWithMembership,
	}) => {
  const { checkPermission } = useAuth();
  
  return (
  <>
    <Layouts.ListComponentTableLayout
  	  items={[listAkunWithMembership]}
  	  itemsAttrs={[
          {
            id: "membershipLevel",
            condition: "",
            label: "Membership Level",
            featureName: "membership_level",
            editable: false
          }
  ]}
  	/>
  </>
  )
};

export default AkunTable;
