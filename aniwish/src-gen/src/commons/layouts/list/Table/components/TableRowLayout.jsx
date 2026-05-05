import React, { useState, useEffect } from "react";
import useVisualizationAttr from "@/commons/components/VisualizationAttr/useVisualizationAttr";
import { BlockImageRow } from "@/commons/components/VisualizationAttr/Blocks";
import CurrencyInput from "react-currency-input-field";
import QuantityInput from "@/commons/components/Input/QuantityInput";
import { ResolveTruthyValue } from "@/commons/utils/resolveTruthyValue";

const TableRowLayout = ({
  viewItems,
  itemsAttrs,
  handleChange,
  selectedItems,
  setSelectedItems,
  itemId,
}) => {
  const { isImage } = useVisualizationAttr();
  const [editedValues, setEditedValues] = useState([]);

  const handleInputChange = (featureName, value, idx) => {
    setEditedValues((prev) => {
      const updatedValue = { [featureName]: value };
      const updatedValues = [...prev];
      updatedValues[idx] = { ...updatedValue };
      return updatedValues;
    });
  };

  const handleCheckboxChange = (item, isChecked) => {
    setSelectedItems((prevSelected) => {
      if (isChecked) {
        return [...prevSelected, item];
      } else {
        return prevSelected.filter(
          (selectedItem) => selectedItem[itemId] !== item[itemId]
        );
      }
    });
  };

  useEffect(() => {
    if(handleChange !== undefined){
      handleChange(editedValues);
    }
  }, [editedValues]);

  return (
    viewItems &&
    viewItems
      .map((collection) =>
        collection?.map((item, idx) => {
          var itemMap = { id: item?.id };

          if (itemsAttrs.some((attr) => attr.id === "checkbox")) {
            itemMap["checkbox"] = (
              <div className="table-cell py-3 w-fit">
                <input
                  type="checkbox"
                  checked={selectedItems.some(
                    (selectedItem) => selectedItem[itemId] === item[itemId]
                  )}
                  onChange={(e) => handleCheckboxChange(item, e.target.checked)}
                  className="w-4 h-4 mr-2"
                />
              </div>
            );
          }

          if (itemsAttrs.some((attr) => isImage(item[attr.featureName]))) {
            {
              itemsAttrs
                .filter((attr) => isImage(item[attr.featureName]))
                .map(
                  (attr) =>
                    (itemMap[attr.featureName] = (
                      <div className="table-cell max-w-64">
                        <div className="w-3/4 flex items-center">
                          <BlockImageRow
                            key={attr.featureName}
                            content={item[attr.featureName]}
                            label=""
                          />
                        </div>
                      </div>
                    ))
                );
            }
          }

          itemsAttrs
            .filter(
              (itemsAttr) =>
                !isImage(item[itemsAttr.featureName]) &&
                itemsAttr.id !== "checkbox" &&
                itemsAttr.id !== "quantity"
            )
            .forEach((itemsAttr) => {
              if (itemsAttr.editable) {
                itemMap[itemsAttr.featureName] = (
                  <div className="table-cell bg-gray-100 rounded-md border border-gray-200">
                    {itemsAttr.condition.includes("isCurrency") ? (
                      <CurrencyInput
                        id={itemsAttr.id}
                        name={item[itemsAttr.featureName]}
                        prefix="Rp"
                        placeholder="Please enter a number"
                        value={
                          editedValues[itemsAttr.featureName] ??
                          item[itemsAttr.featureName]
                        }
                        decimalsLimit={2}
                        onValueChange={(value) =>
                          handleInputChange(itemsAttr.featureName, value ?? "")
                        }
                        className="w-full rounded-md p-1 focus:border-gray-300 bg-transparent"
                      />
                    ) : (
                      <input
                        type="text"
                        name={item[itemsAttr.featureName]}
                        value={
                          ResolveTruthyValue(
                            editedValues[idx] &&
                              editedValues[idx][attr.featureName],
                            item[attr.featureName],
                            0
                          )
                        }
                        onChange={(e) =>
                          handleInputChange(
                            itemsAttr.featureName,
                            e.target.value,
                            idx
                          )
                        }
                        className="w-full rounded-md p-1 focus:border-gray-300 bg-transparent"
                      />
                    )}
                  </div>
                );
              } else {
                itemMap[itemsAttr.featureName] = item[itemsAttr.featureName];
              }
            });

          if (itemsAttrs.some((attr) => attr.id === "quantity")) {
            {
              itemsAttrs
                .filter((attr) => attr.id === "quantity")
                .map(
                  (attr) =>
                    (itemMap[attr.featureName] = (
                      <div className="table-cell py-3 w-fit">
                        <QuantityInput
                          value={ResolveTruthyValue(
                            editedValues[idx] && editedValues[idx][attr.featureName],
                            item[attr.featureName],
                            0
                          )}
                          onChange={(value) => handleInputChange(attr.featureName, value, idx)}
                        />
                      </div>
                    ))
                )
            }
          }

          return itemMap;
        })
      )
      .flat()
  );
};

export default TableRowLayout;
