export type UserRole = "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT";

export const authRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
];

export const isAuthRoute = (pathname: string) => {
    return authRoutes.some((router: string) => router === pathname);
};

export type RouteConfig = {
    exact: string[];
    pattern: RegExp[];
};

export const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile", "/change-password"],
    pattern: [],
};

export const patientProtectedRoutes: RouteConfig = {
    exact: ["/payment/success"],
    pattern: [/^\/dashboard/], // Matches any path that starts with /dashboard
};

export const doctorProtectedRoutes: RouteConfig = {
    exact: [],
    pattern: [/^\/doctor\/dashboard/], // Matches any path that starts with /doctor/dashboard
};

export const adminProtectedRoutes: RouteConfig = {
    exact: [],
    pattern: [/^\/admin\/dashboard/], // Matches any path that starts with /admin/dashboard
};

// export const superAdminProtectedRoutes: RouteConfig = {
//     pattern: [/^\/admin\/dashboard/], // Matches any path that starts with /super-admin/dashboard
//     exact: [],
// };

export const isRouteMatches = (pathname: string, routes: RouteConfig) => {
    if (routes.exact.includes(pathname)) {
        return true;
    }
    return routes.pattern.some((pattern: RegExp) => pattern.test(pathname));
};

export const getRouteOwner = (
    pathname: string,
): "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT" | "COMMON" | null => {
    if (isRouteMatches(pathname, commonProtectedRoutes)) {
        return "COMMON";
    }

    if (isRouteMatches(pathname, patientProtectedRoutes)) {
        return "PATIENT";
    }

    if (isRouteMatches(pathname, doctorProtectedRoutes)) {
        return "DOCTOR";
    }

    if (isRouteMatches(pathname, adminProtectedRoutes)) {
        return "ADMIN";
    }

    // if (isRouteMatches(pathname, superAdminProtectedRoutes)) {
    //     return "SUPER_ADMIN";
    // }

    return null; // public route
};

export const getDefaultDashboardRoute = (role: UserRole) => {
    if (role === "ADMIN" || role === "SUPER_ADMIN") {
        return "/admin/dashboard";
    }
    if (role === "DOCTOR") {
        return "/doctor/dashboard";
    }
    if (role === "PATIENT") {
        return "/dashboard";
    }

    return "/";
};

export const isValidRedirectForRole = (
    redirectPath: string,
    role: UserRole,
) => {
    const unifySuperAdminAndAdminRole = role === "SUPER_ADMIN" ? "ADMIN" : role;

    role = unifySuperAdminAndAdminRole;

    const routeOwner = getRouteOwner(redirectPath);

    if (routeOwner === null || routeOwner === "COMMON") {
        return true;
    }

    if (routeOwner === role) {
        return true;
    }

    return false;
};
