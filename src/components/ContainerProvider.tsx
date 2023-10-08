import { postApi, serviceApi, userApi } from "@/api-client";
import { getPosts } from "@/redux/features/posts";
import { getServices } from "@/redux/features/services";
import { getUser } from "@/redux/features/user";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";

const ContainerProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data } = await userApi.getMe();
      dispatch(getUser(data!));
    };
    const getAllService = async () => {
      const { data } = await serviceApi.getAll();
      dispatch(getServices(data!.filter((item) => !item.deleteAt)));
    };
    const getAllPosts = async () => {
      const { data } = await postApi.getAll();
      dispatch(getPosts(data!.filter((post) => !post.deleteAt)));
    };
    // Promise.all([getCurrentUser(), getAllService(), getAllPosts()]);
    getCurrentUser()
    getAllService()
    getAllPosts()
  }, []);
  return <>{children}</>;
};

export default ContainerProvider;
