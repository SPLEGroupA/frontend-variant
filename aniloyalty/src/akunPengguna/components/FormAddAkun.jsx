
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
import saveAkun from '../services/saveAkun'
import { notifyError, notifySuccess} from "@/commons/utils/toaster";
import * as Layouts from "@/commons/layouts";

const FormAddAkun = ({ 
 }) => {
  	const [showErrorModal, setShowErrorModal] = React.useState(false);
  const { 
    control, 
    handleSubmit,
  } = useForm()
  
  
  
  
  const navigate = useNavigate()
  
  const submit = (data) => {
    const cleanData = cleanFormData(data)
    saveAkun({
      ...cleanData,
    })
    .then(({ data: { data } }) => {
      navigate(`/akun`)
  	notifySuccess(`Save Akun berhasil!`);
    })
    .catch((error) => {
      console.error(error);
          setShowErrorModal(true);
    });
  }
  
  
  return (
	<div>
	  <Layouts.FormComponentLayout
		  title="Add Akun" 
		  onSubmit={handleSubmit(submit)}
	
	    vas={[
		  ]}
	
		  formFields={[
	
	      <Controller
	        key="email"
	        name="email"
	        control={control}
	        rules={{ required: "Harap masukkan email" }} 
	        render={({ field, fieldState }) => (
	        <InputField
	          label="Email"
	          placeholder="Masukkan email"
	          fieldState={fieldState}
	          {...field}
	          isRequired={true}
	        />
	        )}
	      />
	
	,
	      <Controller
	        key="nama"
	        name="nama"
	        control={control}
	        rules={{ required: "Harap masukkan nama" }} 
	        render={({ field, fieldState }) => (
	        <InputField
	          label="Nama"
	          placeholder="Masukkan nama"
	          fieldState={fieldState}
	          {...field}
	          isRequired={true}
	        />
	        )}
	      />
	
	,
	      <Controller
	        key="alamat"
	        name="alamat"
	        control={control}
	        render={({ field, fieldState }) => (
	        <InputField
	          label="Alamat"
	          placeholder="Masukkan alamat"
	          fieldState={fieldState}
	          {...field}
	          isRequired={false}
	        />
	        )}
	      />
	
	,
	      <Controller
	        key="no_telepon"
	        name="no_telepon"
	        control={control}
	        render={({ field, fieldState }) => (
	        <InputField
	          label="No Telepon"
	          placeholder="Masukkan no telepon"
	          fieldState={fieldState}
	          {...field}
	          isRequired={false}
	        />
	        )}
	      />
	
		  ,
	
		  ]}
	
		  itemsEvents={[
		    <Button id="_TKA_AP_ADD_s" key="Submit" type="submit" variant="primary">Submit</Button>
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

export default FormAddAkun
