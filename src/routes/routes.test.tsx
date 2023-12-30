import { Routes } from "@routes/index";
import { render, screen, waitFor } from "@testing-library/react-native";

describe("Routes", () => {
  it("should render Search screen when no city selected", async () => {
    render(<Routes />);

    const title = await waitFor(() => screen.findByText(/^escolha um local/i))

    expect(title).toBeTruthy();
  });
});