import { toPng } from 'html-to-image';

export const HtmlToPngComponent = async () => {
  const node = document.getElementById('my-node-htmltopng');

  try {
    const dataUrl = await toPng(node);
    const mimeType = dataUrl.split(';')[0].split(':')[1];
    const base64 = dataUrl.split(',')[1];
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: mimeType });
    const file = new File([blob], 'image.png', { type: mimeType });
    return file;
  } catch (error) {
    console.error('Conversion failed:', error);
    throw error;
  }
};
