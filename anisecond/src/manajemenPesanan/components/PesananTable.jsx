
import React from 'react';
import { Link } from "react-router";
import { useNavigate, useSearchParams } from "react-router"
import { useAuth } from '@/commons/auth';
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Form,
  InputField,
  SelectionField,
  MultiSelectionField,
  VisualizationAttr,
  Spinner,
  Modal,
} from "@/commons/components";
import { isMobile } from '@/commons/utils/responsive';
import {
  ALLOWED_PERMISSIONS,
  findAllowedPermission,
} from "@/commons/constants/allowedPermission";
import cleanFormData from "@/commons/utils/cleanFormData";
import { notifyError, notifySuccess } from "@/commons/utils/toaster";

import updateStatus from '../services/updateStatus'
import * as Layouts from "@/commons/layouts";	
const PesananTable = ({ listPesanan,
		 
		 

	}) => {
  const { checkPermission } = useAuth();
  const [selectedUpdateStatusPesanan, setSelectedUpdateStatusPesanan] = React.useState(null);
  const navigate = useNavigate();
  const detail = async (pesananItem) => {
    isMobile() && navigate(`/pesanan/${pesananItem.id_pesanan}`
    );
  };
  const [showModalUpdateStatusPesanan, setShowModalUpdateStatusPesanan] = React.useState(false);
  const { 
    control, 
    handleSubmit,
    reset
  } = useForm({ defaultValues:  })
  
  
  
  
  
  
  
  
  const submit = (data) => {
    const cleanData = cleanFormData(data)
    updateStatus({
      ...cleanData,
    })
    .then(({ data: { data } }) => {
     navigate(`/pesanan`)
  	notifySuccess(`Update Status berhasil!`);
  	setShowModalUpdateStatusPesanan(false)
  	setTimeout(() => {
        window.location.reload();
      }, 500);
    })
    .catch((error) => {
      console.error(error);
          notifyError(error);
    });
  }
  
  return (
  <>
    <Layouts.ListComponentTableLayout
  	  items={[listPesanan]}
  	  detail={detail}
  	  itemsAttrs={[
          {
            id: "idPesanan",
            condition: "",
            label: "Id Pesanan",
            featureName: "id_pesanan",
            editable: false
          }
  ,        {
            id: "status",
            condition: "",
            label: "Status",
            featureName: "status",
            editable: false
          }
  ,        {
            id: "tanggalPesan",
            condition: "",
            label: "Tanggal Pesan",
            featureName: "tanggal_pesan",
            editable: false
          }
  ,        {
            id: "totalHarga",
            condition: "isCurrency",
            label: "Total Harga",
            featureName: "total_harga",
            editable: false
          }
  ]}
        itemsEvents={(pesananItem) => [
          <Link to={`/pesanan/${pesananItem.id_pesanan}`}>
            <Button
              id="_TKA_MP_TBL_lst_det"
              size="sm"
              variant=
                  "primary"
            >
              Detail
            </Button>
          </Link>
  ,
          <Link to=''>
    <Button
      id="_TKA_MP_TBL_lst_upd"
      size="sm"
      variant=
                  "secondary"
      onClick={() => {
        setSelectedUpdateStatusPesanan(pesananItem);
        setShowModalUpdateStatusPesanan(true);
      }}
    >
      UpdateStatus
    </Button>
  </Link>
        ]}
  	/>
  		<Modal
  		isShow={showModalUpdateStatusPesanan}
  		title={"Update Status Pesanan"}
  		>
  		
  		
  		</Modal>,
  </>
  )
};

export default PesananTable;
