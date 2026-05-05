import React from "react";
import PropTypes from "prop-types";
import { FiPaperclip, FiEye, FiDownload } from "react-icons/fi";
import AttachmentPreviewModal from "./AttachmentPreviewModal";
import { clampToViewport } from "./utils/popover";
import {
  getTypeLabel,
  isPreviewable,
  normalizeFiles,
} from "./utils/fileUtils";
import { forceDownload } from "./utils/download";

const Attachment = ({ files, label, maxWidth = 360 }) => {
  const fileObjects = React.useMemo(() => normalizeFiles(files), [files]);

  const count = fileObjects.length;
  const cellLabel = label || (count === 0 ? "No files" : `${count} file${count > 1 ? "s" : ""}`);

  const [openPreview, setOpenPreview] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  // popover state
  const [openMenu, setOpenMenu] = React.useState(false);
  const [pos, setPos] = React.useState({ top: 0, right: 0 });
  const btnRef = React.useRef(null);
  const menuRef = React.useRef(null);

  const openAtIndex = (idx) => {
    setSelectedIndex(idx);
    setOpenPreview(true);
  };

  const closePreview = () => setOpenPreview(false);

  const prev = () => setSelectedIndex((i) => Math.max(0, i - 1));
  const next = () => setSelectedIndex((i) => Math.min(count - 1, i + 1));

  const closeMenu = React.useCallback(() => setOpenMenu(false), []);

  const computePos = React.useCallback(() => {
    const el = btnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      top: r.bottom + 8,
      right: r.right,
    });
  }, []);

  const toggleMenu = () => {
    if (!openMenu) computePos();
    setOpenMenu((v) => !v);
  };

  // close on outside click
  React.useEffect(() => {
    if (!openMenu) return;

    const onDown = (e) => {
      const btn = btnRef.current;
      const menu = menuRef.current;
      if (btn && btn.contains(e.target)) return;
      if (menu && menu.contains(e.target)) return;
      closeMenu();
    };

    const onKey = (e) => {
      if (e.key === "Escape") closeMenu();
    };

    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [openMenu, closeMenu]);

  // reposition popover on scroll/resize
  React.useEffect(() => {
    if (!openMenu) return;

    const onReflow = () => computePos();
    window.addEventListener("scroll", onReflow, true);
    window.addEventListener("resize", onReflow);
    return () => {
      window.removeEventListener("scroll", onReflow, true);
      window.removeEventListener("resize", onReflow);
    };
  }, [openMenu, computePos]);

  return (
    <div className="flex items-center">
      <button
        ref={btnRef}
        type="button"
        className="btn btn-xs btn-ghost normal-case flex items-center gap-2"
        onClick={toggleMenu}
      >
        <FiPaperclip />
        <span>{cellLabel}</span>
      </button>

      {openMenu && (
        <div className="fixed inset-0 z-[9998]">
          {/* click-catcher */}
          <div className="absolute inset-0" />

          <div
            ref={menuRef}
            className="absolute bg-base-100 rounded-box shadow p-2"
            style={clampToViewport({
              top: pos.top,
              right: pos.right,
              width: maxWidth,
              padding: 8,
            })}
          >
            {count === 0 ? (
              <div className="px-2 py-1 text-sm text-gray-500">No attachments</div>
            ) : (
              <div className="menu">
                {fileObjects.map((f, idx) => {
                  const type = getTypeLabel(f);
                  const previewable = isPreviewable(f) && Boolean(f?.url);
                  const downloadable = Boolean(f?.url);

                  return (
                    <div
                      key={`${f?.name}-${idx}`}
                      className="flex items-center justify-between gap-2 px-2 py-2 rounded-md hover:bg-base-200"
                    >
                      <div className="min-w-0 max-w-[240px]">
                        <div className="text-xs text-gray-500">{type}</div>
                        <div className="text-sm truncate" title={f?.name}>
                          {f?.name}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          className="btn btn-xs btn-ghost"
                          disabled={!previewable}
                          title={previewable ? "Preview" : "Preview currently in development"}
                          onClick={() => {
                            if (!previewable) return;
                            closeMenu();
                            openAtIndex(idx);
                          }}
                        >
                          <FiEye />
                        </button>

                        <button
                          type="button"
                          className={`btn btn-xs btn-ghost ${!downloadable ? "btn-disabled" : ""}`}
                          title="Download"
                          disabled={!downloadable}
                          onClick={async () => {
                            if (!downloadable) return;
                            closeMenu();
                            try {
                              await forceDownload(f);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                        >
                          <FiDownload />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      <AttachmentPreviewModal
        isOpen={openPreview}
        files={fileObjects}
        index={selectedIndex}
        onClose={closePreview}
        onPrev={prev}
        onNext={next}
      />
    </div>
  );
};

Attachment.propTypes = {
  files: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  label: PropTypes.string,
  maxWidth: PropTypes.number,
};

export default Attachment;
