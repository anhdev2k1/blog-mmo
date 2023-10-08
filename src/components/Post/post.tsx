import { Post } from "@/models/post.type";
import "./post.scss";
import convertDateTime from "@/ultis/convertDateTime";
import Link from "next/link";
interface IPostProps {
  data: Post;
}
const Post = ({ data }: IPostProps) => {
  const currentTime = new Date();
  const startTime = new Date(data.createdAt!);

  const differenceInMilliseconds = currentTime.getTime() - startTime.getTime();

  return (
    <Link href={`/posts/${data._id}`} className="posts__item" style={{textDecoration: "none"}}>
      <div className="posts__item-header">
        <div className="posts__header-circle"></div>
        <span className="posts__header-time">
          {convertDateTime(differenceInMilliseconds)}
        </span>
      </div>
      <h3 className="posts__item-heading">{data.title}</h3>
      <div className="posts__item-footer">
        <p className="posts__footer-desc">{data.service.name}</p>
        <button className="button-home">Read it 🚀</button>
      </div>
    </Link>
  );
};

export default Post;
