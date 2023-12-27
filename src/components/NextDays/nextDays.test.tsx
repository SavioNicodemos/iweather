import clearDay from "@assets/clear_day.svg";
import { NextDays } from "@components/NextDays";
import { render } from "@testing-library/react-native";

describe('Component: NextDays', () => {
  it('should render correctly', () => {
    const { getByText, getByTestId, queryByText } = render(
      <NextDays
        data={[
          { day: "31/12", min: "20°C", max: "30°C", icon: clearDay, weather: "Clear sky" },
          { day: "01/01", min: "21°C", max: "31°C", icon: clearDay, weather: "Cloudy" },
          { day: "02/01", min: "22°C", max: "32°C", icon: clearDay, weather: "Clear sky" },
          { day: "03/01", min: "23°C", max: "33°C", icon: clearDay, weather: "Clear sky" },
          { day: "04/01", min: "24°C", max: "34°C", icon: clearDay, weather: "Rainy" },
        ]}
      />
    );

    expect(getByTestId("next-days-container").children).toHaveLength(5);
    expect(getByText("31/12")).toBeTruthy();
    expect(getByText("01/01")).toBeTruthy();
    expect(getByText("02/01")).toBeTruthy();
    expect(getByText("03/01")).toBeTruthy();
    expect(getByText("04/01")).toBeTruthy();
  });
});