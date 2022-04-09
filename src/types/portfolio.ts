export interface Portfolio {
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  name: string;
  description: string | null;
  color: string | null;
  url: string | null;
  userId: number;
  pmId: number | null;
}
