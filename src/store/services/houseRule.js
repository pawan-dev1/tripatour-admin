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
    addHouseRule: builder.mutation({
      query: (body) => ({
        url: `/rule/addHouseRule`,
        method: "POST",
        body,
      }),
    }),

  }),
});

export const { useGetHouseRuleQuery,useAddHouseRuleMutation } =houseRule

