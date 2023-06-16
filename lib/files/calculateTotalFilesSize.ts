export default (files: File[]) =>
  files.reduce((total, file) => total + file.size, 0);
