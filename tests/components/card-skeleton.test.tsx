import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { CardSkeleton } from '@/app/ui/skeletons';

describe('CardSkeleton', () => {
  it('should render the skeleton card', () => {
    const { container } = render(<CardSkeleton />);
    
    // Check for the main card container with the shimmer class
    const card = container.querySelector('.rounded-xl.bg-gray-100');
    expect(card).toBeInTheDocument();
  });

  it('should have shimmer animation class', () => {
    const { container } = render(<CardSkeleton />);
    
    const shimmer = container.querySelector('[class*="shimmer"]');
    expect(shimmer).toBeInTheDocument();
  });
});

