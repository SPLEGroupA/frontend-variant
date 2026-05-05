
import React, { useEffect, useState, useContext} from 'react'
import { Button, Spinner } from "@/commons/components"
import * as Layouts from '@/commons/layouts';
import { Link } from "react-router";
import { useParams } from "@/commons/hooks/useParams"
import { HeaderContext } from "@/commons/components"
import { useNavigate } from "react-router";
import { useAuth } from '@/commons/auth';
import PesananTable from "../components/PesananTable";
import getListPesanan from '../services/getListPesanan'

const TablePesananPage = props => {
  const { checkPermission } = useAuth();
  const [isLoading, setIsLoading] = useState({
	tablePesanan: false,

  });
  const { setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle("Table Pesanan Page")
  }, []);


const [listPesanan, setListPesanan] = useState()

useEffect(() => {
		
		const fetchData = async () => {
			try {
				setIsLoading(prev => ({...prev, tablePesanan: true}))
				const { data: listPesanan } = await getListPesanan()
				setListPesanan(listPesanan.data)
			} finally {
				setIsLoading(prev => ({...prev, tablePesanan: false}))
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
	title={"Table Pesanan"}
	singularName={"Pesanan"}
	items={[listPesanan]}
	isLoading={isLoading.tablePesanan}
>
	<PesananTable
		listPesanan={listPesanan}
		
	/>
</Layouts.ListContainerTableLayout>

	</Layouts.ViewContainerLayout>
  )
}
export default TablePesananPage

