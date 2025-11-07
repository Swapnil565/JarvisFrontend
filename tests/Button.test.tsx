import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button } from '../components/ui/Button';

describe('Button micro-interactions', () => {
  it('calls navigator.vibrate when haptics enabled', () => {
    const vibrateMock = vi.fn();
    // @ts-ignore
    global.navigator = { vibrate: vibrateMock };

    const { getByText } = render(<Button>Click</Button>);
    const btn = getByText('Click');

    fireEvent.pointerDown(btn, { clientX: 10, clientY: 10 });
    fireEvent.pointerUp(btn);

    expect(vibrateMock).toHaveBeenCalled();
  });

  it('inserts a ripple element on pointer down', () => {
    const { getByText } = render(<Button>Rip</Button>);
    const btn = getByText('Rip');

  // Ensure no ripple initially
  expect(btn.querySelector('.ripple')).toBeNull();

  fireEvent.pointerDown(btn, { clientX: 10, clientY: 10 });

  // A ripple should be appended to the button element
  const ripple = btn.querySelector('.ripple');
  expect(ripple).not.toBeNull();
  });
});
