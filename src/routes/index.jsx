import { createBrowserRouter } from "react-router-dom";
import LayoutPrimary from "../layout";
import {
  addHouseRuleRoute,
  addPackageDetail,
  categoryRoutes,
  dashBoardRoute,
  editHouseRuleRoute,
  editPackageDetail,
  favRoutes,
  feedbackRoute,
  houseRuleRoute,
  loginRoute,
  packageRoutes,

} from "./PagesRoutes";
import Dashboard from "../pages/dashboard";
import LoginLayout from "../pages/auth";
import Login from "../pages/auth/Login";
import PageNotFound from "../pages/pageNotFound";
import Packages from "../pages/tourPackages/Packages";
import Favourite from "../pages/favourite/Favourite";
import AddPackageDetail from "../pages/addPackageDetail/AddPackageDetail";
import Category from "../pages/category";
import EditPackageDetail from "../pages/addPackageDetail/EditPackageDetail";
import HouseRule from "../pages/houseRule/HouseRule";
import AddHouseRule from "../pages/houseRule/AddHouseRule";
import Feedback from "../pages/feedback/Feesback";
import EditHouseRules from "../pages/houseRule/EditHouseRules";

const userType = localStorage.getItem("userType");


export const router = createBrowserRouter([
  {
    path: dashBoardRoute,
    element: <LayoutPrimary />,
    children: [
      {
        path: dashBoardRoute,
        element: <Dashboard />,
      },
      {
        path: categoryRoutes,
        element: <Category />,
      },
   
     
      {
        path:packageRoutes ,
        element: <Packages />,
      },
      {
        path:feedbackRoute ,
        element: <Feedback />,
      },
      {
        path:favRoutes ,
        element: <Favourite />,
      },
      {
        path:editPackageDetail,
        element: <EditPackageDetail/>,
      },
      {
        path:addPackageDetail,
        element: <AddPackageDetail />,
      },
     
      {
        path:houseRuleRoute,
        element: <HouseRule />,
      },
      {
        path:editHouseRuleRoute,
        element: <EditHouseRules />,
      },
      {
        path:addHouseRuleRoute,
        element: <AddHouseRule />,
      },
      {
        
        path: "*",
        element: <PageNotFound />,
      },
    
    ],
  },
  {
    path: "/",
    element: <LoginLayout />,
    children: [
      {
        path: loginRoute,
        element: <Login />,
      },
    ],
  },
]);
