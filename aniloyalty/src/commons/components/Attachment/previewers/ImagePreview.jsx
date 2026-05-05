import React from "react";
import PropTypes from "prop-types";

const ImagePreview = ({ url, alt, zoom, onZoomChange }) => {
  return (
    <>
      {/* zoom controls */}
      <div className="flex items-center gap-2 border-b px-4 py-2 bg-white">
        <span className="text-xs text-gray-500">Zoom</span>
        <button className="btn btn-xs" onClick={() => onZoomChange((z) => Math.max(0.25, Number((z - 0.25).toFixed(2))))}>
          -
        </button>
        <span className="text-xs w-12 text-center">{Math.round(zoom * 100)}%</span>
        <button className="btn btn-xs" onClick={() => onZoomChange((z) => Math.min(4, Number((z + 0.25).toFixed(2))))}>
          +
        </button>
        <button className="btn btn-xs btn-ghost" onClick={() => onZoomChange(1)}>
          Reset
        </button>
      </div>

      {/* image */}
      <div className="min-h-full flex items-center justify-center p-6">
        <img
          src={url}
          alt={alt}
          style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}
          className="max-w-full max-h-[80vh] rounded-md shadow"
        />
      </div>
    </>
  );
};

ImagePreview.propTypes = {
  url: PropTypes.string,
  alt: PropTypes.string,
  zoom: PropTypes.number,
  onZoomChange: PropTypes.func,
};

export default ImagePreview;
