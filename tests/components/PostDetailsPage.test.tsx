import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PostDetailsPage } from "../../src/pages/PostDetailsPage";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  UseQueryResult,
} from "@tanstack/react-query";
import * as postHooks from "../../src/features/posts/hooks/usePosts";
import * as commentHooks from "../../src/features/comments/hooks/useComments";
import type { Post } from "../../src/features/posts/types";
import type { Comment } from "../../src/features/comments/types";

vi.mock("../../src/features/posts/hooks/usePosts");
vi.mock("../../src/features/comments/hooks/useComments");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

describe("PostDetailsPage Component", () => {
  it("renders loading states correctly", () => {
    vi.mocked(postHooks.usePost).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as UseQueryResult<Post, Error>);
    vi.mocked(commentHooks.useComments).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as UseQueryResult<Comment[], Error>);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/posts/1"]}>
          <Routes>
            <Route path="/posts/:id" element={<PostDetailsPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(screen.getByText("Back to Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Loading comments...")).toBeInTheDocument();
  });

  it("renders post and comments data correctly", () => {
    vi.mocked(postHooks.usePost).mockReturnValue({
      data: { id: 1, title: "Detail Title", body: "Detail Body", userId: 1 },
      isLoading: false,
      isError: false,
    } as UseQueryResult<Post, Error>);
    vi.mocked(commentHooks.useComments).mockReturnValue({
      data: [
        {
          id: 1,
          name: "Commenter",
          email: "c@e.com",
          body: "Comment body",
          postId: 1,
        },
      ],
      isLoading: false,
      isError: false,
    } as UseQueryResult<Comment[], Error>);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/posts/1"]}>
          <Routes>
            <Route path="/posts/:id" element={<PostDetailsPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(screen.getByText("Detail Title")).toBeInTheDocument();
    expect(screen.getByText("Commenter")).toBeInTheDocument();
    expect(screen.getByText("Comment body")).toBeInTheDocument();
  });
});
