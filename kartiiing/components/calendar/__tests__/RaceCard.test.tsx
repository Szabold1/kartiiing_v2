import { render, screen } from '@testing-library/react';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { RaceStatus } from '@kartiiing/shared';
import { buildRace } from '@/test/fixtures';
import { RaceCard } from '../RaceCard';

const RACE_TITLE = 'Test Race 2025';
const RACE_DATE_STRING = '01 - 04 Jun';
const RACE_HREF = '/race/test-race-2025/1';

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('RaceCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const race = buildRace({
    id: 1,
    title: RACE_TITLE,
    slug: 'test-race-2025',
    date: { start: '2025-06-01', end: '2025-06-04', year: 2025 },
  });

  // --- card variant (default) ---

  it('renders title and date in card variant', () => {
    render(<RaceCard race={race} />);

    expect(screen.getByText(RACE_TITLE)).toBeInTheDocument();
    expect(screen.getByText(RACE_DATE_STRING)).toBeInTheDocument();
  });

  it('renders location name in card variant', () => {
    render(<RaceCard race={race} />);

    expect(screen.getByText(race.circuit.locationName)).toBeInTheDocument();
  });

  it('renders a link with the correct href', () => {
    render(<RaceCard race={race} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', RACE_HREF);
  });

  it('sets correct aria-label on the link', () => {
    render(<RaceCard race={race} />);

    expect(
      screen.getByRole('link', {
        name: `View details for ${race.title} at ${race.circuit.locationName} - ${race.date.end}`,
      }),
    ).toBeInTheDocument();
  });

  it('applies LIVE styling when race is live', () => {
    const liveRace = buildRace({ status: RaceStatus.LIVE });
    render(<RaceCard race={liveRace} />);

    const link = screen.getByRole('link');
    expect(link).toHaveClass('bg-red-100/50');
  });

  it('renders StatusResultsBadge when race has a status', () => {
    const upcomingRace = buildRace({ status: RaceStatus.UPCOMING });
    render(<RaceCard race={upcomingRace} />);

    expect(screen.getByText('Upcoming')).toBeInTheDocument();
  });

  it('renders StatusResultsBadge when race has results links', () => {
    const raceWithResults = buildRace({
      links: { results: [{ category: 'KZ', url: 'https://results.com' }] },
    });
    render(<RaceCard race={raceWithResults} />);

    // The badge renders a button (not a link) to avoid nested <a> tags
    const button = screen.getByRole('button', { name: 'Results' });
    expect(button).toBeInTheDocument();
  });

  // --- row variant ---

  it('renders title and date in row variant', () => {
    render(<RaceCard race={race} variant="row" />);

    expect(screen.getByText(RACE_TITLE)).toBeInTheDocument();
    expect(screen.getByText(RACE_DATE_STRING)).toBeInTheDocument();
  });

  it('applies row-specific styling in list view', () => {
    render(<RaceCard race={race} variant="row" />);

    const link = screen.getByRole('link');
    expect(link).toHaveClass('flex');
  });

  // --- heading levels ---

  it('renders the race title as an h2 heading when headingLevel is h2', () => {
    render(<RaceCard race={race} headingLevel="h2" />);

    expect(
      screen.getByRole('heading', { level: 2, name: RACE_TITLE }),
    ).toBeInTheDocument();
  });

  it('renders the race title with h3 by default', () => {
    render(<RaceCard race={race} />);

    expect(
      screen.getByRole('heading', { level: 3, name: RACE_TITLE }),
    ).toBeInTheDocument();
  });
});
