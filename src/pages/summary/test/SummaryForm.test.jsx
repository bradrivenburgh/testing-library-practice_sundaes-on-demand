import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

describe("SummaryForm", () => {
  test("renders without crashing", () => {
    render(<SummaryForm />);
  });

  test("checkbox is unchecked and button is disabled by default", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", { name: /terms and conditions/i });
    const button = screen.getByRole("button", { name: /confirm order/i });

    // Checkbox should be unchecked and button disabled
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  test("checking checkbox enables button, unchecking disables it", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", { name: /terms and conditions/i });
    const button = screen.getByRole("button", { name: /confirm order/i });

    fireEvent.click(checkbox);
    expect(button).toBeEnabled();

    fireEvent.click(checkbox);
    expect(button).toBeDisabled();
  });
});
