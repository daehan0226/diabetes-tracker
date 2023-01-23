export const setDateFormat = (date: Date): string => {
  const y = String(date.getFullYear());
  let m = String(date.getMonth() + 1);
  let d = String(date.getDate());
  if (m.length === 1) {
    m = `0${m}`;
  }
  if (d.length === 1) {
    d = `0${d}`;
  }
  return `${y}-${m}-${d}`;
};
