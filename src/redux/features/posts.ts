import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Post } from "@/models/post.type";
// Define a type for the slice state
interface PostState {
  posts: Post[];
}

// Define the initial state using that type
const initialState: PostState = {
  posts: [],
};

export const postSlice = createSlice({
  name: "posts",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts = [...state.posts, action.payload];
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    updatePost: (state, action: PayloadAction<Post>) => {
      const postIndex = state.posts.findIndex((post: Post) => {
        return post._id === action.payload._id;
      });
      if (postIndex < 0) {
        return;
      }
      state.posts[postIndex] = action.payload;
    },
    deletePost: (state, action: PayloadAction<{ postID: string }>) => {
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload.postID
      );
    },
  },
});

export const { getPosts, addPost, updatePost, deletePost } =
  postSlice.actions;
export default postSlice.reducer;
