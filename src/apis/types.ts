export interface Message {
  _id?: string;
  isUser: Boolean;
  createdAt: string;
  text: string;
  user: string;
}
