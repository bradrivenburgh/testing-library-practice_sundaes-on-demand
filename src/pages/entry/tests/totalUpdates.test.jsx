import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);

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
  render(<Options optionType="toppings" />);

  // make sure toppings subtotal starts out at $0.00
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  /** How course does it */

  // const cherriesCheckbox = await screen.findByRole("checkbox", {
  //   name: "Cherries",
  // });
  // userEvent.click(cherriesCheckbox);
  // expect(toppingsSubtotal).toHaveTextContent("1.50");

  // const hotFudgeCheckbox = await screen.findByRole("checkbox", {
  //   name: "Hot fudge",
  // });
  // userEvent.click(hotFudgeCheckbox);
  // expect(toppingsSubtotal).toHaveTextContent("3.00");

  // userEvent.click(hotFudgeCheckbox);
  // expect(toppingsSubtotal).toHaveTextContent("1.50");

  /** My implementation */

  // make sure toppings options are unchecked
  const toppingsInputs = await screen.findAllByRole("checkbox");
  toppingsInputs.forEach((element) => expect(element).not.toBeChecked());

  // check one checkbox and assert on subtotal
  userEvent.click(toppingsInputs[0]);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  // check another checkbox and assert on subtotal
  userEvent.click(toppingsInputs[1]);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  // uncheck a checkbox and assert on the subtotal
  userEvent.click(toppingsInputs[0]);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {

  test("updates properly if scoop is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("0.00");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("2.00");

    const toppingsInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(toppingsInput);
    expect(grandTotal).toHaveTextContent("3.50");
  });

  test("updates properly if topping is added first", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    const toppingsInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(toppingsInput);
    expect(grandTotal).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("3.50");
  });

  test("updates properly if item is removed", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    const toppingsInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(toppingsInput);
    expect(grandTotal).toHaveTextContent("5.50");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("3.50");
  });
});
