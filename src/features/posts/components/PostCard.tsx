import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Post } from "../types";

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link to={`/posts/${post.id}`} className="block group">
      <div className="bg-surface-container-low rounded-2xl border border-white/5 premium-shadow p-5 transition-all active:scale-[0.98]">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-headline font-bold text-lg leading-snug capitalize group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          <div className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <ArrowRight size={18} />
          </div>
        </div>
        <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3">
          {post.body}
        </p>
      </div>
    </Link>
  );
};
