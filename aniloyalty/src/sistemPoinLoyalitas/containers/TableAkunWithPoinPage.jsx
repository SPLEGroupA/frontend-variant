
import React, { useEffect, useState, useContext} from 'react'
import { Button, Spinner } from "@/commons/components"
import * as Layouts from '@/commons/layouts';
import { Link } from "react-router";
import { useParams } from "@/commons/hooks/useParams"
import { HeaderContext } from "@/commons/components"
import { useNavigate } from "react-router";
import { useAuth } from '@/commons/auth';
import AkunTable from "../components/AkunTable";
import getListAkunWithPoin from '../services/getListAkunWithPoin'

const TableAkunWithPoinPage = props => {
  const { checkPermission } = useAuth();
  const [isLoading, setIsLoading] = useState({
	tableAkunWithPoin: false,

  });
  const { setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle("Table Akun With Poin Page")
  }, []);


const [listAkunWithPoin, setListAkunWithPoin] = useState()


useEffect(() => {
		
		const fetchData = async () => {
			try {
				setIsLoading(prev => ({...prev, tableAkunWithPoin: true}))
				const { data: listAkunWithPoin } = await getListAkunWithPoin()
				setListAkunWithPoin(listAkunWithPoin.data)
			} finally {
				setIsLoading(prev => ({...prev, tableAkunWithPoin: false}))
			}
		}
		fetchData()
  	}, [])

  return (
	<Layouts.ViewContainerLayout
		buttons={
			<>
			<Layouts.ViewContainerButtonLayout>
			  	<Link to={`/akun-poin/redeem
			  	`}>
			  		<Button id="_TKA_DE_SP_TBL_red" className="p-2" variant="primary">
			  		  Redeem Poin
			  		</Button>
			  	</Link>
			
			  </Layouts.ViewContainerButtonLayout>
			</>
		}
	>
<Layouts.ListContainerTableLayout
	title={"Table Akun With Poin"}
	singularName={"Akun"}
	items={[listAkunWithPoin]}
	isLoading={isLoading.tableAkunWithPoin}
>
	<AkunTable
		listAkunWithPoin={listAkunWithPoin}
		
	/>
</Layouts.ListContainerTableLayout>

	</Layouts.ViewContainerLayout>
  )
}
export default TableAkunWithPoinPage

