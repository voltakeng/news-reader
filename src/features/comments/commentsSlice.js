// Import createAsyncThunk and createSlice here.
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; 

// Create loadCommentsForArticleId here.
export const loadCommentsForArticleId = createAsyncThunk(
  'comments/loadCommentsForArticleId',
  async (id, thunkAPI) => {
    const response = await fetch(`api/articles/${id}/comments`);
    const json = await response.json(); 
    return json;
  }
)

// Create postCommentForArticleId here.

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    // Add initial state properties here.
    byArticleId: ["test"],
    isLoadingComments: false, 
    failedToLoadComments: false
  },
  // Add extraReducers here.
  extraReducers: {
    [loadCommentsForArticleId.pending]: (state, action) => {
      isLoadingComments = true; 
      failedToLoadComments = false; 
    },
    [loadCommentsForArticleId.fulfulled]: (state, action) => {
      isLoadingComments = false; 
      failedToLoadComments = false; 
      state.byArticleId.push(action.payload.articleId); 
    },
    [loadCommentsForArticleId.rejected]: (state, action) => {
      isLoadingComments = false; 
      failedToLoadComments = true; 
    }
  }
});

export const selectComments = (state) => state.comments.byArticleId;
export const isLoadingComments = (state) => state.comments.isLoadingComments;
export const createCommentIsPending = (state) => state.comments.createCommentIsPending;

export default commentsSlice.reducer;
