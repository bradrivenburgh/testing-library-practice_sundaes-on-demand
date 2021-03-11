import { screen, render } from "@testing-library/react";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";

describe("OrderEntry", () => {
  test("handles error for scoops and toppings routes", async () => {
    server.restoreHandlers(
      rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
        ctx.status(500);
      }),
      rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
        ctx.status(500);
      })
    );

    render(<OrderEntry />);

    const alerts = await screen.findAllByRole("alert", {
      name: "An unexpected error occurred. Please try again later.",
    });
    expect(alerts).toHaveLength(2);

  });
});
