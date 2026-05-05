const plugins = import.meta.glob(
  [
    "@/plugins/assets.jsx",
    "@/plugins/icons.jsx",
  ],
  {
    import: "default",
    eager: true,
  }
);

export default function loadPlugin(pluginName) {
  return plugins[`/plugins/${pluginName}.jsx`];
}
