import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages
// (Overview uklonjen jer ga ne želite prikazivati)
const Pricing = Loader(lazy(() => import('../content/pricing')));
const TermsOfService = Loader(lazy(() => import('../content/terms-of-service')));

// Status
const Status404 = Loader(lazy(() => import('../content/pages/Status/Status404')));
const Status500 = Loader(lazy(() => import('../content/pages/Status/Status500')));
const StatusComingSoon = Loader(
  lazy(() => import('../content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('../content/pages/Status/Maintenance'))
);

const PrivacyPolicy = Loader(lazy(() => import('../content/privacyPolicy')));
const DeletionPolicy = Loader(lazy(() => import('../content/own/deletionPolicy')));
const Landing = Loader(lazy(() => import('../content/landing')));

const baseRoutes = [
  // Root domain -> uvijek na login
  {
    index: true,
    element: <Navigate to="/account/login" replace />
  },

  // Ostale javne stranice
  {
    path: 'free-cmms',
    element: <Landing />
  },
  {
    path: 'pricing',
    element: <Pricing />
  },
  {
    path: 'privacy',
    element: <PrivacyPolicy />
  },
  {
    path: 'deletion-policy',
    element: <DeletionPolicy />
  },
  {
    path: 'terms-of-service',
    element: <TermsOfService />
  },

  // Status stranice
  {
    path: 'status',
    children: [
      { path: '500', element: <Status500 /> },
      { path: 'maintenance', element: <StatusMaintenance /> },
      { path: 'coming-soon', element: <StatusComingSoon /> }
    ]
  },

  // Catch-all 404 (samo jednom)
  {
    path: '*',
    element: <Status404 />
  }
];

export default baseRoutes;
