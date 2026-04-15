import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PostCard } from "../../src/features/posts/components/PostCard";
import { MemoryRouter } from "react-router-dom";

describe("PostCard Component", () => {
  const mockPost = {
    id: 1,
    userId: 1,
    title: "Test Post Title",
    body: "Test Post Body Content",
  };

  it("renders post title and body correctly", () => {
    render(
      <MemoryRouter>
        <PostCard post={mockPost} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Test Post Title")).toBeInTheDocument();
    expect(screen.getByText("Test Post Body Content")).toBeInTheDocument();
  });

  it("contains a link to the post details page", () => {
    render(
      <MemoryRouter>
        <PostCard post={mockPost} />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/posts/1");
  });
});
