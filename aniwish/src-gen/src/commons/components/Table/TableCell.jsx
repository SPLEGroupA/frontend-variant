import React from "react";
import PropTypes from "prop-types";
import Attachment from "@/commons/components/Attachment";

const TableCell = ({
  isCurrency,
  isFile,
  isHeading,
  isHiddenMobile,
  children,
  className,
}) => {
  const format_currency = (children) => {
    const amount = parseInt(children);
    if (Number.isNaN(amount)) return "";
    const format = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    })
      .format(amount < 0 ? -amount : amount)
      .replace("IDR", "");
    return amount < 0 ? `(${format})` : format;
  };

  const checkIsArray = (children) => {
    return children instanceof Array;
  };

  const isArray = checkIsArray(children);

  return isHeading ? (
    <th
      style={{ zIndex: 0 }}
      className={`w-auto ${isHiddenMobile && "hidden sm:table-cell"} ${className}`}
    >
      {children}
    </th>
  ) : (
    <td
      className={`w-auto whitespace-pre text-ellipsis ${
        isHiddenMobile && "hidden sm:table-cell"
      } ${className} ${isFile ? "overflow-visible relative" : "overflow-hidden"}`}
      style={{ textAlign: isCurrency ? "right" : "inherit" }}
    >
      {isFile ? (
        <Attachment files={children} />
      ) : isCurrency ? (
        <span className="max-w-[150px] flex justify-between">
          <span>Rp</span>
          {format_currency(children)}
        </span>
      ) : isArray ? (
        children.join(", ")
      ) : (
        children
      )}
    </td>
  );
};

TableCell.propTypes = {
  isCurrency: PropTypes.bool,
  isFile: PropTypes.bool,
  isHeading: PropTypes.bool,
  isHiddenMobile: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
};

export default TableCell;
