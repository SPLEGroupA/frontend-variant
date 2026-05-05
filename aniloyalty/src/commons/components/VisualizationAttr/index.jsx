import React from "react";
import PropTypes from "prop-types";
import useVisualizationAttr from "./useVisualizationAttr";

const VisualizationAttr = ({ label, content, isCurrency, isFile }) => {
  const { getContentType, getRenderBlock } = useVisualizationAttr();

  const contentType = isFile ? "file" : isCurrency ? "currency" : getContentType(content);
  const RenderBlock = getRenderBlock(contentType);

  return (
    <div className="mb-2">
      <RenderBlock content={content} label={label} />
    </div>
  );
};

VisualizationAttr.propTypes = {
  label: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  isCurrency: PropTypes.bool,
  isFile: PropTypes.bool,
};

export default VisualizationAttr;
