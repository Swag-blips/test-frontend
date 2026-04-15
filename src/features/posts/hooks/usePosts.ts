import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { postService } from "../services/postService";

export const usePosts = (page: number, limit: number, search: string) => {
  return useQuery({
    queryKey: ["posts", { page, limit, search }],
    queryFn: () => postService.getPosts(page, limit, search),
    placeholderData: keepPreviousData,
  });
};

export const usePost = (id: string | number) => {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: () => postService.getPost(id),
    enabled: !!id,
  });
};
