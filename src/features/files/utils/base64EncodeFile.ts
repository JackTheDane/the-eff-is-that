export const base64EncodeFile = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onloadend = (event: ProgressEvent<FileReader>) => {
      if (event.target && typeof event.target.result === "string") {
        console.log(event.target.result);
        const base64FileString = event.target.result;
        console.log(base64FileString);

        resolve(base64FileString);
      } else {
        reject();
      }
    };

    fileReader.onerror = (event: ProgressEvent<FileReader>) => {
      reject(event.target?.error);
    };

    fileReader.readAsDataURL(file);
  });
