
import React, { useEffect, useState, useContext} from 'react'
import { Button, Spinner } from "@/commons/components"
import * as Layouts from '@/commons/layouts';
import { Link } from "react-router";
import { useParams } from "@/commons/hooks/useParams"
import { HeaderContext } from "@/commons/components"
import { useNavigate } from "react-router";
import { useAuth } from '@/commons/auth';
import ProdukTable from "../components/ProdukTable";
import getListProdukEksklusif from '../services/getListProdukEksklusif'

const TableProdukEksklusifPage = props => {
  const { checkPermission } = useAuth();
  const [isLoading, setIsLoading] = useState({
	tableProdukEksklusif: false,

  });
  const { setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle("Table Produk Eksklusif Page")
  }, []);


const [listProdukEksklusif, setListProdukEksklusif] = useState()

useEffect(() => {
		
		const fetchData = async () => {
			try {
				setIsLoading(prev => ({...prev, tableProdukEksklusif: true}))
				const { data: listProdukEksklusif } = await getListProdukEksklusif()
				setListProdukEksklusif(listProdukEksklusif.data)
			} finally {
				setIsLoading(prev => ({...prev, tableProdukEksklusif: false}))
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
	title={"Table Produk Eksklusif"}
	singularName={"Produk"}
	items={[listProdukEksklusif]}
	isLoading={isLoading.tableProdukEksklusif}
>
	<ProdukTable
		listProdukEksklusif={listProdukEksklusif}
		
	/>
</Layouts.ListContainerTableLayout>

	</Layouts.ViewContainerLayout>
  )
}
export default TableProdukEksklusifPage

