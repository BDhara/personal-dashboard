import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Weather from '../components/Weather';

describe('Weather Component', () => {
    test('renders Weather component', () => {
        const { getByText, getByPlaceholderText } = render(<Weather />);
        expect(getByText(/Weather App/i)).toBeInTheDocument();
        expect(getByPlaceholderText(/Enter city\/town.../i)).toBeInTheDocument();
    });

    test('displays error on empty search', () => {
        const { getByText, getByRole } = render(<Weather />);
        fireEvent.click(getByRole('button', { name: /Search/i }));
        expect(getByText(/Please enter a city\/town./i)).toBeInTheDocument();
    });

    test('fetches and displays weather data on search', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({
                name: 'Test City',
                main: { temp: 20 },
                weather: [{ main: 'Clear' }],
            }),
        });

        const { getByText, getByLabelText } = render(<Weather />);
        fireEvent.change(getByLabelText(/weather-search/i), {
            target: { value: "Test City" }
        });
        fireEvent.click(getByText(/Search/i));


        await waitFor(() => {
            expect(getByText(/Test City/i)).toBeInTheDocument();
            expect(getByText(/20°C/i)).toBeInTheDocument();
            expect(getByText(/Clear/i)).toBeInTheDocument();
        });

    });

    test('displays error on fetch failure', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            statusText: "Not Found"            
        });

        const { getByText, getByLabelText } = render(<Weather />);
        fireEvent.change(getByLabelText(/weather-search/i), {
            target: { value: "Test City" }
        });

        fireEvent.click(getByText(/Search/i));
        await waitFor(() => {
            expect(getByText(/Failed to fetch weather data. Error: Not Found/i)).toBeInTheDocument();
        });
    });
});
