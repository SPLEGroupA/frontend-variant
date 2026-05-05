import { useRoutes } from "react-router";
import { commonRoutes, commonMobileRoutes } from "@/commons/routes";
import userRoutes from "@/user/routes";
import roleRoutes from "@/role/routes";
import staticPageRoutes from "@/staticPage/routes";
import homeRoutes from "@/home/routes";
import katalogProdukRoutes from "@/katalogProduk/routes";
import keranjangBelanjaRoutes from "@/keranjangBelanja/routes";
import akunPenggunaRoutes from "@/akunPengguna/routes";
import reviewRatingRoutes from "@/reviewRating/routes";

const GlobalRoutes = () => {
  const router = useRoutes([
	...commonRoutes,
	...staticPageRoutes,
	...userRoutes,
	...roleRoutes,
	...homeRoutes, 
	...katalogProdukRoutes, 
	...keranjangBelanjaRoutes, 
	...akunPenggunaRoutes, 
	...reviewRatingRoutes, 
  ])
  return router
}

const MobileRoutes = () => {
	const router = useRoutes([ 
	  ...commonMobileRoutes, 
  ])
  return router
}

export {GlobalRoutes, MobileRoutes}
