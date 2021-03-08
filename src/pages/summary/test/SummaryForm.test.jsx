import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import UserEvent from "@testing-library/user-event";

describe("SummaryForm", () => {
  test("renders without crashing", () => {
    render(<SummaryForm />);
  });

  test("checkbox is unchecked and button is disabled by default", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole("button", { name: /confirm order/i });

    // Checkbox should be unchecked and button disabled
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  test("checking checkbox enables button, unchecking disables it", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole("button", { name: /confirm order/i });

    UserEvent.click(checkbox);
    expect(button).toBeEnabled();

    UserEvent.click(checkbox);
    expect(button).toBeDisabled();
  });

  test("popover responds to hover", async () => {
    render(<SummaryForm />);

    // popover starts out hidden
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    // popover appears upon mouseover of checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    UserEvent.hover(termsAndConditions);

    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    // popover dissapears when we mouse out
    UserEvent.unhover(termsAndConditions);

    await waitForElementToBeRemoved(() => screen.queryByText(
      /no ice cream will actually be delivered/i
    ));
  });
});
