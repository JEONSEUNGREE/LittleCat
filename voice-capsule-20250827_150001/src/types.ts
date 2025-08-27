export interface VoiceCapsule {
  id: string;
  title: string;
  audioUrl: string;
  audioBlob?: Blob;
  createdAt: Date;
  openAt: Date;
  isOpened: boolean;
  duration: number;
  recipient: string;
  message?: string;
  isPublic: boolean;
  reactions: string[];
}