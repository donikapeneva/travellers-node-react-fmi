export class FileReaderUtility {
  public static readFileAsync(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result.toString());
      };

      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  }
}
