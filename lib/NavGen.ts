interface IDynamicRoute {
    pathName: string,
    pathLoc: string
}
export const NavGen = (tillPath: string, dynamicRoute: IDynamicRoute) => {
    const DashboardNav  = {
        name: 'Dashboard',
        path: '/dashboard',
        highlight: tillPath === '/dashboard'
    }
    const SubjectNav  = {
        name: dynamicRoute.pathName,
        path: `/subjects/${dynamicRoute.pathLoc}`,
        highlight: tillPath === `/subjects/${dynamicRoute.pathLoc}`
    }
    const ManageNav  = {
        name: 'Manage',
        path: `/manage/${dynamicRoute.pathLoc}`,
        highlight: tillPath === `/manage/${dynamicRoute.pathLoc}`
    }
    const GenerateNav  = {
        name: 'Generate',
        path: `/generate/${dynamicRoute.pathLoc}`,
        highlight: tillPath === `/generate/${dynamicRoute.pathLoc}`
    }
    const allNavs = [DashboardNav, SubjectNav, ManageNav, GenerateNav];
    //const lastNav = allNavs.find(navs => navs.path === tillPath)
    return allNavs.slice(0, allNavs.findIndex(navs => navs.highlight) + 1);
}