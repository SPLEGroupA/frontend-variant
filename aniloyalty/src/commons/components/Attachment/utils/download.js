import { resolveFileUrl } from "./fileUtils";

const sanitizeFilename = (name = "download") => {
  return String(name).replace(/[<>:"/\\|?*\x00-\x1F]/g, "_");
};

export const forceDownload = async (file) => {
  const url = resolveFileUrl(file?.url);
  if (!url) return;

  const filename = sanitizeFilename(file?.name || "download");

  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) throw new Error(`Download failed (${res.status})`);

  const blob = await res.blob();
  const blobUrl = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();

  window.URL.revokeObjectURL(blobUrl);
};
