
import React, { useEffect, useState, useContext} from 'react'
import { Button, Spinner } from "@/commons/components"
import * as Layouts from '@/commons/layouts';
import { Link } from "react-router";
import { useParams } from "@/commons/hooks/useParams"
import { HeaderContext } from "@/commons/components"
import { useNavigate } from "react-router";
import { useAuth } from '@/commons/auth';
import DetailPesanan from '../components/DetailPesanan'
import getDetailPesananData from '../services/getDetailPesananData'
import ItemsTable from "../components/ItemsTable";
import getListOrderItems from '../services/getListOrderItems'

const DetailPesananPage = props => {
  const { id_pesanan } = useParams()
  const { checkPermission } = useAuth();
  const [isLoading, setIsLoading] = useState({
	detailPesanan: false,
	orderItems: false,

  });
  const { setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle("Detail Pesanan Page")
  }, []);


const [detailPesananData, setDetailPesananData] = useState()
useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(prev => ({...prev, detailPesanan: true}))
				const { data: detailPesananData } = await getDetailPesananData({ id_pesanan })
				setDetailPesananData(detailPesananData.data)
			} finally {
				setIsLoading(prev => ({...prev, detailPesanan: false}))
			}
		}
		fetchData()
	}, [])
const [listOrderItems, setListOrderItems] = useState()


useEffect(() => {
		
		const fetchData = async () => {
			try {
				setIsLoading(prev => ({...prev, orderItems: true}))
				const { data: listOrderItems } = await getListOrderItems()
				setListOrderItems(listOrderItems.data)
			} finally {
				setIsLoading(prev => ({...prev, orderItems: false}))
			}
		}
		fetchData()
  	}, [])

  return (
	<Layouts.ViewContainerLayout
		buttons={
			<>
			<Layouts.ViewContainerBackButtonLayout>
			  	
			  </Layouts.ViewContainerBackButtonLayout>
			</>
		}
	>
<Layouts.DetailContainerLayout
	title={"Detail Pesanan"}
	singularName={"Pesanan"}
	items={{...detailPesananData}}
	isLoading={isLoading.detailPesanan}
	isCorrelatedWithAnotherComponent={false}
>
	<DetailPesanan {...{ data : { ...detailPesananData }}} />
</Layouts.DetailContainerLayout>
<Layouts.ListContainerTableLayout
	title={"Order Items"}
	singularName={"Items"}
	items={[listOrderItems]}
	isLoading={isLoading.orderItems}
>
	<ItemsTable
		listOrderItems={listOrderItems}
		
	/>
</Layouts.ListContainerTableLayout>

	</Layouts.ViewContainerLayout>
  )
}
export default DetailPesananPage

