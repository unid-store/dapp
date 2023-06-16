export default (fileSize: number): string => {
  if (fileSize < 1024) {
    return fileSize + " B";
  } else if (fileSize < 1024 * 1024) {
    return (fileSize / 1024).toFixed(2) + " KB";
  } else {
    return (fileSize / (1024 * 1024)).toFixed(2) + " MB";
  }
};
