
import React, { useEffect, useState, useContext} from 'react'
import { Button, Spinner } from "@/commons/components"
import * as Layouts from '@/commons/layouts';
import { Link } from "react-router";
import { useParams } from "@/commons/hooks/useParams"
import { HeaderContext } from "@/commons/components"
import { useNavigate } from "react-router";
import { useAuth } from '@/commons/auth';
import PembayaranTable from "../components/PembayaranTable";
import getListPembayaran from '../services/getListPembayaran'

const TablePembayaranPage = props => {
  const { checkPermission } = useAuth();
  const [isLoading, setIsLoading] = useState({
	tablePembayaran: false,

  });
  const { setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle("Table Pembayaran Page")
  }, []);


const [listPembayaran, setListPembayaran] = useState()


useEffect(() => {
		
		const fetchData = async () => {
			try {
				setIsLoading(prev => ({...prev, tablePembayaran: true}))
				const { data: listPembayaran } = await getListPembayaran()
				setListPembayaran(listPembayaran.data)
			} finally {
				setIsLoading(prev => ({...prev, tablePembayaran: false}))
			}
		}
		fetchData()
  	}, [])

  return (
	<Layouts.ViewContainerLayout
		buttons={
			<>
			<Layouts.ViewContainerButtonLayout>
			  	<Link to={`/pembayaran/add
			  	`}>
			  		<Button id="_TKA_PY_TBL_add" className="p-2" variant="primary">
			  		  Add Pembayaran
			  		</Button>
			  	</Link>
			
			  </Layouts.ViewContainerButtonLayout>
			</>
		}
	>
<Layouts.ListContainerTableLayout
	title={"Table Pembayaran"}
	singularName={"Pembayaran"}
	items={[listPembayaran]}
	isLoading={isLoading.tablePembayaran}
>
	<PembayaranTable
		listPembayaran={listPembayaran}
		
	/>
</Layouts.ListContainerTableLayout>

	</Layouts.ViewContainerLayout>
  )
}
export default TablePembayaranPage

