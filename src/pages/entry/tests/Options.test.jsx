import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";

describe("Options", () => {
  test("displays image for each scoop from server", async () => {
    render(<Options optionType="scoops" />);

    // find the images; use find[All]ByRole bc of async instead of get[All]ByRole
    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    // confirm alt text of images
    const altText = scoopImages.map((element) => element.alt);
    expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
  });

  test("displays image for each topping from server", async () => {
    render(<Options optionType="toppings" />);

    const toppingImages = await screen.findAllByRole("img", {
      name: /topping$/i,
    });
    expect(toppingImages.length).toBeGreaterThanOrEqual(1);

    const altText = toppingImages.map((element) => element.alt);
    expect(altText).toEqual([
      "Cherries topping",
      "M&Ms topping",
      "Hot fudge topping",
    ]);
  });
});
