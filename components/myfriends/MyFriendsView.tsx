import React, {useState, useEffect, useRef} from 'react';
import {
  Dimensions,
  View,
  AppState,
  AppStateStatus,
  RefreshControl,
  ViewabilityConfig,
  ViewToken,
} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fetchFeed} from '../../shared/services';
import {FeedItem} from '../../shared/types';
import LoadingScreen from '../LoadingScreen';
import FeedCard, {FeedCardProps} from './FeedCard';

interface RenderItemProps {
  item: FeedItem;
}

interface ViewableFnProps<T> {
  viewableItems: ViewToken<T>[];
  changed: ViewToken<T>[];
}

const viewabilityConfig: ViewabilityConfig = {
  // Percentage of item visible to trigger the event
  itemVisiblePercentThreshold: 70,
};

/**
 * Loading screen with Hooper image
 */
const MyFriendsView = ({}) => {
  // Arguments in the state
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  // State for if the component is loading
  const [loading, setLoading] = useState<boolean>(false);
  // State for storing the feed items
  const [items, setItems] = useState<FeedItem[]>([]);
  const [viewableIds, setViewableIds] = useState<string[]>([]);
  // Reference to a carousel
  const listRef = useRef<FlashList<any>>(null);
  // Reference to the end of the feed
  const reachedEndRef = useRef<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchFeed(page, limit)
      .then(items_ => {
        setItems([...items_]);
        setLoading(false);
      })
      .catch(err => console.error(`Error ${err}`));
  }, []);

  const onViewableItemsChanged = ({
    viewableItems,
  }: ViewableFnProps<FeedCardProps>) => {
    setViewableIds([...viewableItems.map(item => item.item.event.eventId)]);
  };

  const onFetchData = () => {
    fetchFeed()
      .then(items_ => setItems(items_))
      .catch(err => {
        console.error(`Failed to fetch feed (page=${page}). Error: ${err}`);
      })
      .finally(() => setLoading(false));
  };

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
      <FlashList
        ref={listRef}
        data={items}
        decelerationRate="fast"
        pagingEnabled
        showsVerticalScrollIndicator={false}
        keyExtractor={item =>
          `card-${item.user.userId}-${item.location.locationId}-${item.event.eventId}`
        }
        onEndReachedThreshold={0.9}
        onEndReached={() => onFetchMode()}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => onFetchData()} />
        }
        renderItem={({item}: RenderItemProps) => <FeedCard item={item} />}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </SafeAreaView>
  );
};

export default MyFriendsView;
