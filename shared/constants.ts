import Config from 'react-native-config';

// URL to make API requests to
export const API_URL = Config.API_URL || 'http://localhost:8000';

export const GOOGLE_CLIENT_ID = Config.GOOGLE_CLIENT_ID || '';
// Google Places API key
export const GOOGLE_PLACES_API_KEY = Config.GOOGLE_PLACES_API_KEY || '';

// Error messages
export const UNKNOWN_ERROR_TITLE = 'Something went wrong';
export const UNKNOWN_ERROR_MESSAGE = 'Please try this again later.';

// Linking URL constants
export const WHEREABOUT_PRIVACY_POLICY = '';
