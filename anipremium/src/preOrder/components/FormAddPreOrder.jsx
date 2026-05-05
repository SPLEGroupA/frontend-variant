
import React from "react";
import { useNavigate, useSearchParams } from "react-router";
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
import savePreOrder from '../services/savePreOrder'
import { notifyError, notifySuccess} from "@/commons/utils/toaster";
import * as Layouts from "@/commons/layouts";

const FormAddPreOrder = ({ 
	produkOptions
 }) => {
  	const [showErrorModal, setShowErrorModal] = React.useState(false);
  const { 
    control, 
    handleSubmit,
  } = useForm()
  
  
  
  
  const navigate = useNavigate()
  
  const submit = (data) => {
    const cleanData = cleanFormData(data)
    savePreOrder({
      ...cleanData,
    })
    .then(({ data: { data } }) => {
      navigate(`/preorder`)
  	notifySuccess(`Save PreOrder berhasil!`);
    })
    .catch((error) => {
      console.error(error);
          setShowErrorModal(true);
    });
  }
  
  
  return (
	<div>
	  <Layouts.FormComponentLayout
		  title="Add PreOrder" 
		  onSubmit={handleSubmit(submit)}
	
	    vas={[
		  ]}
	
		  formFields={[
	
	      <Controller
	        key="tanggal_rilis"
	        name="tanggal_rilis"
	        control={control}
	        rules={{ required: "Harap masukkan tanggal rilis" }} 
	        render={({ field, fieldState }) => (
	        <InputField
	          label="Tanggal Rilis"
	          placeholder="Masukkan tanggal rilis"
	          fieldState={fieldState}
	          {...field}
	          isRequired={true}
	        />
	        )}
	      />
	
		  ,
	
	
	      <Controller
	        key="id_produk"
	        name="id_produk"
	        control={control}
	        rules={{ required: "Harap pilih produk" }} 
	        render={({ field, fieldState }) => (
	        <SelectionField
	          
	          label="Produk"
	          options={produkOptions}
	          optionKey="id_produk"
	          optionLabel="nama"
	          placeholder="Masukkan produk"
	          fieldState={fieldState}
	          {...field}
	          isRequired={true}
	        />
	        )}
	      />
		  ]}
	
		  itemsEvents={[
		    <Button id="_TKA_PO_ADD_s" key="Submit" type="submit" variant="primary">Submit</Button>
	    ]}
	  />
	    	<Modal
	    	  isShow={showErrorModal}
	    	  onClose={() => setShowErrorModal(false)}
	    	  isError = {true}
	    	  text={"Error occurred while submitting the form. Please try again."}
	    	>
	        <button 
	          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
	          onClick={() => setShowErrorModal(false)}
	        >
	          Tutup
	         </button>
	    	</Modal>
	    
	</div>
  )
}

export default FormAddPreOrder
