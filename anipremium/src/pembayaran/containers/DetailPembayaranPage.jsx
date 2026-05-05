
import React, { useEffect, useState, useContext} from 'react'
import { Button, Spinner } from "@/commons/components"
import * as Layouts from '@/commons/layouts';
import { Link } from "react-router";
import { useParams } from "@/commons/hooks/useParams"
import { HeaderContext } from "@/commons/components"

import DetailPembayaran from '../components/DetailPembayaran'
import getDetailPembayaranData from '../services/getDetailPembayaranData'

const DetailPembayaranPage = props => {
  const [isLoading, setIsLoading] = useState({
	detailPembayaran: false,

  });
  const { setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle("Detail Pembayaran Page")
  }, []);


const [detailPembayaranData, setDetailPembayaranData] = useState()
useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(prev => ({...prev, detailPembayaran: true}))
				const { data: detailPembayaranData } = await getDetailPembayaranData({ id_pembayaran })
				setDetailPembayaranData(detailPembayaranData.data)
			} finally {
				setIsLoading(prev => ({...prev, detailPembayaran: false}))
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
	title={"Detail Pembayaran"}
	singularName={"Pembayaran"}
	items={{...detailPembayaranData}}
	isLoading={isLoading.detailPembayaran}
	isCorrelatedWithAnotherComponent={false}
>
	<DetailPembayaran {...{ data : { ...detailPembayaranData }}} />
</Layouts.DetailContainerLayout>

	</Layouts.ViewContainerLayout>
  )
}
export default DetailPembayaranPage

