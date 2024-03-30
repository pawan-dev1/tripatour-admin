import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const addSkillDetails = createApi({
  reducerPath: "addSkillDetails",
  baseQuery: dynamicBaseQuery,
  tagTypes: ["addSkillDetails"],
  endpoints: (builder) => ({
    getDetails: builder.query({
      query: (body) => ({
        url: `/course/detail-get/${body}`,
        method: "GET",
      }),
      providesTags: ["addSkillDetails"],
    }),
    addSyllabusTitle: builder.mutation({
      query: (body) => ({
        url: "/course/detail-syllabusTitle-add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["addSkillDetails"],
    }),
    editSyllabusTitle: builder.mutation({
      query: (body) => ({
        url: "/course/detail-syllabusTitle-edit",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["addSkillDetails"],
    }),
    deleteSyllabusTitle: builder.mutation({
      query: (body) => ({
        url: "/course/detail-syllabusTitle-delete",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["addSkillDetails"],
    }),
    addSyllabusDesc: builder.mutation({
      query: (body) => ({
        url: "/course/detail-syllabusDesc-add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["addSkillDetails"],
    }),
    editSyllabusDesc: builder.mutation({
      query: (body) => ({
        url: "/course/detail-syllabusDesc-edit",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["addSkillDetails"],
    }),
    deleteSyllabusDesc: builder.mutation({
      query: (body) => ({
        url: "/course/detail-syllabusDesc-delete",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["addSkillDetails"],
    }),
    getSyllabusDesc: builder.query({
      query: (body) => ({
        url: `/course/detail-syllabusDesc-get`,
        method: "POST",
        body,
      }),
      providesTags: ["addSkillDetails"],
    }),
  }),
});

export const {
  useGetDetailsQuery,
  useAddSyllabusTitleMutation,
  useAddSyllabusDescMutation,
  useEditSyllabusTitleMutation,
  useDeleteSyllabusTitleMutation,
  useGetSyllabusDescQuery,
  useEditSyllabusDescMutation,
  useDeleteSyllabusDescMutation,
} = addSkillDetails;
