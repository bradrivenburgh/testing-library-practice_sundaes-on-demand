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
  const orderButton = await screen.findByRole("button", {
    name: /order sundae!/i,
  });
  userEvent.click(orderButton);

  // check that the summary information is correct based on order
  const scoopsTotal = await screen.findByText(/scoops total: \$/i);
  expect(scoopsTotal).toHaveTextContent("2.00");

  const toppingsTotal = await screen.findByText(/toppingss total: \$/i);
  expect(toppingsTotal).toHaveTextContent("1.50");

  const grandTotal = await screen.findByText(/total: \$/i);
  expect(grandTotal).toHaveTextContent("3.50");

  // accept terms and click button to confirm order
  const tcCheckbox = await screen.findByRole("checkbox", {
    name: /terms and conditions/i,
  });
  userEvent.click(tcCheckbox);

  const confirmOrderBtn = await screen.findByRole("button", {
    name: /confirm order/i,
  });
  userEvent.click(confirmOrderBtn);

  // confirm order number on confirmation page
  const orderNumber = await screen.findByText(/your order number is/i);
  expect(orderNumber).toHaveTextContent("1234567890");

  // click the new order button on confirmation page
  const newOrderButton = await screen.findByRole("button", {
    name: /create new order/i,
  });
  userEvent.click(newOrderButton);

  // check that scoops and toppings subtotals have been reset
  const newScoopsTotal = await screen.findByText(/scoops total: \$/i);
  expect(newScoopsTotal).toHaveTextContent("0.00");

  const newToppingsTotal = await screen.findByText(/toppingss total: \$/i);
  expect(newToppingsTotal).toHaveTextContent("0.00");
});
