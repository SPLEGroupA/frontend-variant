
import React from 'react';
import { Link, useNavigate } from "react-router";
import { useParams } from "@/commons/hooks/useParams"
import { useAuth } from '@/commons/auth';
import { Button, Modal, Spinner } from '@/commons/components';
import * as Layouts from "@/commons/layouts";
const ProdukTable = ({ listProdukWithRating,
	}) => {
  const { checkPermission } = useAuth();
  
  return (
  <>
    <Layouts.ListComponentTableLayout
  	  items={[listProdukWithRating]}
  	  itemsAttrs={[
          {
            id: "averageRating",
            condition: "",
            label: "Average Rating",
            featureName: "average_rating",
            editable: false
          }
  ]}
  	/>
  </>
  )
};

export default ProdukTable;
