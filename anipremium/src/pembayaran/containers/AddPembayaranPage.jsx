
import React, { useEffect, useState, useContext} from 'react'
import { Button, Spinner } from "@/commons/components"
import * as Layouts from '@/commons/layouts';
import { Link } from "react-router";
import { useParams } from "@/commons/hooks/useParams"
import { HeaderContext } from "@/commons/components"
import { useSearchParams } from "react-router";
import FormAddPembayaran from '../components/FormAddPembayaran'
import getPesananOptions from '../services/getPesananOptions'

const AddPembayaranPage = props => {
  const [isLoading, setIsLoading] = useState({
	addPembayaran: false,

  });
  const { setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle("Add Pembayaran Page")
  }, []);


const [pesananOptions, setPesananOptions] = useState()

  useEffect(() => {
    const fetch = async () => {
	  setIsLoading(prev => ({...prev, addPembayaran: true}))
      const { data: pesananOptionsResponse } = await getPesananOptions({  })

	  setPesananOptions(pesananOptionsResponse.data)
	  setIsLoading(prev => ({...prev, addPembayaran: false}))
    }
	fetch()
  }, [])

  return (
	<Layouts.ViewContainerLayout
		buttons={
			<>
			<></>
			</>
		}
	>
<Layouts.FormContainerLayout
		singularName={"Pembayaran"}
		isLoading={isLoading.addPembayaran}
	>
		{pesananOptions ? 
		(<>
		 <FormAddPembayaran
			{...{ 
				pesananOptions
				}}
		 /> 
		</>)  : (<></>)}
	</Layouts.FormContainerLayout>

	</Layouts.ViewContainerLayout>
  )
}
export default AddPembayaranPage

