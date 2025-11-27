import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import configs from '../../configs';
import {API_END_POINTS, REDUCER_PATHS} from '../../constants/server';
import {REQUEST_METHODS} from '../../helpers/constants';
import {
  IAddChapterApiResponse,
  IApiResponse,
  IChapterApiResponse,
  IChapterPreviewApiResponse,
  IEditChapterApiResponse,
  ISelectTemplateApiResponse,
  IStoryApiResponse,
  ITemplateListApiResponse,
} from '../../types/utils';
import {getApiHeader} from '../../utils';

/**
 * Name: chapterApi
 * Desc: Function to manage chapter API calls.
 */
export const chapterApi = createApi({
  reducerPath: REDUCER_PATHS.ChapterApi,
  baseQuery: fetchBaseQuery({
    baseUrl: configs.baseUrl,
    prepareHeaders: headers => {
      return getApiHeader(headers);
    },
  }),
  endpoints: builder => ({
    chapterList: builder.mutation<IChapterApiResponse, string>({
      query() {
        return {
          url: API_END_POINTS.chaptersList,
          method: REQUEST_METHODS.GET,
        };
      },
    }),
    templateList: builder.mutation<ITemplateListApiResponse, string>({
      query() {
        return {
          url: API_END_POINTS.getTemplates,
          method: REQUEST_METHODS.GET,
        };
      },
    }),
    addChapter: builder.mutation<IAddChapterApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.addChapter,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
    saveChapterQuestions: builder.mutation<IStoryApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.saveChapterQuestions,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
    saveFeaturedImage: builder.mutation<IApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.saveFeaturedImage,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
    updateStory: builder.mutation<IStoryApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.updateStory,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
    deleteStory: builder.mutation<IApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.deleteStory + data,
          method: REQUEST_METHODS.DELETE,
        };
      },
    }),
    chapterPreview: builder.mutation<IChapterPreviewApiResponse, string>({
      query(data) {
        return {
          url: API_END_POINTS.previewChapter + data,
          method: REQUEST_METHODS.GET,
        };
      },
    }),
    selectTemplate: builder.mutation<ISelectTemplateApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.selectTemplate,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
    editChapter: builder.mutation<IEditChapterApiResponse, string>({
      query(data) {
        return {
          url: API_END_POINTS.editChapter + data,
          method: REQUEST_METHODS.GET,
        };
      },
    }),
    deleteAttachment: builder.mutation<IApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.deleteAttachment + data,
          method: REQUEST_METHODS.DELETE,
        };
      },
    }),
    updateStoryStatus: builder.mutation<IApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.updateStoryStatus,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
    updateChapter: builder.mutation<IApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.updateChapter,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
    addStoryAttachment: builder.mutation<IStoryApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.addStoryAttachment,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
    deleteChapter: builder.mutation<IApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.deleteChapter + data,
          method: REQUEST_METHODS.DELETE,
        };
      },
    }),
  }),
});

export const {
  useChapterListMutation,
  useTemplateListMutation,
  useAddChapterMutation,
  useSaveChapterQuestionsMutation,
  useSaveFeaturedImageMutation,
  useUpdateStoryMutation,
  useDeleteStoryMutation,
  useChapterPreviewMutation,
  useSelectTemplateMutation,
  useEditChapterMutation,
  useDeleteAttachmentMutation,
  useUpdateStoryStatusMutation,
  useUpdateChapterMutation,
  useAddStoryAttachmentMutation,
  useDeleteChapterMutation,
} = chapterApi;
