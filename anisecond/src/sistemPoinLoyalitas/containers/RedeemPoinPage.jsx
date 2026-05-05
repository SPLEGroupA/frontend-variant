
import React, { useEffect, useState, useContext} from 'react'
import { Button, Spinner } from "@/commons/components"
import * as Layouts from '@/commons/layouts';
import { Link } from "react-router";
import { useParams } from "@/commons/hooks/useParams"
import { HeaderContext } from "@/commons/components"
import { useSearchParams } from "react-router";
import AddedFormRedeemPoin from '../components/AddedFormRedeemPoin'

const RedeemPoinPage = props => {
  const [isLoading, setIsLoading] = useState({
	redeemPoin: false,

  });
  const { setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle("Redeem Poin Page")
  }, []);


useEffect(() => {
    const fetch = async () => {
	  setIsLoading(prev => ({...prev, redeemPoin: true}))
	  setIsLoading(prev => ({...prev, redeemPoin: false}))
    }
	fetch()
  }, [])

  return (
	<Layouts.ViewContainerLayout
		buttons={
			<>
			<></>
			</>
		}
	>
<Layouts.FormContainerLayout
		singularName={"Poin"}
		isLoading={isLoading.redeemPoin}
	>
		<AddedFormRedeemPoin
			{...props}
		/>
	</Layouts.FormContainerLayout>

	</Layouts.ViewContainerLayout>
  )
}
export default RedeemPoinPage

