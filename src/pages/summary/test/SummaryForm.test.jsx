import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

describe("SummaryForm", () => {
  test("renders without crashing", () => {
    render(<SummaryForm />);
  });

  test("checkbox is unchecked and button is disabled by default", async () => {
    render(<SummaryForm />);
    const checkbox = await screen.findByRole("checkbox", { name: "Agree" });
    const button = await screen.findByRole("button", { name: "Submit" });

    // Checkbox should be unchecked and button disabled
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  test("checking checkbox enables button, unchecking disables it", async () => {
    render(<SummaryForm />);
    const checkbox = await screen.findByRole("checkbox", { name: "Agree" });
    const button = await screen.findByRole("button", { name: "Submit" });

    fireEvent.click(checkbox);
    expect(button).toBeEnabled();

    fireEvent.click(checkbox);
    expect(button).toBeDisabled();
  });
});
