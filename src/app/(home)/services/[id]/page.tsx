"use client";
import { postApi, serviceApi } from "@/api-client";
import PostItem from "@/components/Post/post";
import { Post } from "@/models/post.type";
import { useEffect, useState } from "react";
import "./post.scss";
interface IServiceProps {
  params: {
    id: string;
  };
}
const ListSPost = ({ params }: IServiceProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    try {
      setIsLoading(true);
      const fetchService = async () => {
        const { data } = await postApi.getAll();
        setPosts(
          data!?.filter(
            (post: Post) => post.service._id === params.id && !post.deleteAt
          )
        );
      };
      fetchService();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return (
    <div className="wrapper">
      <div className="list__service">
        {isLoading ? (
          <p style={{color: "white"}}>Loading...</p>
        ) : posts?.length! > 0 ? (
          posts?.map((post: Post) => {
            return <PostItem data={post} />;
          })
        ) : (
          <p style={{ color: "white" }}>Không có bài đăng nào !</p>
        )}
      </div>
    </div>
  );
};

export default ListSPost;
