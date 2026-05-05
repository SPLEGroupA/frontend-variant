import useAppearance from "@/commons/appearance/useAppearance";
import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import { INPUT_CLASSNAMES } from "./variants";

const MultiFileInputField = forwardRef(function MultiFileInputField(props, ref) {
  const {
    label,
    className = "",
    kit,
    defaultValue,
    fieldState,
    ...rest
  } = props;

  const interfaceKit = useAppearance();
  const inputStyle = (kit ?? interfaceKit).input;
  const inputVariant = INPUT_CLASSNAMES[inputStyle];

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewFileName, setPreviewFileName] = useState("");

  const isImageFile = (file) => {
    if (!file) return false;
    if (file instanceof File) {
      return file.type.startsWith("image/"); 
    }
    return /\.(jpe?g|png|gif|webp|svg)$/i.test(file);
  };

  const getImage = (image) => {
    if (image instanceof File) {
      return URL.createObjectURL(image);
    } else {
      return image;
    }
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const truncateFileName = (fileName, maxLength = 40) => {
    if (fileName.length <= maxLength) return fileName;
    
    const extension = fileName.split('.').pop();
    const nameWithoutExtension = fileName.slice(0, -(extension.length + 1));
    const truncatedName = nameWithoutExtension.slice(0, maxLength - extension.length - 4) + '...';
    
    return `${truncatedName}.${extension}`;
  };

  const handlePreviewClick = (file) => {
    setPreviewImage(getImage(file));
    setPreviewFileName(file.name);
  };

  const closePreview = () => {
    setPreviewImage(null);
    setPreviewFileName("");
  };

  if (rest.defaultValue) delete rest.defaultValue;
  if (rest.value) delete rest.value;

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const updated = [...selectedFiles, ...files];
    setSelectedFiles(updated);
    props.onChange(updated);

    e.target.value = '';
  };

  const handleDeleteFile = (index) => {
    const updated = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updated);
    props.onChange(updated);
  };

  return (
    <div className="form-control break-inside-avoid">
      {label && (
        <label className="label label-text justify-start">
          {label}{" "}
          {props.isRequired && (
            <font className="ml-1" color="red">
              *
            </font>
          )}
        </label>
      )}

      {selectedFiles.length > 0 && (
        <div className="flex flex-col gap-2 mb-3">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex justify-between items-center border rounded-lg p-3 bg-base-200 hover:bg-base-300 transition-colors"
            >
              <div className="flex flex-col text-sm flex-1 min-w-0 mr-3">
                <span 
                  className="font-medium truncate text-base-content block text-left"
                  title={file.name}
                >
                  {truncateFileName(file.name)}
                </span>
                <span className="text-xs text-base-content/70 mt-1 text-left">
                  {formatSize(file.size)}
                </span>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                {isImageFile(file) && (
                  <button
                    type="button"
                    onClick={() => handlePreviewClick(file)}
                    className="btn btn-xs btn-outline btn-info whitespace-nowrap"
                  >
                    View
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleDeleteFile(index)}
                  className="btn btn-xs btn-outline btn-error whitespace-nowrap"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mb-2 text-sm text-base-content/70 text-left">
        {selectedFiles.length === 0 ? 'No files chosen' : `${selectedFiles.length} file(s) selected`}
      </div>

      <input
        className={`file-input w-full ${inputVariant} ${
          fieldState?.error && "input-error"
        } ${className}`}
        ref={ref}
        type="file"
        {...rest}
        onChange={handleFileChange}
        multiple
      />

      {fieldState?.error && (
        <label className="label label-text text-error text-left">
          {fieldState.error.message}
        </label>
      )}

      {previewImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          onClick={closePreview}
        >
          <div 
            className="bg-base-100 rounded-lg shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col border border-base-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center py-2 px-4 border-b border-base-300 bg-base-200 rounded-t-lg">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <h3 
                  className="text-md font-semibold text-base-content truncate text-left"
                  title={previewFileName}
                >
                  {previewFileName}
                </h3>
              </div>
              <button
                className="btn btn-circle btn-ghost btn-sm hover:bg-error/20 hover:text-error transition-colors flex-shrink-0 ml-2"
                onClick={closePreview}
                aria-label="Close preview"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 p-4 flex justify-center items-center overflow-auto bg-base-100">
              <div className="flex justify-center items-center max-w-full max-h-full">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="max-w-full max-h-full object-contain rounded-md shadow-sm"
                  style={{ 
                    maxHeight: 'calc(85vh - 80px)',
                    maxWidth: '100%'
                  }}
                />
              </div>
            </div>

            <div className="flex justify-end py-2 px-4 border-t border-base-300 bg-base-200 rounded-b-lg">
              <button
                className="btn btn-primary btn-sm text-xs"
                onClick={closePreview}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

MultiFileInputField.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  kit: PropTypes.object,
  defaultValue: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(File)])
  ),
  fieldState: PropTypes.shape({
    error: PropTypes.shape({
      message: PropTypes.string,
    }),
  }),
  onChange: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
};

export default MultiFileInputField;
