import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStackScreenProps, LocationEvent} from '../shared/types';
import {fetchEvent} from '../shared/services';
import LoadingScreen from './LoadingScreen';

/**
 * Loading screen with Hooper image
 */
const EventView = ({route}: AppStackScreenProps<'Event'>) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [event, setEvent] = useState<LocationEvent>();

  // Fetch the event id from the route path
  const {eventId} = route.params;

  // Hook to fetch the location
  useEffect(() => {
    fetchEvent(eventId)
      .then(event_ => setEvent(event_))
      .catch(err => {
        console.error(`Error fetching location: ${err}`);
      })
      .finally(() => setLoading(false));
  }, [eventId]);

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
      {/* DO SOMETHING WITH EVENT */}
    </SafeAreaView>
  );
};

export default EventView;
