
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
import { notifyError, notifySuccess} from "@/commons/utils/toaster";
import * as Layouts from "@/commons/layouts";

const ModifiedFormAddProdukPreOwned = ({ 
 }) => {
  const { 
    control, 
    handleSubmit,
  } = useForm()
  
  
  
  
  const navigate = useNavigate()
  
  return (
	<div>
	  <Layouts.FormComponentLayout
		  title="Add Produk PreOwned" 
		  onSubmit={handleSubmit()}
	
	    vas={[
		  ]}
	
		  formFields={[
	
	      <Controller
	        key="kondisi"
	        name="kondisi"
	        control={control}
	        render={({ field, fieldState }) => (
	        <InputField
	          label="Kondisi"
	          placeholder="Masukkan kondisi"
	          fieldState={fieldState}
	          {...field}
	          isRequired={false}
	        />
	        )}
	      />
	
		  ,
	
		  ]}
	
		  itemsEvents={[
	    ]}
	  />
	    
	</div>
  )
}

export default ModifiedFormAddProdukPreOwned
