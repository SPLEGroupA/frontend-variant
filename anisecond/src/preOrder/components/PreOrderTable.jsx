
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
import {
  ALLOWED_PERMISSIONS,
  findAllowedPermission,
} from "@/commons/constants/allowedPermission";
import cleanFormData from "@/commons/utils/cleanFormData";
import { notifyError, notifySuccess } from "@/commons/utils/toaster";


import deletePreOrder from '../services/deletePreOrder'
import updatePreOrder from '../services/updatePreOrder'
import * as Layouts from "@/commons/layouts";	
const PreOrderTable = ({ listPreOrder,
		 
		 

	}) => {
  const { checkPermission } = useAuth();
  const [selectedUpdatePreOrder, setSelectedUpdatePreOrder] = React.useState(null);
  const [selectedKonfirmasiHapusPreOrder, setSelectedKonfirmasiHapusPreOrder] = React.useState(null);
  const [showModalUpdatePreOrder, setShowModalUpdatePreOrder] = React.useState(false);
  const { 
    control, 
    handleSubmit,
    reset
  } = useForm({ defaultValues:  })
  
  
  
  
  
  
  
  
  const submit = (data) => {
    const cleanData = cleanFormData(data)
    updatePreOrder({
      ...cleanData,
    })
    .then(({ data: { data } }) => {
     navigate(`/preorder`)
  	notifySuccess(`Update PreOrder berhasil!`);
  	setShowModalUpdatePreOrder(false)
  	setTimeout(() => {
        window.location.reload();
      }, 500);
    })
    .catch((error) => {
      console.error(error);
          notifyError(error);
    });
  }
  const [showModalKonfirmasiHapusPreOrder, setShowModalKonfirmasiHapusPreOrder] = React.useState(false);
  
  const hapus = async (selectedKonfirmasiHapusPreOrder) => {
      await deletePreOrder({
      });
  		window.location.reload()
    }
  
  return (
  <>
    <Layouts.ListComponentTableLayout
  	  items={[listPreOrder]}
  	  itemsAttrs={[
          {
            id: "idPreOrder",
            condition: "",
            label: "Id PreOrder",
            featureName: "id_preorder",
            editable: false
          }
  ,        {
            id: "tanggalRilis",
            condition: "",
            label: "Tanggal Rilis",
            featureName: "tanggal_rilis",
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
        itemsEvents={(preOrderItem) => [
          <Link to=''>
            <Button
              id="_TKA_PO_TBL_lst_upd"
              size="sm"
              variant=
                          "secondary"
              onClick={() => {
                setSelectedUpdatePreOrder(preOrderItem);
                setShowModalUpdatePreOrder(true);
              }}
            >
              Update
            </Button>
          </Link>
  ,
          <Link to=''>
    <Button
      id="_TKA_PO_TBL_lst_del"
      size="sm"
      variant=
                  "secondary"
      onClick={() => {
        setSelectedKonfirmasiHapusPreOrder(preOrderItem);
        setShowModalKonfirmasiHapusPreOrder(true);
      }}
    >
      Delete
    </Button>
  </Link>
        ]}
  	/>
  		<Modal
  		isShow={showModalUpdatePreOrder}
  		title={"Update PreOrder"}
  		>
  		
  		
  		</Modal>,
  		<Modal
  		isShow={showModalKonfirmasiHapusPreOrder}
  		title={"Konfirmasi Hapus PreOrder"}
  		text={"Are you sure want to proceed?"}
  		>
  		
  				<Link to=''><Button id="batal" className={`w-full`} variant="tertiary" onClick={() => setShowModalKonfirmasiHapusPreOrder(false)}>Batal</Button></Link>
  		
  		<Button
  		  id="_TKA_PO_TBL_dw_ev"
  		  variant="primary"
  		  onClick={() => hapus(selectedKonfirmasiHapusPreOrder)}
  		>
  		  Hapus
  		</Button>
  		</Modal>,
  </>
  )
};

export default PreOrderTable;
