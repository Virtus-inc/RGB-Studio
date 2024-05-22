export default defineNuxtRouteMiddleware((to, from) => {
    const protectedRoutes = ['/profile'];

    const isProtectedRoute = (path: string) => {
        return protectedRoutes.includes(path);
    };

    const { data } = useUserData();

    if (isProtectedRoute(to.path) && !data.value) {
        return navigateTo('/auth/login');
    }
});