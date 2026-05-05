
import React, { useContext } from 'react';
import { useNavigate, Link } from "react-router";
import { useAuth } from '@/commons/auth';
import { Button, Detail, VisualizationAttr, Modal, Spinner } from '@/commons/components';
import * as Layouts from "@/commons/layouts";

const DetailPesanan = ({ data }) => {
    const { checkPermission } = useAuth();
    const navigate = useNavigate();
  
  
  return (
    <Layouts.DetailComponentLayout
      item={data}
      itemsAttrs={[
                {
                  id: "idPesanan",
                  condition: "",
                  label: "Id Pesanan",
                  featureName: "id_pesanan",
                }
        ,        {
                  id: "status",
                  condition: "",
                  label: "Status",
                  featureName: "status",
                }
        ,        {
                  id: "tanggalPesan",
                  condition: "",
                  label: "Tanggal Pesan",
                  featureName: "tanggal_pesan",
                }
        ,        {
                  id: "totalHarga",
                  condition: "isCurrency",
                  label: "Total Harga",
                  featureName: "total_harga",
                }
        
      ]}
      itemsEvents={[
        
      ]}
      itemsModals={[
        
      ]}
    />
  );
};

export default DetailPesanan;
