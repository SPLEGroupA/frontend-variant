
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
import getAkunData from '../services/getAkunData'

import updateAkun from '../services/updateAkun'
import deleteAkun from '../services/deleteAkun'
import * as Layouts from "@/commons/layouts";	
const AkunTable = ({ listAkun,
		 
		 

	}) => {
  const { checkPermission } = useAuth();
  const [selectedUpdateAkun, setSelectedUpdateAkun] = React.useState(null);
  const [selectedKonfirmasiHapusAkun, setSelectedKonfirmasiHapusAkun] = React.useState(null);
  const [showModalUpdateAkun, setShowModalUpdateAkun] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [akunData, setAkunData] = React.useState()
  const formatCurrency = (amount) => {
  	return new Intl.NumberFormat("id-ID", {
  	style: "currency",
  	currency: "IDR",
  	}).format(amount);
  };
  const { 
    control, 
    handleSubmit,
    reset
  } = useForm({ defaultValues: akunData })
  
  
  
  
  
  
  
  
  const submit = (data) => {
    const cleanData = cleanFormData(data)
    updateAkun({
      ...cleanData,
    })
    .then(({ data: { data } }) => {
     navigate(`/akun`)
  	notifySuccess(`Update Akun berhasil!`);
  	setShowModalUpdateAkun(false)
  	setTimeout(() => {
        window.location.reload();
      }, 500);
    })
    .catch((error) => {
      console.error(error);
          notifyError(error);
    });
  }
  
  React.useEffect(() => {
  if( showModalUpdateAkun && selectedUpdateAkun){
  	const fetchData = async () => {
  		try {
  			setIsLoading(prev => ({...prev, updateAkun: true}))
  			const { data: akunData } = await getAkunData({ 
  id_akun :  selectedUpdateAkun?.id_akun
  })
  			setAkunData(akunData.data)
  				reset(akunData.data)
  		} finally {
  			setIsLoading(prev => ({...prev, updateAkun: false}))
  		}
  	}
  	fetchData();
  }
  }, [showModalUpdateAkun,selectedUpdateAkun]);
  const [showModalKonfirmasiHapusAkun, setShowModalKonfirmasiHapusAkun] = React.useState(false);
  
  const hapus = async (selectedKonfirmasiHapusAkun) => {
      await deleteAkun({
      });
  		window.location.reload()
    }
  
  return (
  <>
    <Layouts.ListComponentTableLayout
  	  items={[listAkun]}
  	  itemsAttrs={[
          {
            id: "idAkun",
            condition: "",
            label: "Id Akun",
            featureName: "id_akun",
            editable: false
          }
  ,        {
            id: "email",
            condition: "",
            label: "Email",
            featureName: "email",
            editable: false
          }
  ,        {
            id: "nama",
            condition: "",
            label: "Nama",
            featureName: "nama",
            editable: false
          }
  ,        {
            id: "alamat",
            condition: "",
            label: "Alamat",
            featureName: "alamat",
            editable: false
          }
  ,        {
            id: "noTelepon",
            condition: "",
            label: "No Telepon",
            featureName: "no_telepon",
            editable: false
          }
  ]}
        itemsEvents={(akunItem) => [
          <Link to=''>
            <Button
              id="_TKA_AP_TBL_lst_upd"
              size="sm"
              variant=
                          "secondary"
              onClick={() => {
                setSelectedUpdateAkun(akunItem);
                setShowModalUpdateAkun(true);
              }}
            >
              Update
            </Button>
          </Link>
  ,
          <Link to=''>
    <Button
      id="_TKA_AP_TBL_lst_del"
      size="sm"
      variant=
                  "secondary"
      onClick={() => {
        setSelectedKonfirmasiHapusAkun(akunItem);
        setShowModalKonfirmasiHapusAkun(true);
      }}
    >
      Delete
    </Button>
  </Link>
        ]}
  	/>
  		<Modal
  		isShow={showModalUpdateAkun}
  		title={"Update Akun"}
  		>
  		{ 
  		    isLoading.updateAkun  ? (
  		    <div className="flex justify-center items-center h-full">
  		      <Spinner />
  		    </div>
  		  ) : (
  		 	 <>
  			  {akunData && (
  				 <div className="grid grid-cols-1  gap-6">
  				  <Layouts.FormModalLayout
  					  onSubmit={handleSubmit(submit)}
  				
  				    vas={[
  					  ]}
  				
  					  formFields={[
  					    
  					          <Controller
  					            key="email"
  					            name="email"
  					            control={control}
  					            render={({ field, fieldState }) => (
  					            <InputField
  					              label="Email"
  					              placeholder="Masukkan email"
  					              defaultValue={akunData.email}
  					              fieldState={fieldState}
  					              {...field}
  					              isRequired={false}
  					            />
  					            )}
  					          />
  					    
  				,
  					    
  				      <Controller
  				        key="nama"
  				        name="nama"
  				        control={control}
  				        render={({ field, fieldState }) => (
  				        <InputField
  				          label="Nama"
  				          placeholder="Masukkan nama"
  				          defaultValue={akunData.nama}
  				          fieldState={fieldState}
  				          {...field}
  				          isRequired={false}
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
  				          defaultValue={akunData.alamat}
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
  				          defaultValue={akunData.no_telepon}
  				          fieldState={fieldState}
  				          {...field}
  				          isRequired={false}
  				        />
  				        )}
  				      />
  				
  					  ,
  				
  					  ]}
  				
  					  itemsEvents={[
  					    <Button id="_TKA_AP_TBL_uf_s" key="Submit" type="submit" variant="primary">Submit</Button>
  				,
  					  <Link className={`w-full`}  to=''><Button id="batal" className={`w-full`} variant="tertiary" onClick={() => setShowModalUpdateAkun(false)}>Batal</Button></Link>
  				    ]}
  				  />
  		    	</div>
  				)}
  			 </>
  		  )
  		}
  		
  		
  		</Modal>,
  		<Modal
  		isShow={showModalKonfirmasiHapusAkun}
  		title={"Konfirmasi Hapus Akun"}
  		text={"Are you sure want to proceed?"}
  		>
  		
  				<Link to=''><Button id="batal" className={`w-full`} variant="tertiary" onClick={() => setShowModalKonfirmasiHapusAkun(false)}>Batal</Button></Link>
  		
  		<Button
  		  id="_TKA_AP_TBL_dw_ev"
  		  variant="primary"
  		  onClick={() => hapus(selectedKonfirmasiHapusAkun)}
  		>
  		  Hapus
  		</Button>
  		</Modal>,
  </>
  )
};

export default AkunTable;
