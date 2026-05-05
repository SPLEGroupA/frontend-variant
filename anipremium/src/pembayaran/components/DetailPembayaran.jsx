
import React, { useContext } from 'react';
import { useNavigate, Link } from "react-router";
import { useAuth } from '@/commons/auth';
import { Button, Detail, VisualizationAttr, Modal, Spinner } from '@/commons/components';
import * as Layouts from "@/commons/layouts";

const DetailPembayaran = ({ data }) => {
    const { checkPermission } = useAuth();
    const navigate = useNavigate();
  
  
  return (
    <Layouts.DetailComponentLayout
      item={data}
      itemsAttrs={[
                {
                  id: "idPembayaran",
                  condition: "",
                  label: "Id Pembayaran",
                  featureName: "id_pembayaran",
                }
        ,        {
                  id: "metode",
                  condition: "",
                  label: "Metode",
                  featureName: "metode",
                }
        ,        {
                  id: "jumlah",
                  condition: "isCurrency",
                  label: "Jumlah",
                  featureName: "jumlah",
                }
        ,        {
                  id: "status",
                  condition: "",
                  label: "Status",
                  featureName: "status",
                }
        
      ]}
      itemsEvents={[
        
      ]}
      itemsModals={[
        
      ]}
    />
  );
};

export default DetailPembayaran;
