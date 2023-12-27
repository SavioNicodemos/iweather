import { api } from './api';
import { getCityByNameService } from './getCityByNameService';

describe('API: getCityByNameService', () => {
  it('should return city details', async () => {
    const data = {
      id: '1',
      name: 'Mossoró',
      sys: { country: 'BR' },
      coord: { lon: -37.35, lat: 5.19 },
    };

    jest.spyOn(api, 'get').mockResolvedValue({ data });

    const response = await getCityByNameService('Mossoró');

    expect(response.length).toBeGreaterThan(0);
  });

  it('should return an empty array if the city is not found', () => {
    // TODO
  });
});
