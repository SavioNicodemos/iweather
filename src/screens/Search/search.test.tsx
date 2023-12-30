import { mockCityApiResponse } from '@__tests__/mocks/api/mockCityApiResponse';
import { fireEvent, render, screen, waitFor } from '@__tests__/utils/customRender';
import { Search } from '@screens/Search';
import { api } from '@services/api';

describe('Screen: Search', () => {
  it('should show city option', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: mockCityApiResponse });
    render(<Search />);

    const input = screen.getByTestId('search-input');

    fireEvent.changeText(input, 'Mossoró');

    const option = await waitFor(() => screen.findByText(/Mossoró/i));

    expect(option).toBeTruthy();
  });
});