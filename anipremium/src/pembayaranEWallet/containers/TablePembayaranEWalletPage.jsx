
import React, { useEffect, useState, useContext} from 'react'
import { Button, Spinner } from "@/commons/components"
import * as Layouts from '@/commons/layouts';
import { Link } from "react-router";
import { useParams } from "@/commons/hooks/useParams"
import { HeaderContext } from "@/commons/components"
import { useNavigate } from "react-router";
import { useAuth } from '@/commons/auth';
import PembayaranTable from "../components/PembayaranTable";
import getListPembayaranEWallet from '../services/getListPembayaranEWallet'

const TablePembayaranEWalletPage = props => {
  const { checkPermission } = useAuth();
  const [isLoading, setIsLoading] = useState({
	tablePembayaranEWallet: false,

  });
  const { setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle("Table Pembayaran EWallet Page")
  }, []);


const [listPembayaranEWallet, setListPembayaranEWallet] = useState()

useEffect(() => {
		
		const fetchData = async () => {
			try {
				setIsLoading(prev => ({...prev, tablePembayaranEWallet: true}))
				const { data: listPembayaranEWallet } = await getListPembayaranEWallet()
				setListPembayaranEWallet(listPembayaranEWallet.data)
			} finally {
				setIsLoading(prev => ({...prev, tablePembayaranEWallet: false}))
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
	title={"Table Pembayaran EWallet"}
	singularName={"Pembayaran"}
	items={[listPembayaranEWallet]}
	isLoading={isLoading.tablePembayaranEWallet}
>
	<PembayaranTable
		listPembayaranEWallet={listPembayaranEWallet}
		
	/>
</Layouts.ListContainerTableLayout>

	</Layouts.ViewContainerLayout>
  )
}
export default TablePembayaranEWalletPage

