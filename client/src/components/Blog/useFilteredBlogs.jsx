import { useCallback } from "react";
import { useMemo } from "react";
import { useState } from "react";

export default function useFilteredBlogs({ data, user }) {
  //filter state
  const [filter, setFilter] = useState("all");

  //functions for all filter state
  const getAllBlogs = useCallback(() => {
    return data?.blogs;
  }, [data]);

  const getMyBlogs = useCallback(() => {
    return data?.blogs.filter((blog) => blog?.User?.userId === user?.userId);
  }, [data, user]);

  const getOtherBlogs = useCallback(() => {
    return data?.blogs.filter((blog) => blog?.User?.userId !== user?.userId);
  }, [data, user]);

  const getCommentedBlogs = useCallback(() => {
    return data?.blogs.reduce((acc, currentBlog) => {
      let comments = currentBlog?.Comments;

      if (comments.length > 0) {
        const isCommented = comments.some(
          (comment) => comment?.User?.userId === user?.userId,
        );

        if (isCommented) acc.push(currentBlog);
      }

      return acc;
    }, []);
  }, [data, user]);

  //returning blogs based on state used memo hook for caching
  const filteredBlogs = useMemo(() => {
    switch (filter) {
      case "my":
        return getMyBlogs();
      case "other":
        return getOtherBlogs();
      case "commentedByMe":
        return getCommentedBlogs();
      default:
        return getAllBlogs();
    }
  }, [getAllBlogs, getCommentedBlogs, getMyBlogs, getOtherBlogs, filter]);

  return {
    filteredBlogs,
    filter,
    setFilter,
  };
}
