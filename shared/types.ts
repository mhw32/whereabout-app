import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

/**
 * ======================
 * Navigation Interfaces
 * ======================
 */

export type AuthStackParamList = {
  Login: undefined;
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type AppStackParamList = {
  Tabs: NavigatorScreenParams<AppTabParamList>;
  Profile: {
    userId: string;
  };
  EditProfile: undefined;
  Location: {
    locationId: string;
  };
  EditLocation: undefined;
  Event: {
    eventId: string;
  };
  CreateLocation: undefined;
  Router: undefined;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

export type AppTabParamList = {
  MyFriends: {};
  Me: {};
};

export type AppTabScreenProps<T extends keyof AppTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<AppTabParamList, T>,
    AppStackScreenProps<keyof AppStackParamList>
  >;

// === interfaces ===

export interface User {
  userId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  token?: string;
  createdAt: number;
  updatedAt: number;
}

export interface Relation {
  relationId?: string;
  userId: string;
  recipientId: string;
  relation: number;
  createdAt: number;
  updatedAt: number;
}

export interface Location {
  locationId?: string;
  userId: string;
  latitude: number;
  longitude: number;
  width: number;
  height: number;
  tag: string;
  category?: string;
  createdAt: number;
  updatedAt: number;
}

export interface LocationEvent {
  eventId?: string;
  userId: string;
  locationId: string;
  createdAt: number;
  updatedAt: number;
}

export interface FeedItem {
  user: User;
  location: Location;
  event: LocationEvent;
}

// === requests ===

export interface CreateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  token?: string;
}

export interface UpdateUserTokenRequest {
  userId: string;
  token?: string;
}

export interface CreateRelationRequest {
  recipientId: string;
}

export interface CreateLocationRequest {
  userId: string;
  latitude: number;
  longitude: number;
  width: number;
  height: number;
  tag: string;
  category?: string;
}

export interface EditLocationRequest {
  latitude: number;
  longitude: number;
  width: number;
  height: number;
  tag: string;
  category?: string;
}

export interface CreateEventRequest {
  userId: string;
  locationId: string;
}
