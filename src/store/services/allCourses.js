import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const allCourses = createApi({
  reducerPath: "allCourses",
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    allCourses: builder.mutation({
      query: () => ({
        url: "/course/all-course",
        method: "GET",
      }),
    }),
  }),
});

export const { useAllCoursesMutation } = allCourses;
