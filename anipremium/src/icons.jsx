import { Icon as IconifyIcon } from "@iconify/react"
import loadPlugin from "@/pluginLoader";

const assetsPlugin = loadPlugin("assets");

export function Icon({ id, fallback }) {
  const icon = assetsPlugin?.icon?.(id);
  if (typeof icon === "object") {
    return <IconifyIcon {...icon} />;
  } else if (typeof icon === "function") {
    const IconComponent = icon;
    return <IconComponent />;
  } else {
    return fallback;
  }
}

