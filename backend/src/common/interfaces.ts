export interface IMessageData {
  id: string;
  fileUrl: string;
}

export interface IOcrResponse {
  id: string;
  fileUrl: string;
  status: string;
  textData?: string;
  error?: string;
}
