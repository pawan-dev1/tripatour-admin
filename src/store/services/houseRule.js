import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const houseRule = createApi({
  reducerPath: "DeletedRequest",
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    getHouseRule: builder.query({
      query: (id) => ({
        url: `/rule/getHouseRule/${id}`,
        method: "GET",
      }),
    }),

  }),
});

export const { useGetHouseRuleQuery } =houseRule

