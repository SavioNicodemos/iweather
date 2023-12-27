import { WeatherItem } from "@components/WeatherItem";
import { render, screen } from "@testing-library/react-native";

import dropIcon from "@assets/drop.svg";

describe('Component: WeatherItem', () => {
  it('should show title and value.', () => {
    render(<WeatherItem title="Umidade do ar" value="81%" icon={dropIcon} />);

    const title = screen.getByText("Umidade do ar");
    const value = screen.getByText("81%");

    expect(title).toBeTruthy();
    expect(value).toBeTruthy();
  });
});