import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { CardSkeleton } from '@/app/ui/skeletons';

describe('CardSkeleton', () => {
  it('should render the skeleton card', () => {
    render(<CardSkeleton />);
    
    const card = screen.getByRole('generic');
    expect(card).toBeInTheDocument();
  });

  it('should have shimmer animation class', () => {
    const { container } = render(<CardSkeleton />);
    
    const shimmer = container.querySelector('[class*="shimmer"]');
    expect(shimmer).toBeInTheDocument();
  });
});

