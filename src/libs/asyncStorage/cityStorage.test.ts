import { getStorageCity } from '@libs/asyncStorage/cityStorage';

describe('Storage: cityStorage', () => {
  it("should return null when don't have a city stored", async () => {
    const response = await getStorageCity();

    expect(response).toBeNull();
  });
});
