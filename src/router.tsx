import { createBrowserRouter } from "react-router-dom"
import { Suspense, lazy } from "react"
import App, { appLoader } from "./App"

const Root = lazy(() => import("./Pages/Root"))
const Dashboard = lazy(() => import("./Pages/Dashboard"))
const Letter = lazy(() => import("./Pages/Letter"))
const Setting = lazy(() => import("./Pages/Setting"))
const CreateLetter = lazy(() => import("./Pages/Letters/CreateLetter"))
const DetailLetter = lazy(() => import("./Pages/Letters/DetailLetter"))
const UpdateLetter = lazy(() => import("./Pages/Letters/UpdateLetter"))

const User = lazy(() => import("./Pages/User"))
const CreateUser = lazy(() => import("./Pages/Users/CreateUser"))

const router = createBrowserRouter([
    {
        path: "/login",
        element: <App />,
        loader: appLoader
    },
    {
        path: "/",
        element: (
            <Suspense fallback={""}>
                <Root />
            </Suspense>
        ),
        children: [
            {
                path: "dashboard",
                element: (
                    <Suspense fallback={""}>
                        <Dashboard />
                    </Suspense>
                )
            },
            {
                path: "letter/:type",
                element: (
                    <Suspense fallback={""}>
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
                path: "setting",
                element: (
                    <Suspense fallback="">
                        <Setting />
                    </Suspense>
                )
            }
        ],
        loader: async () => {
            const root = await import("./Pages/Root")
            return root.rootLoader()
        }
    }
])

export default router
