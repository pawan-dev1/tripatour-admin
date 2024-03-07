import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const courseDetails = createApi({
  reducerPath: "courseDetails",
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    courseDetails: builder.mutation({
      query: (body) => ({
        url: "add-courses/detail",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCourseDetailsMutation } = courseDetails;
