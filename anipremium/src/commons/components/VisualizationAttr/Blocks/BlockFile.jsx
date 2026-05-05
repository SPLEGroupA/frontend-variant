import React from "react";
import PropTypes from "prop-types";
import Label from "../Label";
import Attachment from "@/commons/components/Attachment";

const BlockFile = ({ content, label }) => {
  return (
    <>
      <Label label={label} />
      <div className="mt-1">
        <Attachment files={content} />
      </div>
    </>
  );
};

BlockFile.propTypes = {
  content: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.object]),
  label: PropTypes.string.isRequired,
};

export default BlockFile;
