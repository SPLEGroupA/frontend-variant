
import React, { useEffect, useState, useContext} from 'react'
import { Button, Spinner } from "@/commons/components"
import * as Layouts from '@/commons/layouts';
import { Link } from "react-router";
import { useParams } from "@/commons/hooks/useParams"
import { HeaderContext } from "@/commons/components"
import { useNavigate } from "react-router";
import { useAuth } from '@/commons/auth';
import ProdukTable from "../components/ProdukTable";
import getListProdukWithRating from '../services/getListProdukWithRating'

const TableProdukWithRatingPage = props => {
  const { checkPermission } = useAuth();
  const [isLoading, setIsLoading] = useState({
	tableProdukWithRating: false,

  });
  const { setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle("Table Produk With Rating Page")
  }, []);


const [listProdukWithRating, setListProdukWithRating] = useState()


useEffect(() => {
		
		const fetchData = async () => {
			try {
				setIsLoading(prev => ({...prev, tableProdukWithRating: true}))
				const { data: listProdukWithRating } = await getListProdukWithRating()
				setListProdukWithRating(listProdukWithRating.data)
			} finally {
				setIsLoading(prev => ({...prev, tableProdukWithRating: false}))
			}
		}
		fetchData()
  	}, [])

  return (
	<Layouts.ViewContainerLayout
		buttons={
			<>
			<Layouts.ViewContainerButtonLayout>
			  	<Link to={`/produk-rating/review
			  	`}>
			  		<Button id="_TKA_DE_RR_TBL_rev" className="p-2" variant="primary">
			  		  Add Review
			  		</Button>
			  	</Link>
			
			  </Layouts.ViewContainerButtonLayout>
			</>
		}
	>
<Layouts.ListContainerTableLayout
	title={"Table Produk With Rating"}
	singularName={"Produk"}
	items={[listProdukWithRating]}
	isLoading={isLoading.tableProdukWithRating}
>
	<ProdukTable
		listProdukWithRating={listProdukWithRating}
		
	/>
</Layouts.ListContainerTableLayout>

	</Layouts.ViewContainerLayout>
  )
}
export default TableProdukWithRatingPage

