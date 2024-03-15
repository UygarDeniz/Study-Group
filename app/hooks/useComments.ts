import{ useState, useEffect } from "react";
type Author = {
  id: number;
  name: string;
};

type CommentDislike = {
  id: number;
  createdAt: string;
  userId: number;
  commentId: number;
};

type CommentLike = {
  id: number;
  createdAt: string;
  userId: number;
  commentId: number;
};

type Comment = {
  id: number;
  createdAt: string;
  updatedAt: string;
  content: string;
  authorId: number;
  postId: number;
  author: Author;
  CommentDislike: CommentDislike[];
  CommentLike: CommentLike[];
};

type Post = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  authorId: number;
  groupId: number;
  author: Author;
  Comment: Comment[];
};
export default function usePost(
  pageNumber: number = 1,
  groupId: string,
  postId: string
) {
  const [results, setResults] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setIsError(true);
    setLoading(true);
    setError({});

    const controller = new AbortController();
    const signal = controller.signal;

    const res = fetch(
      `/api/groups/${groupId}/posts/${postId}?page=${pageNumber}`,
      { signal }
    )
      .then((res) => res.json())
      .then((data) => {
        setResults((prevResults) => {
          if (pageNumber === 1) return data;

          return {
            ...prevResults,
            Comment: [...prevResults.Comment, ...data.Comment],
          };
        });
        setHasNextPage(Boolean(data.Comment.length));
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          return;
        } else {
          setIsError(true);
          setError(err);
        }
      });

    return () => {
      controller.abort();
      
    };
  }, [pageNumber]);
  return { results, loading, isError, error, hasNextPage };
}
