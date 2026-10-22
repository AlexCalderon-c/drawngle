import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MainLayout } from '../MainLayout';

describe('MainLayout Component', () => {
  it('renders header, footer, two-column layout with 3D viewport and reference section', () => {
    render(<MainLayout />);

    expect(screen.getByText(/Drawngle/i)).toBeDefined();
    expect(screen.getByText(/100% Private & Offline/i)).toBeDefined();

    const viewportSection = screen.getByLabelText(/3D Model Section/i);
    const referencesSection = screen.getByLabelText(/References Section/i);

    expect(viewportSection).toBeDefined();
    expect(referencesSection).toBeDefined();

    const canvasRegion = screen.getByRole('region', { name: /3D Viewport/i });
    const referencePanel = screen.getByLabelText(/Reference Panel/i);

    expect(canvasRegion).toBeDefined();
    expect(referencePanel).toBeDefined();
  });
});
