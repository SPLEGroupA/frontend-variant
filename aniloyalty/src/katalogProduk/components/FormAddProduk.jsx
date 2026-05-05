
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
import saveProduk from '../services/saveProduk'
import { notifyError, notifySuccess} from "@/commons/utils/toaster";
import * as Layouts from "@/commons/layouts";

const FormAddProduk = ({ 
 }) => {
  	const [showErrorModal, setShowErrorModal] = React.useState(false);
  const { 
    control, 
    handleSubmit,
  } = useForm()
  
  
  
  
  const navigate = useNavigate()
  
  const submit = (data) => {
    const cleanData = cleanFormData(data)
    saveProduk({
      ...cleanData,
    })
    .then(({ data: { data } }) => {
      navigate(`/produk`)
  	notifySuccess(`Save Produk berhasil!`);
    })
    .catch((error) => {
      console.error(error);
          setShowErrorModal(true);
    });
  }
  
  
  return (
	<div>
	  <Layouts.FormComponentLayout
		  title="Add Produk" 
		  onSubmit={handleSubmit(submit)}
	
	    vas={[
		  ]}
	
		  formFields={[
	
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
	        key="harga"
	        name="harga"
	        control={control}
	        rules={{ required: "Harap masukkan harga" }} 
	        render={({ field, fieldState }) => (
	        <InputField
	          label="Harga"
	          placeholder="Masukkan harga"
	          fieldState={fieldState}
	          {...field}
	          isRequired={true}
	        />
	        )}
	      />
	
	,
	      <Controller
	        key="kategori"
	        name="kategori"
	        control={control}
	        render={({ field, fieldState }) => (
	        <InputField
	          label="Kategori"
	          placeholder="Masukkan kategori"
	          fieldState={fieldState}
	          {...field}
	          isRequired={false}
	        />
	        )}
	      />
	
	,
	      <Controller
	        key="deskripsi"
	        name="deskripsi"
	        control={control}
	        render={({ field, fieldState }) => (
	        <InputField
	          label="Deskripsi"
	          placeholder="Masukkan deskripsi"
	          fieldState={fieldState}
	          {...field}
	          isRequired={false}
	        />
	        )}
	      />
	
	,
	      <Controller
	        key="stok"
	        name="stok"
	        control={control}
	        render={({ field, fieldState }) => (
	        <InputField
	          label="Stok"
	          placeholder="Masukkan stok"
	          fieldState={fieldState}
	          {...field}
	          isRequired={false}
	        />
	        )}
	      />
	
	,
	      <Controller
	        key="gambar_url"
	        name="gambar_url"
	        control={control}
	        render={({ field, fieldState }) => (
	        <InputField
	          label="Gambar URL"
	          placeholder="Masukkan gambar url"
	          fieldState={fieldState}
	          {...field}
	          isRequired={false}
	        />
	        )}
	      />
	
		  ,
	
		  ]}
	
		  itemsEvents={[
		    <Button id="_TKA_KP_ADD_s" key="Submit" type="submit" variant="primary">Submit</Button>
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

export default FormAddProduk
