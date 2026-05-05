const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const formatBytes = (bytes) => {
  const n = Number(bytes);
  if (!Number.isFinite(n) || n <= 0) return "";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(n) / Math.log(1024));
  const v = n / Math.pow(1024, i);
  return `${v.toFixed(v >= 10 || i === 0 ? 0 : 1)} ${units[i]}`;
};

export const getExt = (name = "") => {
  const n = String(name);
  const idx = n.lastIndexOf(".");
  if (idx === -1) return "";
  return n.slice(idx + 1).toLowerCase();
};

export const getTypeLabel = (file) => {
  const mime = String(file?.mimeType || "").toLowerCase();
  const ext = getExt(file?.name);

  if (mime.startsWith("image/") || ["png", "jpg", "jpeg", "gif", "webp"].includes(ext)) return "IMG";
  if (mime.includes("pdf") || ext === "pdf") return "PDF";
  return ext ? ext.toUpperCase() : "FILE";
};

export const isPdf = (file) => {
  const mime = String(file?.mimeType || "").toLowerCase();
  const ext = getExt(file?.name);
  return mime.includes("pdf") || ext === "pdf";
};

export const isImage = (file) => {
  const mime = String(file?.mimeType || "").toLowerCase();
  const ext = getExt(file?.name);
  return mime.startsWith("image/") || ["png", "jpg", "jpeg", "gif", "webp"].includes(ext);
};

export const isPreviewable = (file) => isImage(file) || isPdf(file);

export const resolveFileUrl = (url) => {
  if (!url) return "";
  const u = String(url);
  if (u.startsWith("http://") || u.startsWith("https://")) return u;
  if (u.startsWith("/uploads/")) return `${BACKEND_URL}${u}`;
  if (u.startsWith("/")) return `${BACKEND_URL}${u}`;
  return `${BACKEND_URL}/${u}`;
};

export const normalizeFiles = (files) => {
  const normalized = Array.isArray(files) ? files : [];
  return normalized
    .map((f) => (typeof f === "string" ? { name: f } : f))
    .filter((f) => f && f.name);
};
