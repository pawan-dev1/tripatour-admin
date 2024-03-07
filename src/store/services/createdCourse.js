import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const createdCourses = createApi({
  reducerPath: "createdCourses",
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    createdCourses: builder.mutation({
      query: (body) => ({
        url: "/course/create-course",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreatedCoursesMutation } = createdCourses;
