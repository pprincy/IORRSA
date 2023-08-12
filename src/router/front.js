import Front from "@/layouts/Front.vue";

export const FrontRoutes = [
  {
    path: "/",
    component: Front,
    children: [
      {
        path: "/seller-rsa-agreement",
        name: "Terms",
        component: () =>
          import(/* webpackChunkName: "terms" */ "@/views/Terms"),
      },
      {
        path: "/faqs",
        name: "FAQs",
        component: () => import(/* webpackChunkName: "faqs" */ "@/views/FAQs"),
      },
    ],
  },
  {
    path: "/:client_id",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home"),
  },
];
