export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    if (!file) reject({ message: "File not provided to fucntion.." });
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve({
        base64: reader.result,
        message: "File converted to bas64 successfully.",
      });
    };
    reader.onerror = (e) => {
      reject(e);
    };
  });
