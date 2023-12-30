import { mockCityApiResponse } from "@__tests__/mocks/api/mockCityApiResponse";
import { mockWeatherAPIResponse } from "@__tests__/mocks/api/mockWeatherAPIResponse";
import { act, fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from "@__tests__/utils/customRender";
import { saveStorageCity } from "@libs/asyncStorage/cityStorage";
import { Dashboard } from "@screens/Dashboard";
import { api } from "@services/api";

describe('Screen: Dashboard', () => {
  it("should show city weather", async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: mockWeatherAPIResponse });

    const city = { id: '1', name: 'Mossoró, RN', latitude: 123, longitude: 453 };

    await saveStorageCity(city);

    render(<Dashboard />);

    const cityName = await waitFor(() => screen.findByText(/Mossoró/i));

    expect(cityName).toBeTruthy();
  });

  it("should show the weather of other selected city", async () => {
    const city = {
      id: '1',
      name: 'Natal, RN',
      latitude: 123,
      longitude: 456
    }

    await saveStorageCity(city)

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