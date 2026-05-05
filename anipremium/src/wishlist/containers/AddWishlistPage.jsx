
import React, { useEffect, useState, useContext} from 'react'
import { Button, Spinner } from "@/commons/components"
import * as Layouts from '@/commons/layouts';
import { Link } from "react-router";
import { useParams } from "@/commons/hooks/useParams"
import { HeaderContext } from "@/commons/components"
import { useSearchParams } from "react-router";
import AddedFormAddWishlist from '../components/AddedFormAddWishlist'
import getProdukOptions from '../services/getProdukOptions'

const AddWishlistPage = props => {
  const [isLoading, setIsLoading] = useState({
	addWishlist: false,

  });
  const { setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle("Add Wishlist Page")
  }, []);


const [produkOptions, setProdukOptions] = useState()

  useEffect(() => {
    const fetch = async () => {
	  setIsLoading(prev => ({...prev, addWishlist: true}))
      const { data: produkOptionsResponse } = await getProdukOptions({  })

	  setProdukOptions(produkOptionsResponse.data)
	  setIsLoading(prev => ({...prev, addWishlist: false}))
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
		singularName={"Wishlist"}
		isLoading={isLoading.addWishlist}
	>
		{produkOptions ? 
		(<>
		 <AddedFormAddWishlist
			{...{ 
				produkOptions
				}}
		 /> 
		</>)  : (<></>)}
	</Layouts.FormContainerLayout>

	</Layouts.ViewContainerLayout>
  )
}
export default AddWishlistPage

