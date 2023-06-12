import { createBrowserRouter } from "react-router-dom"
import { Suspense, lazy } from "react"
import { App, appLoader } from "./App"

export const BASE_URL = "http://localhost:3000/"

const Root = lazy(() => import("./Pages/Root"))
const Dashboard = lazy(() => import("./Pages/Dashboard"))
const Letter = lazy(() => import("./Pages/Letter"))
const Setting = lazy(() => import("./Pages/Setting"))
const CreateLetter = lazy(() => import("./Pages/Letters/CreateLetter"))
const DetailLetter = lazy(() => import("./Pages/Letters/DetailLetter"))
const UpdateLetter = lazy(() => import("./Pages/Letters/UpdateLetter"))

const Disposition = lazy(() => import("./Pages/Disposition"))
const DetailDisposition = lazy(() => import("./Pages/Disposition/Show"))

const Report = lazy(() => import("./Pages/Report"))
const PrintReport = lazy(() => import("./Pages/Letters/PrintReport"))

const User = lazy(() => import("./Pages/User"))
const CreateUser = lazy(() => import("./Pages/Users/CreateUser"))
const EditUser = lazy(() => import("./Pages/Users/EditUser"))

const router = createBrowserRouter([
    {
        path: "/login",
        element: <App />,
        loader: appLoader
    },
    {
        path: "/",
        element: (
            <Suspense>
                <Root />
            </Suspense>
        ),
        children: [
            {
                path: "dashboard",
                element: (
                    <Suspense>
                        <Dashboard />
                    </Suspense>
                )
            },
            {
                path: "letter/:type",
                element: (
                    <Suspense>
                        <Letter />
                    </Suspense>
                )
            },
            {
                path: "letter/:type/create",
                element: (
                    <Suspense fallback="">
                        <CreateLetter />
                    </Suspense>
                )
            },
            {
                path: "letter/:type/:id",
                element: (
                    <Suspense fallback="">
                        <DetailLetter />
                    </Suspense>
                )
            },
            {
                path: "letter/:type/:id/edit",
                element: (
                    <Suspense>
                        <UpdateLetter />
                    </Suspense>
                )
            },
            {
                path: "user",
                element: (
                    <Suspense fallback="">
                        <User />
                    </Suspense>
                )
            },
            {
                path: "user/create",
                element: (
                    <Suspense>
                        <CreateUser />
                    </Suspense>
                )
            },
            {
                path: "user/:id/edit",
                element: (
                    <Suspense>
                        <EditUser />
                    </Suspense>
                )
            },
            {
                path: "disposition",
                element: (
                    <Suspense>
                        <Disposition />
                    </Suspense>
                )
            },
            {
                path: "disposition/:id",
                element: (
                    <Suspense>
                        <DetailDisposition />
                    </Suspense>
                )
            },
            {
                path: "report",
                element: (
                    <Suspense>
                        <Report />
                    </Suspense>
                )
            },
            {
                path: "setting",
                element: (
                    <Suspense fallback="">
                        <Setting />
                    </Suspense>
                )
            }
        ],
        loader: async (args) => {
            const root = await import("./Pages/Root")
            return root.rootLoader(args)
        }
    },
    {
        path: "/report/print",
        element: (
            <Suspense>
                <PrintReport />
            </Suspense>
        )
    }
])

export default router
