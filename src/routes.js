import Homepage from './components/Retail';

import AdminHomepage from './components/Admin';

const routeOptions = [
  { component: Homepage, path: '/', exact: true },
  { component: AdminHomepage, path: '/admin/', exact: true }
];

export default routeOptions;
