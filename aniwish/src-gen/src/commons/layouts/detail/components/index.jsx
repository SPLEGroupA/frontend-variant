import React from "react";
import { VisualizationAttr } from "@/commons/components";

const DetailComponentLayout = ({
  item,
  itemsAttrs,
  itemsEvents,
  itemsModals,
}) => {
  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined || amount === "") return amount;
    const n =
      typeof amount === "number"
        ? amount
        : Number(String(amount).split(",").join(""));
    if (Number.isNaN(n)) return amount;

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(n);
  };

  return (
    <div className="card card-body mx-auto w-full bg-white shadow-xl not-prose p-4 sm:p-8">
      <div className='flex flex-row sm:flex-col gap-2'>
        {itemsAttrs?.map(va => va.label.match("Gambar") &&
          (
            <VisualizationAttr
              label={va.label}
              isFile={va?.condition?.includes("isFile")}
              content={
                va?.condition?.includes("isCurrency")
                  ? formatCurrency(item?.[va.featureName])
                  : item?.[va.featureName]
              }
            />
          )
        )}
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-x-4">
          {itemsAttrs?.map(va => !va.label.match("Gambar") &&
            (
              <VisualizationAttr
                label={va.label}
                isFile={va?.condition?.includes("isFile")}
                content={
                  va?.condition?.includes("isCurrency")
                    ? formatCurrency(item?.[va.featureName])
                    : item?.[va.featureName]
                }
              />
            )
          )}
        </div>
      </div>
      <div className="card-actions justify-end">
        {/* View Element Event [singularName /] Element*/}
        {itemsEvents?.map(event => event)}
      </div>
      {/* {itemsModals?.map(modal => modal)} */}
    </div>
  );
};

export default DetailComponentLayout;
