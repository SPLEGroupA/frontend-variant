
import React, { useEffect, useState, useContext} from 'react'
import { Button, Spinner } from "@/commons/components"
import * as Layouts from '@/commons/layouts';
import { Link } from "react-router";
import { useParams } from "@/commons/hooks/useParams"
import { HeaderContext } from "@/commons/components"
import { useNavigate } from "react-router";
import { useAuth } from '@/commons/auth';
import AkunTable from "../components/AkunTable";
import getListAkun from '../services/getListAkun'

const TableAkunPage = props => {
  const { checkPermission } = useAuth();
  const [isLoading, setIsLoading] = useState({
	tableAkun: false,

  });
  const { setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle("Table Akun Page")
  }, []);


const [listAkun, setListAkun] = useState()


useEffect(() => {
		
		const fetchData = async () => {
			try {
				setIsLoading(prev => ({...prev, tableAkun: true}))
				const { data: listAkun } = await getListAkun()
				setListAkun(listAkun.data)
			} finally {
				setIsLoading(prev => ({...prev, tableAkun: false}))
			}
		}
		fetchData()
  	}, [])

  return (
	<Layouts.ViewContainerLayout
		buttons={
			<>
			<Layouts.ViewContainerButtonLayout>
			  	<Link to={`/akun/add
			  	`}>
			  		<Button id="_TKA_AP_TBL_add" className="p-2" variant="primary">
			  		  Add Akun
			  		</Button>
			  	</Link>
			
			  </Layouts.ViewContainerButtonLayout>
			</>
		}
	>
<Layouts.ListContainerTableLayout
	title={"Table Akun"}
	singularName={"Akun"}
	items={[listAkun]}
	isLoading={isLoading.tableAkun}
>
	<AkunTable
		listAkun={listAkun}
		
	/>
</Layouts.ListContainerTableLayout>

	</Layouts.ViewContainerLayout>
  )
}
export default TableAkunPage

