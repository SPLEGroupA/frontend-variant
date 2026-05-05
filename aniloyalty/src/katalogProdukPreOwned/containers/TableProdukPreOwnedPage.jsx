
import React, { useEffect, useState, useContext} from 'react'
import { Button, Spinner } from "@/commons/components"
import * as Layouts from '@/commons/layouts';
import { Link } from "react-router";
import { useParams } from "@/commons/hooks/useParams"
import { HeaderContext } from "@/commons/components"
import { useNavigate } from "react-router";
import { useAuth } from '@/commons/auth';
import ProdukTable from "../components/ProdukTable";
import getListProdukPreOwned from '../services/getListProdukPreOwned'

const TableProdukPreOwnedPage = props => {
  const { checkPermission } = useAuth();
  const [isLoading, setIsLoading] = useState({
	tableProdukPreOwned: false,

  });
  const { setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle("Table Produk PreOwned Page")
  }, []);


const [listProdukPreOwned, setListProdukPreOwned] = useState()

useEffect(() => {
		
		const fetchData = async () => {
			try {
				setIsLoading(prev => ({...prev, tableProdukPreOwned: true}))
				const { data: listProdukPreOwned } = await getListProdukPreOwned()
				setListProdukPreOwned(listProdukPreOwned.data)
			} finally {
				setIsLoading(prev => ({...prev, tableProdukPreOwned: false}))
			}
		}
		fetchData()
  	}, [])

  return (
	<Layouts.ViewContainerLayout
		buttons={
			<>
			<></>
			</>
		}
	>
<Layouts.ListContainerTableLayout
	title={"Table Produk PreOwned"}
	singularName={"Produk"}
	items={[listProdukPreOwned]}
	isLoading={isLoading.tableProdukPreOwned}
>
	<ProdukTable
		listProdukPreOwned={listProdukPreOwned}
		
	/>
</Layouts.ListContainerTableLayout>

	</Layouts.ViewContainerLayout>
  )
}
export default TableProdukPreOwnedPage

