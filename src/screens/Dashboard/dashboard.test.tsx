import { mockCityApiResponse } from "@__tests__/mocks/api/mockCityApiResponse";
import { mockWeatherAPIResponse } from "@__tests__/mocks/api/mockWeatherAPIResponse";
import { act, fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from "@__tests__/utils/customRender";
import { saveStorageCity } from "@libs/asyncStorage/cityStorage";
import { Dashboard } from "@screens/Dashboard";
import { api } from "@services/api";

describe('Screen: Dashboard', () => {
  beforeAll(async () => {
    const city = { id: '1', name: 'Natal, BR', latitude: 123, longitude: 453 };

    await saveStorageCity(city);
  });

  it("should show city weather", async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: mockWeatherAPIResponse });

    render(<Dashboard />);

    const cityName = await waitFor(() => screen.findByText(/Natal/i));

    expect(cityName).toBeTruthy();
  });

  it("should show the weather of other selected city", async () => {
    jest.spyOn(api, 'get')
      .mockResolvedValueOnce({ data: mockWeatherAPIResponse })
      .mockResolvedValueOnce({ data: mockCityApiResponse })
      .mockResolvedValueOnce({ data: mockWeatherAPIResponse });

    render(<Dashboard />);

    await waitForElementToBeRemoved(() => screen.queryByTestId('loading'));

    const cityName = 'Mossoró';

    await waitFor(() => act(() => {
      const search = screen.getByTestId('search-input');
      fireEvent.changeText(search, cityName);
    }));

    await waitFor(() => act(() => {
      fireEvent.press(screen.getByText(cityName, { exact: false }));
    }));

    expect(screen.getByText(cityName, { exact: false })).toBeTruthy();
  })
});