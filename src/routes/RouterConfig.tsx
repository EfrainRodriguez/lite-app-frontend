import {
  lazy,
  LazyExoticComponent,
  Fragment,
  Suspense,
  ReactNode
} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RouteProgress from '@/components/RouteProgress';

interface GuardProps {
  children: ReactNode;
}

interface RouteObject {
  path: string;
  element: LazyExoticComponent<() => JSX.Element>;
  children?: RouteObject[];
  guard?: LazyExoticComponent<(props: GuardProps) => JSX.Element> | undefined;
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: lazy(
      async () => await import('@/components/layouts/DashboardLayout')
    ),
    children: [
      {
        path: '',
        element: lazy(async () => await import('@/pages/Home'))
      },
      {
        path: 'companies',
        element: lazy(async () => await import('@/pages/Company'))
      },
      {
        path: 'companies/:id',
        element: lazy(async () => await import('@/pages/CompanyProducts'))
      },
      {
        path: 'products',
        element: lazy(async () => await import('@/pages/Product'))
      }
    ],
    guard: lazy(async () => await import('@/guards/AuthGuard'))
  },
  {
    path: '/login',
    element: lazy(async () => await import('@/pages/Login'))
  },
  {
    path: '*',
    element: lazy(async () => await import('@/pages/Page404'))
  }
];

const renderRoutes = (routes: RouteObject[]) => {
  return routes.map(({ path, element, children, guard }) => {
    const Element = element || Fragment;
    const Guard = guard || Fragment;
    return (
      <Route
        key={path}
        path={path}
        element={
          <Suspense fallback={<RouteProgress />}>
            <Guard>
              <Element />
            </Guard>
          </Suspense>
        }
      >
        {children && renderRoutes(children)}
      </Route>
    );
  });
};

const RouterConfig = () => {
  return (
    <BrowserRouter>
      <Routes>{renderRoutes(routes)}</Routes>
    </BrowserRouter>
  );
};

export default RouterConfig;
