import {
  getStorageCity,
  removeStorageCity,
  saveStorageCity,
} from '@libs/asyncStorage/cityStorage';
import { CityProps } from '@services/getCityByNameService';

const newCity: CityProps = {
  id: '1',
  name: 'Mossoró',
  latitude: -5.187,
  longitude: -37.344,
};

describe('Storage: cityStorage', () => {
  it("should return null when don't have a city stored", async () => {
    const response = await getStorageCity();

    expect(response).toBeNull();
  });

  it('should return a city stored', async () => {
    await saveStorageCity(newCity);

    const response = await getStorageCity();

    expect(response).toEqual(newCity);
  });

  it('should return a city stored', async () => {
    await saveStorageCity(newCity);
    await removeStorageCity();

    const response = await getStorageCity();

    expect(response).toBeNull();
  });
});
