import apiClient from "../../../api/client";
import type { Post } from "../types";

export const postService = {
  getPosts: async (page = 1, limit = 10, search = ""): Promise<Post[]> => {
    let url = `/posts?_page=${page}&_limit=${limit}`;
    if (search) {
      url += `&title_like=${search}`;
    }
    const response = await apiClient.get<Post[]>(url);
    return response.data;
  },

  getPost: async (id: string | number): Promise<Post> => {
    const response = await apiClient.get<Post>(`/posts/${id}`);
    return response.data;
  },
};
