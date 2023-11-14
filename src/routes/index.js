import { lazy } from 'react';

// use lazy for better code splitting
// const Dashboard = lazy(() => import('../pages/Dashboard'));
// const Products = lazy(() => import('../pages/Products'));
// const ProductDetails = lazy(() => import('../pages/ProductDetails'));
// const Category = lazy(() => import('../pages/Category'));
// const Staff = lazy(() => import('../pages/Staff'));
// const Customers = lazy(() => import('../pages/Customers'));
const CustomersList = lazy(() => import('../pages/CustomersList'));
const MoviesList = lazy(() => import('../pages/MoviesList'));
// const Setting = lazy(() => import("../pages/Setting"));

/*
//  * ⚠ These are internal routes!
//  * They will be rendered inside the app, using the default `containers/Layout`.
//  * If you want to add a route to, let's say, a landing page, you should add
//  * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
//  * are routed.
//  *
//  * If you're looking for the links rendered in the SidebarContent, go to
//  * `routes/sidebar.js`
 */

const routes = [
  {
    path: '/dashboard',
    component: CustomersList,
  },
  // {
  //   path: '/products',
  //   component: Products,
  // },
  // {
  //   path: '/product/:id',
  //   component: ProductDetails,
  // },
  // {
  //   path: '/category',
  //   component: Category,
  // },
  // {
  //   path: '/customers',
  //   component: Customers,
  // },
  // {
  //   path: '/customer-order/:id',
  //   component: CustomerOrder,
  // },
  // {
  //   path: '/our-staff',
  //   component: Staff,
  // },
  // {
  //   path: '/orders',
  //   component: Orders,
  // },
  // {
  //   path: '/order/:id',
  //   component: OrderInvoice,
  // },
  // // {
  // //   path: '/coupons',
  // //   component: Coupons,
  // // },
  // { path: '/setting', component: EditProfile },
  // {
  //   path: '/404',
  //   component: Page404,
  // },
  // {
  //   path: '/edit-profile',
  //   component: EditProfile,
  // },
  {
    path: '/customers-list',
    component: CustomersList,
  },  {
    path: '/movies-list',
    component: MoviesList,
  },
];

export default routes;
