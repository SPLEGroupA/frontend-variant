
import React, { useEffect, useState, useContext} from 'react'
import { Button, Spinner } from "@/commons/components"
import * as Layouts from '@/commons/layouts';
import { Link } from "react-router";
import { useParams } from "@/commons/hooks/useParams"
import { HeaderContext } from "@/commons/components"
import { useNavigate } from "react-router";
import { useAuth } from '@/commons/auth';
import PreOrderTable from "../components/PreOrderTable";
import getListPreOrder from '../services/getListPreOrder'

const TablePreOrderPage = props => {
  const { checkPermission } = useAuth();
  const [isLoading, setIsLoading] = useState({
	tablePreOrder: false,

  });
  const { setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle("Table PreOrder Page")
  }, []);


const [listPreOrder, setListPreOrder] = useState()


useEffect(() => {
		
		const fetchData = async () => {
			try {
				setIsLoading(prev => ({...prev, tablePreOrder: true}))
				const { data: listPreOrder } = await getListPreOrder()
				setListPreOrder(listPreOrder.data)
			} finally {
				setIsLoading(prev => ({...prev, tablePreOrder: false}))
			}
		}
		fetchData()
  	}, [])

  return (
	<Layouts.ViewContainerLayout
		buttons={
			<>
			<Layouts.ViewContainerButtonLayout>
			  	<Link to={`/preorder/add
			  	`}>
			  		<Button id="_TKA_PO_TBL_add" className="p-2" variant="primary">
			  		  Add PreOrder
			  		</Button>
			  	</Link>
			
			  </Layouts.ViewContainerButtonLayout>
			</>
		}
	>
<Layouts.ListContainerTableLayout
	title={"Table PreOrder"}
	singularName={"PreOrder"}
	items={[listPreOrder]}
	isLoading={isLoading.tablePreOrder}
>
	<PreOrderTable
		listPreOrder={listPreOrder}
		
	/>
</Layouts.ListContainerTableLayout>

	</Layouts.ViewContainerLayout>
  )
}
export default TablePreOrderPage

