
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
import addReview from '../services/addReview'
import { notifyError, notifySuccess} from "@/commons/utils/toaster";
import * as Layouts from "@/commons/layouts";

const AddedFormAddReview = ({ 
 }) => {
  const { 
    control, 
    handleSubmit,
  } = useForm({ defaultValues:  })
  
  
  
  
  const navigate = useNavigate()
  
  const submit = (data) => {
    const cleanData = cleanFormData(data)
    addReview({
      ...cleanData,
    })
    .then(({ data: { data } }) => {
     navigate(`null`)
  	notifySuccess(`Add Review berhasil!`);
    })
    .catch((error) => {
      console.error(error);
          notifyError(error);
    });
  }
  
  
  return (
	<div>
	  <Layouts.FormComponentLayout
		  title="Add Review" 
		  onSubmit={handleSubmit(submit)}
	
	    vas={[
		  ]}
	
		  formFields={[
	
	      <Controller
	        key="rating"
	        name="rating"
	        control={control}
	        render={({ field, fieldState }) => (
	        <InputField
	          label="Rating"
	          placeholder="Masukkan rating"
	          defaultValue={.rating}
	          fieldState={fieldState}
	          {...field}
	          isRequired={false}
	        />
	        )}
	      />
	
	,
	      <Controller
	        key="komentar"
	        name="komentar"
	        control={control}
	        render={({ field, fieldState }) => (
	        <InputField
	          label="Komentar"
	          placeholder="Masukkan komentar"
	          defaultValue={.komentar}
	          fieldState={fieldState}
	          {...field}
	          isRequired={false}
	        />
	        )}
	      />
	
		  ,
	
		  ]}
	
		  itemsEvents={[
		    <Button id="_TKA_DE_RR_ADD_s" key="Submit" type="submit" variant="primary">Submit</Button>
	    ]}
	  />
	    
	</div>
  )
}

export default AddedFormAddReview
