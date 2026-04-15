import { ArrowLeft, MessageSquare } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { usePost } from "../features/posts/hooks/usePosts";
import { useComments } from "../features/comments/hooks/useComments";

export const PostDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
  } = usePost(id as string);
  const {
    data: comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useComments(id as string);

  return (
    <main className="pt-24 pb-32 px-6 flex flex-col gap-8 max-w-2xl mx-auto w-full font-body">
      {/* Back Navigation */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-primary hover:text-primary-container transition-colors w-fit text-sm font-bold tracking-widest uppercase font-manrope"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      {/* Post Section */}
      <article className="bg-surface-container-low rounded-2xl border border-white/5 premium-shadow p-6 md:p-8 relative overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/5 blur-[80px] rounded-full pointer-events-none"></div>

        {isPostLoading && (
          <div className="animate-pulse flex flex-col gap-4">
            <div className="h-8 bg-surface-variant rounded w-3/4"></div>
            <div className="h-4 bg-surface-variant rounded w-full"></div>
            <div className="h-4 bg-surface-variant rounded w-5/6"></div>
          </div>
        )}
        {isPostError && (
          <p className="text-error text-sm">Failed to load the post details.</p>
        )}

        {post && (
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary uppercase">
                {post.id}
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-on-surface-variant font-medium">
                  User {post.userId}
                </span>
                <span className="text-[10px] text-outline font-bold uppercase tracking-widest">
                  Original Poster
                </span>
              </div>
            </div>
            <h1 className="font-headline text-2xl md:text-3xl font-extrabold text-on-surface leading-tight capitalize mb-4">
              {post.title}
            </h1>
            <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">
              {post.body}
            </p>
          </div>
        )}
      </article>

      {/* Comments Section */}
      <section className="flex flex-col gap-6 mt-4">
        <div className="flex items-center gap-3">
          <MessageSquare size={20} className="text-primary" />
          <h2 className="font-manrope text-xl font-bold tracking-tight text-on-surface">
            Discussion
          </h2>
          <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-bold rounded-full ml-auto">
            {comments?.length || 0}
          </span>
        </div>

        <div className="flex flex-col gap-4 relative">
          {/* Vertical threading line to visually connect comments */}
          <div className="absolute top-2 bottom-2 left-6 w-px bg-linear-to-b from-primary/30 to-transparent pointer-events-none z-0"></div>

          {isCommentsLoading && (
            <div className="text-center text-sm text-outline py-4">
              Loading comments...
            </div>
          )}
          {isCommentsError && (
            <p className="text-center text-sm text-error">
              Failed to load comments.
            </p>
          )}

          {comments?.map((comment) => (
            <div key={comment.id} className="relative z-10 pl-14">
              {/* Connecting nub */}
              <div className="absolute left-[24px] top-6 w-8 h-px bg-primary/30"></div>
              <div className="absolute left-[20px] top-5 w-2 h-2 rounded-full border border-primary bg-surface shadow-[0_0_8px_rgba(192,193,255,0.4)]"></div>

              <div className="bg-surface-container rounded-xl p-5 border border-white/5 shadow-lg transition-transform hover:-translate-y-0.5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-on-surface">
                      {comment.name}
                    </span>
                    <span className="text-[10px] text-primary">
                      {comment.email}
                    </span>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                  {comment.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
