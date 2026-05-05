import React, { useEffect, useState } from "react";

import TableHeaderLayout from "./TableHeaderLayout";
import TableRowLayout from "./TableRowLayout";
import DataTable from "react-data-table-component";
import searchItems from "@/commons/utils/Table/SearchItems";
import filterItems from "@/commons/utils/Table/FilterItems";
import SearchField from "@/commons/components/Table/SearchField";
import FilterField from "@/commons/components/Table/FilterField";
import MultiFilterField from "@/commons/components/Table/MultiFilterField";

const ListComponentLayout = ({
  items,
  detail,
  isSearchable,
  filterFields,
  itemsAttrs,
  itemsEvents,
  itemsModals,
  handleChange,
  selectedItems,
  setSelectedItems,
  itemId = 'id',
}) => {
  const [viewItems, setViewItems] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [filterTextList, setFilterTextList] = useState([]);

  useEffect(() => {
    var newItems = items;
    newItems = searchItems(newItems, searchText, itemsAttrs);
    newItems = filterItems(newItems, filterTextList);

    setViewItems(newItems);
  }, [searchText, filterTextList, items]);

  useEffect(() => {
    setFilterTextList(
      filterFields?.map((filterField) => ({ ...filterField, text: [""] }))
    );
  }, [filterFields]);

  const updateSearchText = (newSearchText) => setSearchText(newSearchText);

  const updateFilterText = (newFilterText, featureName) =>
    setFilterTextList((prev) =>
      prev.map((filterText) =>
        filterText.featureName == featureName
          ? { ...filterText, text: newFilterText }
          : filterText
      )
    );

  return (
    <div>
      <DataTable
        columns={TableHeaderLayout({ itemsAttrs, itemsEvents, itemsModals })}
        data={TableRowLayout({
          viewItems,
          itemsAttrs,
          handleChange,
          selectedItems,
          setSelectedItems,
          itemId,
        })}
        pagination
        subHeader
        subHeaderComponent={
          <div className="pt-4 flex flex-wrap items-center justify-stretch gap-5 w-full">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              {isSearchable && (
                <div className="flex-1 min-w-[200px]">
                  <SearchField updateSearchText={updateSearchText} />
                </div>
              )}
              <div className="flex flex-wrap gap-2 sm:justify-start">
                {filterFields?.map(
                  (filterField) =>
                    filterField && (
                      filterField.isMultiSelection ? (
                        <MultiFilterField
                          filterField={filterField}
                          updateFilterText={updateFilterText}
                        />
                      ) : (
                        <FilterField
                          filterField={filterField}
                          updateFilterText={updateFilterText}
                        />)
                    ),
                )}
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default ListComponentLayout;
