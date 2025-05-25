import {axiosInstance} from './axios';
import {User, Relation, Location, FeedItem} from './types';
import {
  CreateUserRequest,
  UpdateUserTokenRequest,
  CreateRelationRequest,
  CreateLocationRequest,
  EditLocationRequest,
} from './types';

export const fetchFeed = async (): Promise<FeedItem[]> => {
  return axiosInstance
    .get('/api/feed')
    .then((res: any) => res.data)
    .catch((err: Error) => console.error('Error in `fetchFeed`:', err));
};

export const fetchUser = async (user_id: string): Promise<User> => {
  return axiosInstance
    .get(`/api/users/${user_id}`)
    .then((res: any) => res.data)
    .catch((err: Error) => console.error('Error in `fetchUser`:', err));
};

export const createUser = async (body: CreateUserRequest): Promise<User> => {
  const config = {headers: {'Content-Type': 'application/json'}};
  return axiosInstance
    .post('/api/users/create', body, config)
    .then((res: any) => res.data)
    .catch((err: Error) => console.error('Error in `createUser`:', err));
};

export const updateUserToken = async (
  userId: string,
  body: UpdateUserTokenRequest,
): Promise<User> => {
  const config = {headers: {'Content-Type': 'application/json'}};
  return axiosInstance
    .post(`/api/users/${userId}/token`, body, config)
    .then((res: any) => res.data)
    .catch((err: Error) => console.error('Error in `updateUserToken`:', err));
};

export const createFriend = async (
  body: CreateRelationRequest,
): Promise<[Relation, Relation]> => {
  const config = {headers: {'Content-Type': 'application/json'}};
  return axiosInstance
    .post('/api/friends/create', body, config)
    .then((res: any) => res.data)
    .catch((err: Error) => console.error('Error in `createFriend`:', err));
};

export const deleteFriend = async (friendId: string): Promise<boolean> => {
  const config = {headers: {'Content-Type': 'application/json'}};
  return axiosInstance
    .post(`/api/friends/${friendId}/delete`, {}, config)
    .then((res: any) => res.data)
    .catch((err: Error) => console.error('Error in `deleteFriend`:', err));
};

export const fetchLocations = async (): Promise<Location[]> => {
  return axiosInstance
    .get('/api/locations')
    .then((res: any) => res.data)
    .catch((err: Error) => console.error('Error in `fetchLocations`:', err));
};

export const fetchLocation = async (location_id: string): Promise<Location> => {
  return axiosInstance
    .get(`/api/locations/${location_id}`)
    .then((res: any) => res.data)
    .catch((err: Error) => console.error('Error in `fetchLocation`:', err));
};

export const createLocation = async (
  body: CreateLocationRequest,
): Promise<Location> => {
  const config = {headers: {'Content-Type': 'application/json'}};
  return axiosInstance
    .post('/api/locations/create', body, config)
    .then((res: any) => res.data)
    .catch((err: Error) => console.error('Error in `createLocation`:', err));
};

export const editLocation = async (
  locationId: string,
  body: EditLocationRequest,
): Promise<Location> => {
  const config = {headers: {'Content-Type': 'application/json'}};
  return axiosInstance
    .post(`/api/locations/${locationId}/edit`, body, config)
    .then((res: any) => res.data)
    .catch((err: Error) => console.error('Error in `editLocation`:', err));
};

export const deleteLocation = async (locationId: string): Promise<Location> => {
  const config = {headers: {'Content-Type': 'application/json'}};
  return axiosInstance
    .post(`/api/locations/${locationId}/delete`, {}, config)
    .then((res: any) => res.data)
    .catch((err: Error) => console.error('Error in `deleteLocation`:', err));
};
