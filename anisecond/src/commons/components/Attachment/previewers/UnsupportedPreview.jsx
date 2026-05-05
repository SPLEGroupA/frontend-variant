import React from "react";
import PropTypes from "prop-types";
import { FiDownload } from "react-icons/fi";

const UnsupportedPreview = ({ downloadable, onDownload }) => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-md p-4 border">
        <div className="font-semibold">Preview not available yet</div>
        <div className="text-sm text-gray-600 mt-1">
          Preview currently supports images and PDF only. Please download this file to view it.
        </div>
        <button
          type="button"
          className={`btn btn-sm btn-outline mt-3 ${!downloadable ? "btn-disabled" : ""}`}
          disabled={!downloadable}
          onClick={onDownload}
        >
          <FiDownload className="mr-2" /> Download
        </button>
      </div>
    </div>
  );
};

UnsupportedPreview.propTypes = {
  downloadable: PropTypes.bool,
  onDownload: PropTypes.func,
};

export default UnsupportedPreview;
