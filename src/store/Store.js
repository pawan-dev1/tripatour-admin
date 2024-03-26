import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { loginAuth } from "./services/login";
import { signUp } from "./services/signUpService";
import { getAllSubAdmin } from "./services/getAllSubAdmin";
import { createNewStudent } from "./services/createNewStudent";
import { getAllStudent } from "./services/getAllStudent";
import { pendingFees } from "./services/pendingFees";
import { payFees } from "./services/payFees";
import { getAllTeamMember } from "./services/teamMember";
import { getFaqServices } from "./services/faq";
import { courseCategories } from "./services/courseCategories";
import { courseCategorySkills } from "./services/courseCategorySkills";
import { clientQuery } from "./services/clientFeedback";
import { typeOfCourse } from "./services/typeOfCourse";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [courseCategories.reducerPath]: courseCategories.reducer,
    [courseCategorySkills.reducerPath]: courseCategorySkills.reducer,
    [typeOfCourse.reducerPath]: typeOfCourse.reducer,
    [clientQuery.reducerPath]: clientQuery.reducer,
    [loginAuth.reducerPath]: loginAuth.reducer,
    [signUp.reducerPath]: signUp.reducer,
    [getAllSubAdmin.reducerPath]: getAllSubAdmin.reducer,
    [createNewStudent.reducerPath]: createNewStudent.reducer,
    [getAllStudent.reducerPath]: getAllStudent.reducer,
    [pendingFees.reducerPath]: pendingFees.reducer,
    [payFees.reducerPath]: payFees.reducer,
    [getAllTeamMember.reducerPath]: getAllTeamMember.reducer,
    [getFaqServices.reducerPath]: getFaqServices.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(courseCategories.middleware)
      .concat(courseCategorySkills.middleware)
      .concat(clientQuery.middleware)
      .concat(typeOfCourse.middleware)
      .concat(loginAuth.middleware)
      .concat(signUp.middleware)
      .concat(getAllSubAdmin.middleware)
      .concat(createNewStudent.middleware)
      .concat(getAllStudent.middleware)
      .concat(pendingFees.middleware)
      .concat(payFees.middleware)
      .concat(getAllTeamMember.middleware)
      .concat(getFaqServices.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
