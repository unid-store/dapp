export const formatFileSize = (fileSize: number): string => {
  if (fileSize < 1024) {
    return fileSize + " B";
  } else if (fileSize < 1024 * 1024) {
    return (fileSize / 1024).toFixed(2) + " KB";
  } else {
    return (fileSize / (1024 * 1024)).toFixed(2) + " MB";
  }
};

export const calcTotalFilesSize = (files: File[]) =>
  files.reduce((total, file) => total + file.size, 0);

export const formatFileName = (fileName: string): string => {
  // @TODO refactor to dedicated function
  const isMobileDevice =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      window.navigator.userAgent
    );

  let maxLen = isMobileDevice ? 16 : 36; // Set maxLen based on device type

  if (fileName.length > maxLen) {
    let splitName = fileName.split(".");
    let ext = splitName.pop();
    let baseName = splitName.join(".");
    return baseName.substring(0, 4) + "..." + baseName.slice(-4) + "." + ext;
  } else {
    return fileName;
  }
};
