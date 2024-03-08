import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const addCourseCardDesc = createApi({
  reducerPath: "addCourseCardDesc",
  baseQuery: dynamicBaseQuery,
  tagTypes: ["Add Course Card Description"],
  endpoints: (builder) => ({
    addCourseCardDesc: builder.mutation({
      query: (body) => ({
        url: "/course/card-desc",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Add Course Card Description"],
    }),
    getCourseCardDesc: builder.query({
      query: (body) => ({
        url: "/course/get-card-detail",
        method: "POST",
        body,
      }),
      providesTags: ["Add Course Card Description"],
    }),
    courseCardDetailsDel: builder.mutation({
      query: (body) => ({
        url: "/course/card-desc-delete",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Add Course Card Description"],
    }),
    courseCardDetailsEdit: builder.mutation({
      query: (body) => ({
        url: "/course/card-desc-edit",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Add Course Card Description"],
    }),
    
    addCourseCardDes: builder.mutation({
      query: (body) => ({
        url: "/course/add-card-detail",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Add Course Card Description"],
    }),
    
  }),
});

export const {
  useAddCourseCardDescMutation,
  useGetCourseCardDescQuery,
  useCourseCardDetailsDelMutation,
  useAddCourseCardDesMutation,
  useCourseCardDetailsEditMutation
} = addCourseCardDesc;
