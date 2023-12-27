import { SelectList } from "@components/SelectList";
import { CityProps } from "@services/getCityByNameService";
import { fireEvent, render, screen } from "@testing-library/react-native";

const cities: CityProps[] = [
  { id: 'uuid001', name: 'Mossoró', latitude: 100, longitude: 100 },
  { id: 'uuid002', name: 'Porto', latitude: 101, longitude: 101 },
  { id: 'uuid003', name: 'Rio de Janeiro', latitude: 102, longitude: 102 },
] as const;

describe('Component: SelectList', () => {
  it("should return the details of the selected city", () => {
    const onPress = jest.fn()
    render(<SelectList data={cities} onChange={() => { }} onPress={onPress} />);

    const selectedCity = screen.getByText(/Rio/i); // Regex with case insensitive
    fireEvent.press(selectedCity);

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onPress).toHaveBeenCalledWith(cities[2]);
  });

  it("should not show options when data props is empty.", () => {
    render(<SelectList data={[]} onChange={() => { }} onPress={() => { }} />);

    const options = screen.getByTestId('options');

    expect(options.children).toHaveLength(0);
  });
});