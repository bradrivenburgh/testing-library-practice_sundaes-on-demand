import {
  findAllByRole,
  render,
  screen,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType='scoops' />);

  // make sure total starts out at $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  //update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change", async () => {
  render(<Options optionType='toppings' />);

  // make sure toppings subtotal starts out at $0.00
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  // make sure toppings options are unchecked
  const toppingsInputs = await screen.findAllByRole("checkbox");
  toppingsInputs.forEach((element) => expect(element).not.toBeChecked());

  // tick one checkbox and assert on subtotal
  userEvent.click(toppingsInputs[0]);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  // tick another checkbox and assert on subtotal
  userEvent.click(toppingsInputs[1]);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  // uncheck a checkbox and assert on the subtotal
  userEvent.click(toppingsInputs[0]);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});
