import { withDynamicImport } from "../hooks/withDynamicImport";

export const DetailPage = withDynamicImport(() => import("./user/Detail"), true)

export const HomePage = withDynamicImport(() => import("./user/Home"),true)

export const LoginPage = withDynamicImport(() => import("./user/Login"),true)

export const SearchPage = withDynamicImport(() => import("./user/Search"),true)

export const SignUpPage = withDynamicImport(() => import("./user/SignUp"),true)

export const TrackingPage = withDynamicImport(() => import("./user/Tracking"), true)

export const TutorialPage = withDynamicImport(() => import("./user/Tutorial"), true)