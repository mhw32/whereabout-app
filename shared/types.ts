import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";


/**
 * ======================
 * Navigation Interfaces
 * ======================
 */

export type AuthStackParamList = {
  LoginOrRegister: undefined;
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

export type AppStackParamList = {
  Tabs: NavigatorScreenParams<AppTabParamList>;
  Profile: undefined;
  EditProfile: undefined;
  Location: undefined;
  EditLocation: undefined;
  Event: undefined;
  CreateLocation: undefined;
  Router: undefined;
  // PublicProfile: {
  //   userId?: string;
  //   editedMixtape?: FBMixtape;
  //   deletedMixtapeId?: string;
  //   initTab?: number;
  //   initNumNotifs?: number;
  //   fromNotification?: boolean;
  //   feedHighlight?: string;
  // };
}

export type AppTabParamList = {
  MyFriends: {
    isOnboarding?: boolean;
    initHighlight?: string;
  };
  MyWhereabouts: {
    isOnboarding?: boolean;
  };
};


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

export interface Event {
  eventId?: string;
  userId: string;
  locationId: string;
  createdAt: number;
  updatedAt: number;
}

export interface FeedItem {
  user: User;
  event: Event;
  location: Location;
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
