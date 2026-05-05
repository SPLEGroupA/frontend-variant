
import React, { useEffect, useState, useContext} from 'react'
import { Button, Spinner } from "@/commons/components"
import * as Layouts from '@/commons/layouts';
import { Link } from "react-router";
import { useParams } from "@/commons/hooks/useParams"
import { HeaderContext } from "@/commons/components"
import { useNavigate } from "react-router";
import { useAuth } from '@/commons/auth';
import CartItemTable from "../components/CartItemTable";
import getListCartItem from '../services/getListCartItem'

import checkout from '../services/checkout'

const KeranjangPage = props => {
  const { checkPermission } = useAuth();
  const [isLoading, setIsLoading] = useState({
	tableCartItem: false,

  });
  const { setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle("Keranjang Page")
  }, []);


const [listCartItem, setListCartItem] = useState()


const navigate = useNavigate();
const checkout = async () => {    
	await checkout();
	navigate('invalid');
}
useEffect(() => {
		
		const fetchData = async () => {
			try {
				setIsLoading(prev => ({...prev, tableCartItem: true}))
				const { data: listCartItem } = await getListCartItem()
				setListCartItem(listCartItem.data)
			} finally {
				setIsLoading(prev => ({...prev, tableCartItem: false}))
			}
		}
		fetchData()
  	}, [])

  return (
	<Layouts.ViewContainerLayout
		buttons={
			<>
			<Layouts.ViewContainerButtonLayout>
			  	<Link to={`/keranjang/add
			  	`}>
			  		<Button id="_TKA_KB_TBL_add" className="p-2" variant="primary">
			  		  Add Item
			  		</Button>
			  	</Link>
			  	<Button id="_TKA_KB_TBL_co" className="mt-2 sm:mt-0" variant="primary" onClick={checkout}>Checkout</Button>
			
			  </Layouts.ViewContainerButtonLayout>
			</>
		}
	>
<Layouts.ListContainerTableLayout
	title={"Table CartItem"}
	singularName={"CartItem"}
	items={[listCartItem]}
	isLoading={isLoading.tableCartItem}
>
	<CartItemTable
		listCartItem={listCartItem}
		
	/>
</Layouts.ListContainerTableLayout>

	</Layouts.ViewContainerLayout>
  )
}
export default KeranjangPage

