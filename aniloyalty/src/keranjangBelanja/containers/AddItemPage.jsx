
import React, { useEffect, useState, useContext} from 'react'
import { Button, Spinner } from "@/commons/components"
import * as Layouts from '@/commons/layouts';
import { Link } from "react-router";
import { useParams } from "@/commons/hooks/useParams"
import { HeaderContext } from "@/commons/components"
import { useSearchParams } from "react-router";
import FormAddCartItem from '../components/FormAddCartItem'
import getProdukOptions from '../services/getProdukOptions'

const AddItemPage = props => {
  const [isLoading, setIsLoading] = useState({
	addCartItem: false,

  });
  const { setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle("Add Item Page")
  }, []);


const [produkOptions, setProdukOptions] = useState()

  useEffect(() => {
    const fetch = async () => {
	  setIsLoading(prev => ({...prev, addCartItem: true}))
      const { data: produkOptionsResponse } = await getProdukOptions({  })

	  setProdukOptions(produkOptionsResponse.data)
	  setIsLoading(prev => ({...prev, addCartItem: false}))
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
		singularName={"CartItem"}
		isLoading={isLoading.addCartItem}
	>
		{produkOptions ? 
		(<>
		 <FormAddCartItem
			{...{ 
				produkOptions
				}}
		 /> 
		</>)  : (<></>)}
	</Layouts.FormContainerLayout>

	</Layouts.ViewContainerLayout>
  )
}
export default AddItemPage

