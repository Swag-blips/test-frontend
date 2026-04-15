import apiClient from "../../../api/client";
import type { Comment } from "../types";

export const commentService = {
  getPostComments: async (postId: string | number): Promise<Comment[]> => {
    const response = await apiClient.get<Comment[]>(
      `/posts/${postId}/comments`,
    );
    return response.data;
  },
};
