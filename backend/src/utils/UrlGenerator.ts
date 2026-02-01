import DataURIParser from 'datauri/parser.js'
import path from 'path'

export interface FileUpload {
  originalname: string;
  buffer: Buffer;
}

const getDataurl = (file: FileUpload): { mimetype: string; content: string } => {
  const parser = new DataURIParser();
  const extName = path.extname(file.originalname);
  const result = parser.format(extName, file.buffer);

  // Ensure mimetype and content are strings
  return {
    mimetype: result.mimetype || '',
    content: result.content || ''
  };
};

export default getDataurl; 