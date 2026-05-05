
import React, { useEffect, useState, useContext} from 'react'
import { Button, Spinner } from "@/commons/components"
import * as Layouts from '@/commons/layouts';
import { Link } from "react-router";
import { useParams } from "@/commons/hooks/useParams"
import { HeaderContext } from "@/commons/components"
import { useNavigate } from "react-router";
import { useAuth } from '@/commons/auth';
import AkunTable from "../components/AkunTable";
import getListAkunWithMembership from '../services/getListAkunWithMembership'

const TableAkunWithMembershipPage = props => {
  const { checkPermission } = useAuth();
  const [isLoading, setIsLoading] = useState({
	tableAkunWithMembership: false,

  });
  const { setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle("Table Akun With Membership Page")
  }, []);


const [listAkunWithMembership, setListAkunWithMembership] = useState()

useEffect(() => {
		
		const fetchData = async () => {
			try {
				setIsLoading(prev => ({...prev, tableAkunWithMembership: true}))
				const { data: listAkunWithMembership } = await getListAkunWithMembership()
				setListAkunWithMembership(listAkunWithMembership.data)
			} finally {
				setIsLoading(prev => ({...prev, tableAkunWithMembership: false}))
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
	title={"Table Akun With Membership"}
	singularName={"Akun"}
	items={[listAkunWithMembership]}
	isLoading={isLoading.tableAkunWithMembership}
>
	<AkunTable
		listAkunWithMembership={listAkunWithMembership}
		
	/>
</Layouts.ListContainerTableLayout>

	</Layouts.ViewContainerLayout>
  )
}
export default TableAkunWithMembershipPage

