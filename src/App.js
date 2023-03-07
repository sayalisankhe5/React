import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "./components/About";
import ErrorPage from "./components/ErrorPage";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
//import Profile from "./components/Profile";
import Profile from "./components/ProfileClass";
import Shimmer from "./components/Shimmer";
import { Provider } from "react-redux";
import store from "./utils/store";
import Cart from "./components/Cart";

import Login from "./components/Login";

const root = ReactDOM.createRoot(document.getElementById("root"));

const InstaMart = lazy(() => {
  return import("./components/InstaMart");
});
const AboutUS = lazy(() => {
  return import("./components/About");
});

// const Cart = lazy(() => {
//   return import("./components/Cart");
// });

/*const heading = React.createElement(
  "h1",
  {
    id: "ch1",
    className: "chn1",
    key: "h1",
  },
  "Namaste React from Sayali S"
);
console.log(heading);

//headd is a react element
const headd = (
  <h1 id="a1" key="a1">
    jsx heading and this is a react element
  </h1>
);
const heading2 = React.createElement("h2", { key: "h2" }, "Heading2");
const container = React.createElement(
  "div",
  { some: "value", key: "container" },
  [heading, heading2, headd]
);

const HeaderComponent = () => {
  //return <h1>Hi, from react header functional component</h1>;
  return (
    <div>
      <h1>header1 from react component</h1>
      <h2>header2 from react component</h2>
    </div>
  );
};
var num = 10;
const Title = () => <h3>This is title component</h3>;
const Header1Component = () => (
  <div>
    <h1>header1 from react component</h1>
    <h2>header2 from react component</h2>
    {num}

    {headd}
    {1 + 1}
    {heading}
    {heading2}
    <Title />
    {Title()}
    {console.log("console")}
  </div>
);

const appTitle = <h1>Food Villa</h1>;
*/

const AppLayout = () => {
  return (
    <React.Fragment>
      <Provider store={store}>
        <Header />
        {/* <Body /> */}
        <Outlet />
        <Footer />
      </Provider>
    </React.Fragment>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        //element: <About />,
        element: (
          <Suspense fallback={<h1>Wait some time</h1>}>
            <AboutUS />
          </Suspense>
        ),
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantMenu />,
      },
      {
        path: "/instamart",
        element: (
          <Suspense fallback={<Shimmer />}>
            <InstaMart />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          // <Suspense fallback={<Shimmer />}>
          //   <Cart />
          // </Suspense>
          <Cart />
        ),
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
]);

//root.render(heading);
//root.render([container, heading2]);
//root.render(container);
//root.render(<Header1Component />);
//root.render(<AppLayout />);
root.render(<RouterProvider router={appRouter} />);
