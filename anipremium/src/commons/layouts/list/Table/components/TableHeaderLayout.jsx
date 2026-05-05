import React from "react";

const TableHeaderLayout = ({ itemsAttrs, itemsEvents, itemsModals }) => {
  var column = itemsAttrs
    ?.map((itemsAttr) => ({
      name: itemsAttr.label,
      selector: (row) => row[itemsAttr.featureName],
      sortable: true,
      cell: (row) => <div className="whitespace-pre overflow-hidden text-ellipsis">
        {row[itemsAttr.featureName]}
      </div>,
      width: "175px",
    })) || [];

  if (itemsEvents || itemsModals) {
    column = column.concat({
      cell: (row) => {
        const eventsList = typeof itemsEvents === 'function' ? itemsEvents(row) : itemsEvents;
        const modalsList = typeof itemsModals === 'function' ? itemsModals(row) : itemsModals;

        return (
          <div className="flex flex-row justify-center w-full p-1 gap-1">
            {Array.isArray(eventsList) && eventsList.map((event, idx) => <React.Fragment key={`ev-${idx}`}>{event}</React.Fragment>)}
            {Array.isArray(modalsList) && modalsList.map((modal, idx) => <React.Fragment key={`md-${idx}`}>{modal}</React.Fragment>)}
          </div>
        );
      },
      grow: 2,
    });
  }

  return column;
};

export default TableHeaderLayout;