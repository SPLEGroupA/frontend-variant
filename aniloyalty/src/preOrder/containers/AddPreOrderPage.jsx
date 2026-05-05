
import React, { useEffect, useState, useContext} from 'react'
import { Button, Spinner } from "@/commons/components"
import * as Layouts from '@/commons/layouts';
import { Link } from "react-router";
import { useParams } from "@/commons/hooks/useParams"
import { HeaderContext } from "@/commons/components"
import { useSearchParams } from "react-router";
import FormAddPreOrder from '../components/FormAddPreOrder'
import getProdukOptions from '../services/getProdukOptions'

const AddPreOrderPage = props => {
  const [isLoading, setIsLoading] = useState({
	addPreOrder: false,

  });
  const { setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle("Add PreOrder Page")
  }, []);


const [produkOptions, setProdukOptions] = useState()

  useEffect(() => {
    const fetch = async () => {
	  setIsLoading(prev => ({...prev, addPreOrder: true}))
      const { data: produkOptionsResponse } = await getProdukOptions({  })

	  setProdukOptions(produkOptionsResponse.data)
	  setIsLoading(prev => ({...prev, addPreOrder: false}))
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
		singularName={"PreOrder"}
		isLoading={isLoading.addPreOrder}
	>
		{produkOptions ? 
		(<>
		 <FormAddPreOrder
			{...{ 
				produkOptions
				}}
		 /> 
		</>)  : (<></>)}
	</Layouts.FormContainerLayout>

	</Layouts.ViewContainerLayout>
  )
}
export default AddPreOrderPage

