import { useQuery } from "@tanstack/react-query";
import { commentService } from "../services/commentService";

export const useComments = (postId: string | number) => {
  return useQuery({
    queryKey: ["posts", postId, "comments"],
    queryFn: () => commentService.getPostComments(postId),
    enabled: !!postId,
  });
};
