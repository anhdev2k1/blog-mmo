interface IParams{
    params: {
        post: string
    }
}
const Post = ({params} : IParams) => {
    return ( <>This is a Post {params.post}</> );
}
 
export default Post;