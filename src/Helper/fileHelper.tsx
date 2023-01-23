export const setFilename = (userId: string, filename: string): string => {
  const extension = filename.split(".").pop();
  return `${userId}/${userId}_${new Date().getTime()}.${extension}`;
};
