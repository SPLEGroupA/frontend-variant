import React from "react";
import PropTypes from "prop-types";
import { FiDownload, FiFileText, FiImage, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { formatBytes, getTypeLabel, isImage, isPdf, isPreviewable, resolveFileUrl } from "./utils/fileUtils";
import { forceDownload } from "./utils/download";

import PdfPreview from "./previewers/PdfPreview";
import ImagePreview from "./previewers/ImagePreview";
import UnsupportedPreview from "./previewers/UnsupportedPreview";

const AttachmentPreviewModal = ({ isOpen, files, index, onClose, onPrev, onNext }) => {
  const [imgZoom, setImgZoom] = React.useState(1);

  const file = Array.isArray(files) && files.length > 0 ? files[index] : null;
  const total = Array.isArray(files) ? files.length : 0;

  React.useEffect(() => {
    setImgZoom(1);
  }, [file]);

  React.useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
      if (total > 1 && (e.key === "ArrowLeft" || e.key === "Left")) onPrev?.();
      if (total > 1 && (e.key === "ArrowRight" || e.key === "Right")) onNext?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose, onPrev, onNext, total]);

  if (!isOpen || !file) return null;

  const sizeText = formatBytes(file?.size);
  const canPreview = isPreviewable(file);
  const downloadable = Boolean(file?.url);
  const fileUrl = resolveFileUrl(file?.url);

  const hasNav = total > 1;
  const atFirst = index <= 0;
  const atLast = index >= total - 1;

  return (
    <div className="fixed inset-0 z-[9999]">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="absolute inset-0 p-3 sm:p-6 flex flex-col">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col h-full">
          {/* header */}
          <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
            <div className="min-w-0 flex items-center gap-2">
              {isImage(file) ? <FiImage /> : <FiFileText />}
              <div className="min-w-0">
                <div className="font-semibold text-sm truncate" title={file?.name}>
                  {file?.name || "File"}
                </div>
                <div className="text-xs text-gray-500">
                  {getTypeLabel(file)} {sizeText ? `• ${sizeText}` : ""}
                  {!canPreview ? " • Preview currently in development" : ""}
                </div>
              </div>
            </div>

            {/* controls */}
            <div className="flex items-center gap-2">
              {hasNav && (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="btn btn-xs btn-ghost gap-1"
                    disabled={atFirst}
                    title="Previous file"
                    onClick={onPrev}
                  >
                    <FiChevronLeft />
                    <span className="hidden sm:inline">Prev</span>
                  </button>

                  <span className="text-xs text-gray-500 px-2 select-none">
                    {index + 1} / {total}
                  </span>

                  <button
                    type="button"
                    className="btn btn-xs btn-ghost gap-1"
                    disabled={atLast}
                    title="Next file"
                    onClick={onNext}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <FiChevronRight />
                  </button>
                </div>
              )}

              <button
                type="button"
                className={`btn btn-xs btn-ghost ${!downloadable ? "btn-disabled" : ""}`}
                title="Download"
                disabled={!downloadable}
                onClick={async () => {
                  if (!downloadable) return;
                  try {
                    await forceDownload(file);
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <FiDownload />
              </button>

              <button className="btn btn-sm btn-primary" onClick={onClose} title="Close">
                Close
              </button>
            </div>
          </div>

          {/* body */}
          <div className="flex-1 overflow-auto bg-gray-900/5">
            {canPreview ? (
              isPdf(file) ? (
                <PdfPreview url={fileUrl} title={file?.name || "PDF Preview"} />
              ) : (
                <ImagePreview url={fileUrl} alt={file?.name || "Preview"} zoom={imgZoom} onZoomChange={setImgZoom} />
              )
            ) : (
              <UnsupportedPreview
                downloadable={downloadable}
                onDownload={async () => {
                  if (!downloadable) return;
                  try {
                    await forceDownload(file);
                  } catch (err) {
                    console.error(err);
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

AttachmentPreviewModal.propTypes = {
  isOpen: PropTypes.bool,
  files: PropTypes.array,
  index: PropTypes.number,
  onClose: PropTypes.func,
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
};

export default AttachmentPreviewModal;
