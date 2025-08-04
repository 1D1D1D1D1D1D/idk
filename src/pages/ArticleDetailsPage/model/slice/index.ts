import { combineReducers } from '@reduxjs/toolkit';
import { ArticleDetailsPageSchema } from '../types';
import { ArticleDetailsRecomendationtReducer } from './ArticleDetailsRecomendationSlice';
import { ArticleDetailsCommentReducer } from './ArticleDetailsCommentSlice';

export const articleDetailsPageReducer = combineReducers({
    comments: ArticleDetailsCommentReducer,
    recommendations: ArticleDetailsRecomendationtReducer,
});
