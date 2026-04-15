import { useState } from "react";
import { Search } from "lucide-react";
import { usePosts } from "../features/posts/hooks/usePosts";
import { PostCard } from "../features/posts/components/PostCard";
import { Input } from "../components/ui/Input";
import { useDebounce } from "../hooks/useDebounce";

export const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const {
    data: posts,
    isLoading,
    isError,
  } = usePosts(page, pageSize, debouncedSearchTerm);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const totalPosts = searchTerm ? posts?.length || 0 : 100;
  const pageCount = Math.ceil(totalPosts / pageSize);

  return (
    <main className="pt-24 pb-32 px-6 flex flex-col gap-8 max-w-lg mx-auto w-full">
      <div className="flex flex-col gap-4">
        <Input
          id="search"
          label="Search Nexus"
          type="text"
          placeholder="Type a title..."
          value={searchTerm}
          onChange={handleSearchChange}
          icon={<Search size={20} className="text-on-surface-variant" />}
        />
      </div>

      <div className="flex flex-col gap-6 min-h-[400px]">
        {isLoading && (
          <div className="flex flex-col gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-32 w-full bg-surface-container-low rounded-2xl animate-pulse border border-white/5"
              />
            ))}
          </div>
        )}

        {isError && (
          <p className="text-center text-sm text-error">
            Failed to load posts.
          </p>
        )}

        {!isLoading && posts?.length === 0 && (
          <p className="text-center text-sm text-outline">No posts found.</p>
        )}

        {!isLoading &&
          posts?.map((post) => <PostCard key={post.id} post={post} />)}
      </div>

      {!isLoading &&
        (searchTerm ? posts && posts.length >= pageSize : pageCount > 1) && (
          <div className="flex items-center justify-between mt-4">
            <button
              className="px-4 py-2 bg-surface-container-low border border-outline-variant/20 text-on-surface text-xs font-bold rounded-lg hover:bg-surface-container-high transition-colors disabled:opacity-50"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
            <span className="text-xs text-on-surface-variant font-medium">
              Page {page} {searchTerm ? "" : `of ${pageCount}`}
            </span>
            <button
              className="px-4 py-2 bg-surface-container-low border border-outline-variant/20 text-on-surface text-xs font-bold rounded-lg hover:bg-surface-container-high transition-colors disabled:opacity-50"
              disabled={posts?.length ? posts.length < pageSize : true}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        )}
    </main>
  );
};
