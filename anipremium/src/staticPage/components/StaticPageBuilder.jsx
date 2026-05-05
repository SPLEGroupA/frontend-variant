import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import generateUuid from "uuid-random";
import toast from "react-hot-toast";

import grapesjs from "grapesjs";
import grapesjsBlocksBasicPlugin from "grapesjs-blocks-basic";
import grapesjsPresetWebpagePlugin from "grapesjs-preset-webpage";
import "grapesjs/dist/css/grapes.min.css";
import "grapesjs/dist/grapes.min.js";

import { Button } from "@/commons/components";
import environment from "@/commons/utils/environment";
import StaticPageSaveForm from "./StaticPageSaveForm";

import data from "../data/static-page-db.json";

const StaticPageBuilder = ({
  staticId = null,
  initialComponentData = null,
  initialStyleData = null,
  isEditMode = false,
  actionRedirectToDetailPage = () => null,
}) => {
  const [editor, setEditor] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const _editor = grapesjs.init({
      container: "#gjs",
      height: "calc(100vh - 4rem)",
      width: "100%",
      plugins: [grapesjsBlocksBasicPlugin, grapesjsPresetWebpagePlugin],
      storageManager: false,
      deviceManager: {
        devices: [
          {
            id: "desktop",
            name: "Desktop",
            width: "",
          },
          {
            id: "tablet",
            name: "Tablet",
            width: "768px",
            widthMedia: "992px",
          },
          {
            id: "mobilePortrait",
            name: "Mobile portrait",
            width: "320px",
            widthMedia: "575px",
          },
        ],
      },
      styleManager: {
        sectors: [
          {
            name: "Typography",
            buildProps: ["font-family", "font-size", "color"],
          },
        ],
      },
      pluginsOpts: {
        [grapesjsPresetWebpagePlugin]: {
          navbarOpts: false,
          countdownOpts: false,
          formsOpts: false,
          exportOpts: false,
          blocks: [],
          modalImportContent: (editor) => editor.getHtml(),
        },
        [grapesjsBlocksBasicPlugin]: {
          blocks: ["text", "image", "video", "column1", "column3-7", "link"],
          flexGrid: 1,
        },
      },
    });

    _editor.setComponents(initialComponentData);
    _editor.setStyle(initialStyleData);
    _editor.Panels.removeButton("options", "export-template");
    _editor.Panels.removeButton("options", "gjs-open-import-webpage");
    _editor.Panels.removeButton("options", "fullscreen");
    _editor.Panels.removeButton("options", "preview");

    setEditor(_editor);
  }, [initialComponentData, initialStyleData, isFormVisible]);

  const actionSaveToDB = useCallback(
    (title) => {
      const staticPageId = `${title}-${generateUuid()}`;

      const htmlData = editor.getHtml();
      const cssData = editor.getCss();
      try {
        try {
          localStorage.setItem('static-page-db', JSON.stringify(data, null, 2));
          toast.success(`Halaman '${staticPageId}' berhasil dibuat!`);
        } catch (err) {
          data["static-data"].push({ id: staticPageId, htmlData, cssData });
          console.error('Failed to persist to localStorage', err);
          toast.success(`Halaman '${staticPageId}' berhasil dibuat!`);
        }
        setIsFormVisible(false);
      } catch (e) {
        toast.error(e?.response?.statusText || "Gagal membuat halaman, harap coba lagi!");
      }
    },
    [editor]
  );

  const actionUpdateDB = useCallback(() => {
    const htmlData = editor.getHtml();
    const cssData = editor.getCss();
    try {
      try {
        localStorage.setItem('static-page-db', JSON.stringify(data, null, 2));
        toast.success(`Halaman '${staticId}' berhasil diubah!`);
      } catch (err) {
        console.error('Failed to persist to localStorage:', err);
        const index = data["static-data"].findIndex((item => item.id === staticId));
        if (index === -1) {
          throw new Error("Static page not found");
        }
        data["static-data"][index] = {
          id: staticId,
          htmlData,
          cssData,
        };
        toast.success(`Halaman '${staticId}' berhasil diubah!`);
      }
      actionRedirectToDetailPage();
    } catch (e) {
      toast.error(e?.response?.statusText || "Gagal mengubah halaman, harap coba lagi!");
    }
  }, [editor, staticId, actionRedirectToDetailPage]);

  return (
    <>
      {isFormVisible ? (
        <StaticPageSaveForm onSubmit={actionSaveToDB} onCancel={() => setIsFormVisible(false)} />
      ) : (
        <div className="btn-group fixed bottom-6 right-6 shadow-md z-10 rounded-btn bg-white">
          <Button className="z-10" variant="tertiary" onClick={actionRedirectToDetailPage}>
            Batal
          </Button>
          <Button
            className="z-10"
            variant="primary"
            onClick={isEditMode ? actionUpdateDB : () => setIsFormVisible(true)}
          >
            Simpan
          </Button>
        </div>
      )}
      <div id="gjs"></div>
    </>
  );
};

export default StaticPageBuilder;
