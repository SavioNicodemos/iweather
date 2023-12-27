import clearDay from "@assets/clear_day.svg";
import { Day } from "@components/Day";
import { render } from "@testing-library/react-native";

describe('Component: Day', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <Day
        data={{
          day: "31/12",
          min: "20°C",
          max: "30°C",
          icon: clearDay,
          weather: "Clear sky",
        }}
      />
    );

    expect(getByText("31/12")).toBeTruthy();
  });
});