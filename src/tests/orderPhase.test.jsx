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
  userEvent.clear();
  userEvent.type(vanillaInput, "1");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: /cherries/i,
  });
  userEvent.click(cherriesCheckbox);
  
  // find and click the order button on the order entry page
  const orderButton = await screen.findByRole("button", {name: /order sundae!/i})
  userEvent.click(orderButton);

  // check that the summary information is correct based on order
  

  // accept terms and click button to confirm order

  // confirm order number on confirmation page

  // click the new order button on confirmation page

  // check that scoops and toppings subtotals have been reset

  // do we need to await anything to avoid test errors?
});
