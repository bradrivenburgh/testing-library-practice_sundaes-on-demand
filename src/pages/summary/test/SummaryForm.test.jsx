import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

describe("SummaryForm", () => {
  test("checkbox is unchecked and button is disabled by default", async () => {
    render(<SummaryForm />);
    const checkbox = await screen.findByRole("checkbox", { name: "agree" });
    const button = await screen.findByRole("button", { name: "submit" });
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });
});
