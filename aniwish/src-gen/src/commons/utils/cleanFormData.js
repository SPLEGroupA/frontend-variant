const cleanFormData = (data) => {
  return Object.fromEntries(
    Object.entries(data).map(([key, val]) => {
      if (val instanceof File) {
        return [key, val];
      }
      else if (Array.isArray(val) && val.every(item => item instanceof File)) {
        return [key, val];
      }
      else {
        return [key, String(val)];
      }
    }),
  );
};

export default cleanFormData;
