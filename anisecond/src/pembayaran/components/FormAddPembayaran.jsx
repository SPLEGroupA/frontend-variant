
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
import savePembayaran from '../services/savePembayaran'
import { notifyError, notifySuccess} from "@/commons/utils/toaster";
import * as Layouts from "@/commons/layouts";

const FormAddPembayaran = ({ 
	pesananOptions
 }) => {
  	const [showErrorModal, setShowErrorModal] = React.useState(false);
  const { 
    control, 
    handleSubmit,
  } = useForm()
  
  
  
  
  const navigate = useNavigate()
  
  const submit = (data) => {
    const cleanData = cleanFormData(data)
    savePembayaran({
      ...cleanData,
    })
    .then(({ data: { data } }) => {
      navigate(`/pembayaran`)
  	notifySuccess(`Save Pembayaran berhasil!`);
    })
    .catch((error) => {
      console.error(error);
          setShowErrorModal(true);
    });
  }
  
  
  return (
	<div>
	  <Layouts.FormComponentLayout
		  title="Add Pembayaran" 
		  onSubmit={handleSubmit(submit)}
	
	    vas={[
		  ]}
	
		  formFields={[
	
	      <Controller
	        key="metode"
	        name="metode"
	        control={control}
	        rules={{ required: "Harap masukkan metode" }} 
	        render={({ field, fieldState }) => (
	        <InputField
	          label="Metode"
	          placeholder="Masukkan metode"
	          fieldState={fieldState}
	          {...field}
	          isRequired={true}
	        />
	        )}
	      />
	
	,
	      <Controller
	        key="jumlah"
	        name="jumlah"
	        control={control}
	        rules={{ required: "Harap masukkan jumlah" }} 
	        render={({ field, fieldState }) => (
	        <InputField
	          label="Jumlah"
	          placeholder="Masukkan jumlah"
	          fieldState={fieldState}
	          {...field}
	          isRequired={true}
	        />
	        )}
	      />
	
		  ,
	
	
	      <Controller
	        key="id_pesanan"
	        name="id_pesanan"
	        control={control}
	        render={({ field, fieldState }) => (
	        <SelectionField
	          
	          label="Pesanan"
	          options={pesananOptions}
	          optionKey="id_pesanan"
	          optionLabel="invalid"
	          placeholder="Masukkan pesanan"
	          fieldState={fieldState}
	          {...field}
	          isRequired={false}
	        />
	        )}
	      />
		  ]}
	
		  itemsEvents={[
		    <Button id="_TKA_PY_ADD_s" key="Submit" type="submit" variant="primary">Submit</Button>
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

export default FormAddPembayaran
