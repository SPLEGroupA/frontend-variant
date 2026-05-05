
import React from 'react';
import { Link, useNavigate } from "react-router";
import { useParams } from "@/commons/hooks/useParams"
import { useAuth } from '@/commons/auth';
import { Button, Modal, Spinner } from '@/commons/components';
import { isMobile } from '@/commons/utils/responsive';
import * as Layouts from "@/commons/layouts";
const PembayaranTable = ({ listPembayaran,
		 

	}) => {
  const { checkPermission } = useAuth();
  const navigate = useNavigate();
  const detail = async (pembayaranItem) => {
    isMobile() && navigate(`/pembayaran/${pembayaranItem.}`
    );
  };
  
  return (
  <>
    <Layouts.ListComponentTableLayout
  	  items={[listPembayaran]}
  	  detail={detail}
  	  itemsAttrs={[
          {
            id: "idPembayaran",
            condition: "",
            label: "Id Pembayaran",
            featureName: "id_pembayaran",
            editable: false
          }
  ,        {
            id: "metode",
            condition: "",
            label: "Metode",
            featureName: "metode",
            editable: false
          }
  ,        {
            id: "jumlah",
            condition: "isCurrency",
            label: "Jumlah",
            featureName: "jumlah",
            editable: false
          }
  ,        {
            id: "status",
            condition: "",
            label: "Status",
            featureName: "status",
            editable: false
          }
  ]}
        itemsEvents={(pembayaranItem) => [
          <Button
              id="_TKA_PY_TBL_lst_det"
              size="sm"
              variant=
                  "primary"
            >
              Detail
            </Button>
          </Link>
        ]}
  	/>
  </>
  )
};

export default PembayaranTable;
