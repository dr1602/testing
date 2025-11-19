export interface PostType {
  id: number;
  name: number;
}

export interface PostStateType {
  isLoading: boolean;
  error: string | null;
  data: PostType[];
}
