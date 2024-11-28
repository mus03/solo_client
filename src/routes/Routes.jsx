import {createBrowserRouter} from "react-router-dom"
import Main from "../layouts/Main"
import ErrorPage from "../pages/ErrorPage"
import Login from "../pages/Login"
import Registration from "../pages/Registration"
import Home from "../pages/Home"
import JobDetails from "../pages/JobDetails"
import AddJob from "../pages/AddJob"
import MyPostedJobs from "../pages/MyPostedJobs"
import UpdateJob from "../pages/UpdateJob"
import PrivateRoute from "./PrivateRoute"
import MyBids from "../pages/MyBids"
import BidRequests from "../pages/BidRequests"
import AllJobs from "../pages/AllJobs"

export const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          index: true,
          element: <Home></Home>,
          // loader: () => fetch(`${import.meta.env.VITE_APP_URL}/jobs`)
        },
        {
            path: "/login",
            element: <Login></Login>
          },
          {
            path:"registration",
            element: <Registration></Registration>
          },
          {
            path:"/job/:id",
            element: <PrivateRoute><JobDetails></JobDetails></PrivateRoute>,
            loader:({params})=>fetch(`${import.meta.env.VITE_APP_URL}/job/${params.id}`)
          },
          {
            path:"/update/:id",
            element: <PrivateRoute><UpdateJob></UpdateJob></PrivateRoute>,
            loader:({params})=>fetch(`${import.meta.env.VITE_APP_URL}/job/${params.id}`)
          },
          {
            path:"/add-job",
            element: <PrivateRoute><AddJob></AddJob></PrivateRoute>
          },
          {
            path:"/my-posted-jobs",
            element: <PrivateRoute><MyPostedJobs></MyPostedJobs></PrivateRoute>
          },
          {
            path:"/my-bids",
            element: <PrivateRoute><MyBids></MyBids></PrivateRoute>
          },
          {
            path:"bid-requests",
            element: <PrivateRoute><BidRequests></BidRequests></PrivateRoute>
          },
          {
            path:"jobs",
            element: <AllJobs></AllJobs>,
            loader: () => fetch(`${import.meta.env.VITE_APP_URL}/jobs`)
          },
    ]
    }])


// export default router;