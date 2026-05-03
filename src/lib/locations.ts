/**
 * LOCATIONS.TS
 * Centralized location management for multi-location support
 * Enables easy expansion to additional dental practices/branches
 */

export interface Location {
  id: string;
  name: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  streetAddress: string;
  latitude: number;
  longitude: number;
  phone: string;
  email: string;
  hours: {
    weekday: { opens: string; closes: string };
    friday?: { opens: string; closes: string };
    saturday?: { opens: string; closes: string };
    sunday?: { opens: string; closes: string };
  };
  serviceAreas?: string[]; // Surrounding areas/suburbs served by this location
  isHeadquarters: boolean;
  isActive: boolean;
  launchDate?: string; // ISO date string for future locations
}

/**
 * Primary location (headquarters)
 * Future expansion ready - add additional locations following this structure
 */
export const locations: Record<string, Location> = {
  centurion: {
    id: 'centurion',
    name: 'Refresh Dental — Centurion',
    city: 'Centurion',
    province: 'Gauteng',
    postalCode: '0157',
    country: 'ZA',
    streetAddress: '153 River Road',
    latitude: -25.8600,
    longitude: 28.1800,
    phone: '+27614164649',
    email: 'admin@refreshdental.co.za',
    hours: {
      weekday: { opens: '08:00', closes: '17:00' },
      friday: { opens: '08:00', closes: '15:00' },
      saturday: { opens: '08:00', closes: '12:00' },
    },
    serviceAreas: [
      'Centurion',
      'Midrand',
      'Johannesburg South',
      'Highveld',
      'Waterkloof Ridge',
      'Irene',
      'Lyttelton',
      'Pretoria',
      'Gauteng',
    ],
    isHeadquarters: true,
    isActive: true,
  },

  // FUTURE LOCATIONS - Template for expansion
  // midrand: {
  //   id: 'midrand',
  //   name: 'Refresh Dental — Midrand',
  //   city: 'Midrand',
  //   province: 'Gauteng',
  //   postalCode: '1685',
  //   country: 'ZA',
  //   streetAddress: '[Address to be confirmed]',
  //   latitude: -25.9879,
  //   longitude: 28.1045,
  //   phone: '+27XX XXX XXXX',
  //   email: 'midrand@refreshdental.co.za',
  //   hours: {
  //     weekday: { opens: '08:00', closes: '17:00' },
  //     friday: { opens: '08:00', closes: '15:00' },
  //     saturday: { opens: '08:00', closes: '12:00' },
  //   },
  //   serviceAreas: ['Midrand', 'Johannesburg', 'Grayston'],
  //   isHeadquarters: false,
  //   isActive: false,
  //   launchDate: '2025-06-01',
  // },
};

/**
 * Get primary location (headquarters)
 */
export function getPrimaryLocation(): Location {
  return locations.centurion;
}

/**
 * Get all active locations
 */
export function getActiveLocations(): Location[] {
  return Object.values(locations).filter((loc) => loc.isActive);
}

/**
 * Get location by ID
 */
export function getLocationById(id: string): Location | undefined {
  return locations[id];
}

/**
 * Get location by city name
 */
export function getLocationByCity(city: string): Location | undefined {
  return Object.values(locations).find(
    (loc) => loc.city.toLowerCase() === city.toLowerCase() && loc.isActive
  );
}

/**
 * Check if location has specific service area
 */
export function hasServiceArea(locationId: string, area: string): boolean {
  const location = locations[locationId];
  if (!location) return false;
  return (
    location.serviceAreas?.some(
      (a) => a.toLowerCase() === area.toLowerCase()
    ) ?? false
  );
}

/**
 * Get all unique service areas across active locations
 */
export function getAllServiceAreas(): string[] {
  const areas = new Set<string>();
  getActiveLocations().forEach((location) => {
    location.serviceAreas?.forEach((area) => areas.add(area));
  });
  return Array.from(areas).sort();
}

export const DEFAULT_LOCATION_ID = 'centurion';
