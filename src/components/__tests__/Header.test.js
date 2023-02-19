import { render } from "@testing-library/react";
import Header from "../Header";
import { Provider } from "react-redux";
import store from "../../utils/store";
import { StaticRouter } from "react-router-dom/server";

test("Logo should load on rendering Header component", () => {
  const header = render(
    <StaticRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </StaticRouter>
  );

  const logo = header.getAllByTestId("logo");
  console.log(logo);
  expect(logo[0].src).toBe(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStM2R-rQelW8r208neDHWDITYKee5beT2-fw&usqp=CAU"
  );
  expect(logo[0].alt).toBe("Foodista");
});

test("Online status should be green on rendering Header component", () => {
  const header = render(
    <StaticRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </StaticRouter>
  );

  const onlineStatus = header.getByTestId("online-status");
  console.log(onlineStatus);
  expect(onlineStatus.innerHTML).toBe("<span>🟢</span>");
  //expect(logo[0].alt).toBe("Foodista");
});

test("cart should be 0 items on rendering Header component", () => {
  const header = render(
    <StaticRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </StaticRouter>
  );

  const cart = header.getByTestId("cart");
  expect(cart.innerHTML).toBe("Cart - 0 items ");
  //expect(logo[0].alt).toBe("Foodista");
});
