import React from "react";
import { Spinner } from "@/commons/components";

const FormContainerLayout = ({ isLoading = false, singularName, children }) => {
  return (
    <div className="flex flex-col gap-3">
      {isLoading ? (
        <div className="py-8 text-center">
          <Spinner />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default FormContainerLayout;
