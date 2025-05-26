import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStackScreenProps, Location} from '../shared/types';
import {fetchLocation} from '../shared/services';
import LoadingScreen from './LoadingScreen';

/**
 * Loading screen with Hooper image
 */
const LocationView = ({route}: AppStackScreenProps<'Location'>) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [location, setLocation] = useState<Location>();

  // Fetch the location id from the route path
  const {locationId} = route.params;

  // Hook to fetch the location
  useEffect(() => {
    fetchLocation(locationId)
      .then(location_ => {
        setLocation(location_);
      })
      .catch(err => {
        console.error(`Error fetching location: ${err}`);
      })
      .finally(() => setLoading(false));
  }, [locationId]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      edges={['right', 'bottom', 'left']}>
      {/* DO SOMETHING WITH LOCATION */}
    </SafeAreaView>
  );
};

export default LocationView;
