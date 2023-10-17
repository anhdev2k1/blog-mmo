
import { postApi } from "@/api-client";
import UpdatePost from "@/components/UpdatePost";
import { Post } from "@/models/post.type";
import { deletePost as deleteToRedux } from "@/redux/features/posts";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button, Modal, Table, Space, Tag, notification } from "antd";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Posts = () => {
  const { push } = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postDetail, setPostDetail] = useState<Post>();
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useAppDispatch()
  const getPosts = useAppSelector((state) => state.postReducer.posts);
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = (post: Post) => {
    push(`/dashboard/posts/update?id=${post._id}`)
  }
  const handleDelete = async (post: Post) => {
    try {
      dispatch(deleteToRedux({postID: post._id as string}))
      const deletePost = await postApi.deletePost(post._id as string)
      api.success({
        message: `${deletePost.msg}`
      })
    } catch (error) {
      console.log(error);
      
    }
    
  }
  const columns: ColumnsType<Post> = [
    {
      title: "Chủ đề",
      dataIndex: "title",
      key: "title",
      render: (title) => <p>{title}</p>,
    },
    {
      title: "Dịch vụ",
      dataIndex: "service",
      key: "service",
      render: (service) => <Tag color="green">{service.name}</Tag>,
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      render: (slug) => <p>{slug}</p>,
    },

    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleUpdate(record)}>Cập nhật</Button>
          <Button danger onClick={() => handleDelete(record)}>Xoá</Button>
        </Space>
      ),
    },
  ];
  return (
    <>
    {contextHolder}
      <Button
        type="primary"
        onClick={() => push("/dashboard/posts/create")}
        className="btn"
      >
        Thêm bài đăng
      </Button>

      <Table columns={columns} dataSource={getPosts} loading ={getPosts.length > 0 ? false : true}/>

      <Modal
        title="Cập nhật dịch vụ"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <UpdatePost post={postDetail!} />
      </Modal>
    </>
  );
};

export default Posts;
