export const executeDelete = (id, items) => {
  return items.filter((item) => item.id !== id);
};
