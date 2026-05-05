import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Spinner } from "@/commons/components";

const ListContainerCardLayout = ({
  title,
  singularName,
  isLoading,
  items,
  itemId,
  hasCheckbox = false,
  selectedItems,
  setSelectedItems,
  children,
}) => {
  const [selectedItemIds, setSelectedItemIds] = useState(new Set())
  const itemIds = useMemo(() => {
    if (hasCheckbox) {
      return items?.flat().map((item) => item[itemId]);
    }
    return []
  }, [items]);

  useEffect(() => {
    if (hasCheckbox) {
      setSelectedItemIds(new Set(selectedItems.map(item => item.id)))
    }
  }, [selectedItems])

  const handleCheckboxChange = (items, isChecked) => {
    setSelectedItems((prevSelected) => {
      if (isChecked) {
        const newItems = items.flat().filter(
          (item) => !selectedItemIds.has(item[itemId])
        );
        return [...prevSelected, ...newItems];
      } else {
        return prevSelected.filter(
          (selected) => !itemIds.includes(selected[itemId])
        );
      }
    });
  };

  return (
    <div className="mx-auto w-full max-w-screen-xl prose flex flex-col">
      <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-between items-center mb-4 mt-8">
        <div className="flex items-center">
          {hasCheckbox &&
            <input
              type="checkbox"
              checked={itemIds.every((id) => selectedItemIds.has(id))}
              onChange={(e) =>
                handleCheckboxChange(items, e.target.checked)
              }
              className="w-4 h-4 mr-2"
            />}
          <h2 className="m-0 text-center sm:text-left">{title}</h2>
        </div>
        <div className="flex gap-3 items-center">
          {items && `Terdapat ${items.flat().length} ${singularName}`}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <div className="not-prose col-span-3">
          {isLoading ? (
            <div className={"py-8 text-center"}>
              <Spinner />
            </div>
          ) : items?.every(collection => collection?.length) ? (
            children
          ) : (
            <div className="py-8 text-center">
              Tidak ada data untuk ditampilkan
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ListContainerCardLayout.propTypes = {
  title: PropTypes.string.isRequired,
  singularName: PropTypes.string,
  isLoading: PropTypes.bool,
  items: PropTypes.array.isRequired,
  itemId: PropTypes.string,
  hasCheckbox: PropTypes.bool,
  selectedItems: PropTypes.array,
  setSelectedItems: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default ListContainerCardLayout;
