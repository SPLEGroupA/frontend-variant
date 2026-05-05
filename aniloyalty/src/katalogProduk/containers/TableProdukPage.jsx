
import React, { useEffect, useState, useContext} from 'react'
import { Button, Spinner } from "@/commons/components"
import * as Layouts from '@/commons/layouts';
import { Link } from "react-router";
import { useParams } from "@/commons/hooks/useParams"
import { HeaderContext } from "@/commons/components"
import { useNavigate } from "react-router";
import { useAuth } from '@/commons/auth';
import ProdukTable from "../components/ProdukTable";
import getListProduk from '../services/getListProduk'

const TableProdukPage = props => {
  const { checkPermission } = useAuth();
  const [isLoading, setIsLoading] = useState({
	tableProduk: false,

  });
  const { setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle("Table Produk Page")
  }, []);


const [listProduk, setListProduk] = useState()


useEffect(() => {
		
		const fetchData = async () => {
			try {
				setIsLoading(prev => ({...prev, tableProduk: true}))
				const { data: listProduk } = await getListProduk()
				setListProduk(listProduk.data)
			} finally {
				setIsLoading(prev => ({...prev, tableProduk: false}))
			}
		}
		fetchData()
  	}, [])

  return (
	<Layouts.ViewContainerLayout
		buttons={
			<>
			<Layouts.ViewContainerButtonLayout>
			  	<Link to={`/produk/add
			  	`}>
			  		<Button id="_TKA_KP_TBL_add" className="p-2" variant="primary">
			  		  Add Produk
			  		</Button>
			  	</Link>
			
			  </Layouts.ViewContainerButtonLayout>
			</>
		}
	>
<Layouts.ListContainerTableLayout
	title={"Table Produk"}
	singularName={"Produk"}
	items={[listProduk]}
	isLoading={isLoading.tableProduk}
>
	<ProdukTable
		listProduk={listProduk}
		
	/>
</Layouts.ListContainerTableLayout>

	</Layouts.ViewContainerLayout>
  )
}
export default TableProdukPage

