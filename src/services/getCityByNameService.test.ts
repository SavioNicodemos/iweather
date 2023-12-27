import { mockCityApiResponse } from '@__tests__/mocks/mockCityApiResponse';
import { api } from './api';
import { getCityByNameService } from './getCityByNameService';

describe('API: getCityByNameService', () => {
  it('should return city details', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: mockCityApiResponse });

    const response = await getCityByNameService('Mossoró');

    expect(response.length).toBeGreaterThan(0);
  });

  it('should return an empty array if the city is not found', () => {
    // TODO
  });
});
