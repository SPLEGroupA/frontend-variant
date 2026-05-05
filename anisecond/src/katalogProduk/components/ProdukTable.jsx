
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
import getProdukData from '../services/getProdukData'

import deleteProduk from '../services/deleteProduk'
import updateProduk from '../services/updateProduk'
import * as Layouts from "@/commons/layouts";	
const ProdukTable = ({ listProduk,
		 
		 

	}) => {
  const { checkPermission } = useAuth();
  const [selectedUpdateProduk, setSelectedUpdateProduk] = React.useState(null);
  const [selectedKonfirmasiHapusProduk, setSelectedKonfirmasiHapusProduk] = React.useState(null);
  const [showModalUpdateProduk, setShowModalUpdateProduk] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [produkData, setProdukData] = React.useState()
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
  } = useForm({ defaultValues: produkData })
  
  
  
  
  
  
  
  
  const submit = (data) => {
    const cleanData = cleanFormData(data)
    updateProduk({
      ...cleanData,
    })
    .then(({ data: { data } }) => {
     navigate(`/produk`)
  	notifySuccess(`Update Produk berhasil!`);
  	setShowModalUpdateProduk(false)
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
  if( showModalUpdateProduk && selectedUpdateProduk){
  	const fetchData = async () => {
  		try {
  			setIsLoading(prev => ({...prev, updateProduk: true}))
  			const { data: produkData } = await getProdukData({ 
  id_produk :  selectedUpdateProduk?.id_produk
  })
  			setProdukData(produkData.data)
  				reset(produkData.data)
  		} finally {
  			setIsLoading(prev => ({...prev, updateProduk: false}))
  		}
  	}
  	fetchData();
  }
  }, [showModalUpdateProduk,selectedUpdateProduk]);
  const [showModalKonfirmasiHapusProduk, setShowModalKonfirmasiHapusProduk] = React.useState(false);
  
  const hapus = async (selectedKonfirmasiHapusProduk) => {
      await deleteProduk({
      });
  		window.location.reload()
    }
  
  return (
  <>
    <Layouts.ListComponentTableLayout
  	  items={[listProduk]}
  	  itemsAttrs={[
          {
            id: "idProduk",
            condition: "",
            label: "Id Produk",
            featureName: "id_produk",
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
            id: "harga",
            condition: "isCurrency",
            label: "Harga",
            featureName: "harga",
            editable: false
          }
  ,        {
            id: "kategori",
            condition: "",
            label: "Kategori",
            featureName: "kategori",
            editable: false
          }
  ,        {
            id: "stok",
            condition: "",
            label: "Stok",
            featureName: "stok",
            editable: false
          }
  ]}
        itemsEvents={(produkItem) => [
          <Link to=''>
            <Button
              id="_TKA_KP_TBL_lst_upd"
              size="sm"
              variant=
                          "secondary"
              onClick={() => {
                setSelectedUpdateProduk(produkItem);
                setShowModalUpdateProduk(true);
              }}
            >
              Update
            </Button>
          </Link>
  ,
          <Link to=''>
    <Button
      id="_TKA_KP_TBL_lst_del"
      size="sm"
      variant=
                  "secondary"
      onClick={() => {
        setSelectedKonfirmasiHapusProduk(produkItem);
        setShowModalKonfirmasiHapusProduk(true);
      }}
    >
      Delete
    </Button>
  </Link>
        ]}
  	/>
  		<Modal
  		isShow={showModalUpdateProduk}
  		title={"Update Produk"}
  		>
  		{ 
  		    isLoading.updateProduk  ? (
  		    <div className="flex justify-center items-center h-full">
  		      <Spinner />
  		    </div>
  		  ) : (
  		 	 <>
  			  {produkData && (
  				 <div className="grid grid-cols-1  gap-6">
  				  <Layouts.FormModalLayout
  					  onSubmit={handleSubmit(submit)}
  				
  				    vas={[
  					  ]}
  				
  					  formFields={[
  					    
  					          <Controller
  					            key="nama"
  					            name="nama"
  					            control={control}
  					            render={({ field, fieldState }) => (
  					            <InputField
  					              label="Nama"
  					              placeholder="Masukkan nama"
  					              defaultValue={produkData.nama}
  					              fieldState={fieldState}
  					              {...field}
  					              isRequired={false}
  					            />
  					            )}
  					          />
  					    
  				,
  					    
  				      <Controller
  				        key="harga"
  				        name="harga"
  				        control={control}
  				        render={({ field, fieldState }) => (
  				        <InputField
  				          label="Harga"
  				          placeholder="Masukkan harga"
  				          defaultValue={produkData.harga}
  				          fieldState={fieldState}
  				          {...field}
  				          isRequired={false}
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
  				          defaultValue={produkData.kategori}
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
  				          defaultValue={produkData.deskripsi}
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
  				          defaultValue={produkData.stok}
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
  				          defaultValue={produkData.gambar_url}
  				          fieldState={fieldState}
  				          {...field}
  				          isRequired={false}
  				        />
  				        )}
  				      />
  				
  					  ,
  				
  					  ]}
  				
  					  itemsEvents={[
  					    <Button id="_TKA_KP_TBL_uf_s" key="Submit" type="submit" variant="primary">Submit</Button>
  				,
  					  <Link className={`w-full`}  to=''><Button id="batal" className={`w-full`} variant="tertiary" onClick={() => setShowModalUpdateProduk(false)}>Batal</Button></Link>
  				    ]}
  				  />
  		    	</div>
  				)}
  			 </>
  		  )
  		}
  		
  		
  		</Modal>,
  		<Modal
  		isShow={showModalKonfirmasiHapusProduk}
  		title={"Konfirmasi Hapus Produk"}
  		text={"Are you sure want to proceed?"}
  		>
  		
  				<Link to=''><Button id="batal" className={`w-full`} variant="tertiary" onClick={() => setShowModalKonfirmasiHapusProduk(false)}>Batal</Button></Link>
  		
  		<Button
  		  id="_TKA_KP_TBL_dw_ev"
  		  variant="primary"
  		  onClick={() => hapus(selectedKonfirmasiHapusProduk)}
  		>
  		  Hapus
  		</Button>
  		</Modal>,
  </>
  )
};

export default ProdukTable;
