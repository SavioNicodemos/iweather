import { mockWeatherAPIResponse } from "@__tests__/mocks/api/mockWeatherAPIResponse";
import { render, screen, waitFor } from "@__tests__/utils/customRender";
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
});