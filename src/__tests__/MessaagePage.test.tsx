import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import MessagePage from '../components/messagePage';

afterEach(cleanup);

test('renders learn react link', () => {
    const comp = render(<MessagePage />);
    expect(comp).toBeTruthy();
});

test('action button reder', () => {
    const comp = render(<MessagePage />);
    expect(comp.queryByTestId("heading_text")).toHaveTextContent("Coding Challenge");
    const clearButton = comp.getByTestId("clear_button");
    fireEvent.click(clearButton);
    const startStopButton = comp.getByTestId("start_stop_button");
    fireEvent.click(startStopButton);
});

