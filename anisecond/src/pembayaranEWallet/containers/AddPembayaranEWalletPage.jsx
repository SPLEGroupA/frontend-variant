
import React, { useEffect, useState, useContext} from 'react'
import { Button, Spinner } from "@/commons/components"
import * as Layouts from '@/commons/layouts';
import { Link } from "react-router";
import { useParams } from "@/commons/hooks/useParams"
import { HeaderContext } from "@/commons/components"
import { useSearchParams } from "react-router";
import ModifiedFormAddPembayaranEWallet from '../components/ModifiedFormAddPembayaranEWallet'

const AddPembayaranEWalletPage = props => {
  const [isLoading, setIsLoading] = useState({
	addPembayaranEWallet: false,

  });
  const { setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle("Add Pembayaran EWallet Page")
  }, []);

  return (
	<Layouts.ViewContainerLayout
		buttons={
			<>
			<></>
			</>
		}
	>
<Layouts.FormContainerLayout
		singularName={"Pembayaran"}
		
	>
		<ModifiedFormAddPembayaranEWallet
			{...props}
		/>
	</Layouts.FormContainerLayout>

	</Layouts.ViewContainerLayout>
  )
}
export default AddPembayaranEWalletPage

