import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import Body from "../Body";
import { StaticRouter } from "react-router-dom/server";
import store from "../../utils/store";

global.fetch = jest.fn(() => {
  Promise.resolve();
});

test("search results on homepage", () => {
  const body = render(
    <StaticRouter>
      <Provider store={store}>
        <Body />
      </Provider>
    </StaticRouter>
  );
});
