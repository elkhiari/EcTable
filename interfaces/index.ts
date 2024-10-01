export type User = {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
  website?: string;
};

export type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};
