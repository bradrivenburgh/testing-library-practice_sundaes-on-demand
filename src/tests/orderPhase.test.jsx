import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("order phases for happy path", async () => {
  // render app
  render(<App />);

  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: /cherries/i,
  });
  userEvent.click(cherriesCheckbox);

  // find and click the order button on the order entry page
  const orderButton = screen.getByRole("button", {
    name: /order sundae/i,
  });
  userEvent.click(orderButton);

  // check that the summary information is correct based on order
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsTotal = screen.getByRole("heading", { name: "Scoops: $2.00" });
  expect(scoopsTotal).toBeInTheDocument();

  const toppingsTotal = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingsTotal).toBeInTheDocument();

  const optionItems = screen.getAllByRole("listitem");
  const optionItemsText = optionItems.map((item) => item.textContent);
  expect(optionItemsText).toEqual(["1 Vanilla", "Cherries"]);

  // accept terms and click button to confirm order
  const tcCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  userEvent.click(tcCheckbox);

  const confirmOrderBtn = screen.getByRole("button", {
    name: /confirm order/i,
  });
  userEvent.click(confirmOrderBtn);

  // confirm "Loading" appears while posting to server
  const loadingText = screen.getByText(/loading/i);
  expect(loadingText).toBeInTheDocument();

  // confirm thank you header
  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  // confirm that "Loading" has disappeared
  const notLoading = screen.queryByText(/loading/i);
  expect(notLoading).not.toBeInTheDocument();

  // confirm order number on confirmation page
  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // click the new order button on confirmation page
  const newOrderButton = screen.getByRole("button", {
    name: /new order/i,
  });
  userEvent.click(newOrderButton);

  // check that scoops and toppings subtotals have been reset
  const newScoopsTotal = screen.getByText("Scoops total: $0.00");
  expect(newScoopsTotal).toBeInTheDocument();

  const newToppingsTotal = screen.getByText("Toppings total: $0.00");
  expect(newToppingsTotal).toBeInTheDocument();

  await screen.findByRole("spinbutton", { name: "Vanilla" });
  await screen.findByRole("checkbox", { name: "Cherries" });
});
