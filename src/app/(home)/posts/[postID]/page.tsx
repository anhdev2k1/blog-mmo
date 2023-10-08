"use client";

import { postApi } from "@/api-client";
import { Post } from "@/models/post.type";
import { useEffect, useState } from "react";
import "./post.scss"
interface IPostDetailProps {
  params: {
    postID: string;
  };
}
type Props = {
  params: {postID: string }
}

const PostDetail = ({ params }: IPostDetailProps) => {
  const [post, setPost] = useState<Post>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    try {
      setLoading(true);
      const fetchPostDetail = async () => {
        const { data } = await postApi.getById(params.postID);
        setPost(data);
      };
      fetchPostDetail();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <div className="wrapper">
      <div 
        className="post__container"
        dangerouslySetInnerHTML={{ __html: post?.content! }}
      ></div>
    </div>
  );
};

export default PostDetail;
