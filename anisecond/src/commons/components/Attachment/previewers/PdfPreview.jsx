import React from "react";
import PropTypes from "prop-types";

const PdfPreview = ({ url, title }) => {
  return <iframe title={title} src={url} className="w-full h-full" />;
};

PdfPreview.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
};

export default PdfPreview;
