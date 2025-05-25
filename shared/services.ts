import { axiosInstance } from "./axios";
import {
  USER_ENDPOINT,
  FEED_ENDPOINT,
  SESSION_ENDPOINT,
  FRIEND_ENDPOINT,
  MIXTAPE_ENDPOINT,
  BADGE_ENDPOINT,
  NOTIF_ENDPOINT,
  PROFILE_ENDPOINT,
  EMAIL_VERIFICATION_ENDPOINT,
  GROUP_ENDPOINT,
} from "./endpoints";
import {
  NUM_COMMENTS_PER_CALL,
  NUM_SESSIONS_IN_GAMES,
  CURRENT_SESSION_VERSION,
} from "./constants";
import type {
  Friend,
  FBUser,
  FBTag,
  FBTagV4,
  FBHighlight,
  FBHighlightV4,
  CreateUserRequest,
  UpdateUserUsernameRequest,
  UpdateUserRealnameRequest,
  UpdateUserProfilePictureRequest,
  UpdateUserSubscriptionRequest,
  UpdateUserPermissionRequest,
  UpdateUserPrivacyRequest,
  UpdateUserNotificationTokenRequest,
  UpdateSessionStatusRequest,
  UpdateSessionTeamNamesRequest,
  UpdateSessionHoopPointsRequest,
  UpdateSessionPaintKeypointsRequest,
  IgnoreSessionShotRequest,
  EditSessionShotStatusRequest,
  UpdateShotMinimapsV4Request,
  EditSessionShotPointsRequest,
  FeedItem,
  FeedStats,
  GetMyFeedRequest,
  GetDiscoverFeedRequest,
  GetProfileHighlightsRequest,
  GetMixtapesRequest,
  GetMixtapeLibraryRequest,
  GetMixtapeFavoritesRequest,
  CreateMixtapeRequest,
  UpdateMixtapeTitleRequest,
  UpdateMixtapeCaptionRequest,
  RemoveMixtapeHighlightRequest,
  UpdateMixtapeHighlightsRequest,
  AddMixtapeHighlightRequest,
  DeleteMixtapeRequest,
  FBSessionHighlights,
  SessionCard,
  FBEngagement,
  FBSession,
  FBSessionComment,
  FBShot,
  FBShotV4,
  FBBadge,
  NextMilestone,
  CreateBadgeRequest,
  EditBadgeRequest,
  CreateSessionRequest,
  PostSessionCommentRequest,
  PlayerStats,
  PlayerShotChart,
  CreateClusterTagRequest,
  CreateClusterTagV4Request,
  DeleteTagRequest,
  ResetTagRequest,
  EditTagV3Request,
  EditClusterTagV4Request,
  MigrateClusterTagsV4Request,
  CreateShotV4Request,
  CreateTagV4Request,
  EditTagV4Request,
  EditShotV4Request,
  EditHighlightV4Request,
  EditPointSystemRequest,
  EditSessionModeRequest,
  SyncSessionRequest,
  UnsyncSessionRequest,
  UpdateSyncShiftRequest,
  UploadRequest,
  UploadingRequest,
  DeleteSessionRequest,
  LikeFeedHighlightRequest,
  UnlikeFeedHighlightRequest,
  HideFeedHighlightRequest,
  ShowFeedHighlightRequest,
  DeleteFeedHighlightRequest,
  FavoriteHighlightRequest,
  UnfavoriteHighlightRequest,
  RequestFriendRequest,
  RemoveFriendRequest,
  AcceptFriendRequest,
  RejectFriendRequest,
  SendInviteRequest,
  SendFeedbackRequest,
  FBRelationship,
  TagInviteRequest,
  UpdateTrimmedSessionTsRequest,
  FBClusterTagV3,
  FBClusterTagV4,
  FBMixtape,
  FBMixtapeHighlight,
  SendReportRequest,
  SendVerificationEmailRequest,
  Group,
  CreateGroupRequest,
  UpdateGroupAvatarRequest,
  GetGroupMembersRequest,
  GetGroupScheduleRequest,
  GetGroupChatRequest,
  GetGroupSessionCardsRequest,
  GetGroupHighlightsRequest,
  GetGroupStatsRequest,
  FBKeyframeV4,
  FBGroupChatMessage,
  PostGroupChatMessageRequest,
  FBGroupEvent,
  DeclareGoingToEventRequest,
  DeclareNotGoingToEventRequest,
  CreateEventRequest,
  EventTickets,
  FBEventTicket,
  BoxScore,
  ProfileInfoType,
  FBNotif,
  MinimapShot,
  EditEventRequest,
  EditGroupRequest,
  DeleteGroupRequest,
  AddGroupMemberRequest,
  RemoveGroupMemberRequest,
  DeleteEventRequest,
  AddSessionsToGroupRequest,
  RemoveSessionsFromGroupRequest,
  UsernameSearchResult,
  GetGroupMixtapesRequest,
  GroupStatsBoxScore,
  Season,
  GetGroupSeasonsRequest,
  EditSeasonRequest,
  DeleteSeasonRequest,
  GroupMember,
  CreateSeasonRequest,
  PromoteGroupMemberToAdminRequest,
  BanGroupMemberRequest,
  DemoteGroupMemberFromAdminRequest,
  TransferOwnershipRequest,
  DismissAllNotifsRequest,
  BlockUserRequest,
  UpdateUserTermsAgreedVersionRequest,
  UpdateUserAppReviewedRequest,
  CheckUserAppReviewedRequest,
  UpdateUserDobRequest,
  SendUserParentPermissionEmailRequest,
  FBPlayerName,
  CreatePlayerNameRequest,
  DeletePlayerNameRequest,
  TagShotHighlight,
  GetGroupStoryExperimentRequest,
  GroupRecord,
  GetGroupRecordsRequest,
} from "./types";
import { standardizeText } from "./utils";

// ----------------------
// General endpoints
// ----------------------

/**
 * Get the version number
 */
export const getAppVersion = async (platform: string): Promise<string> => {
  return axiosInstance
    .get(`/version/${platform}`)
    .then((res) => res.data)
    .catch((err) => console.error("Error in `getAppVersion`:", err));
};

/**
 * Get the app outage
 */
export const checkAppOutage = async (): Promise<number> => {
  return axiosInstance
    .get(`/outage/app`)
    .then((res) => res.data)
    .catch((err) => console.error("Error in `checkAppOutage`:", err));
};

/**
 * Get the inference outage
 */
export const checkInferenceOutage = async (): Promise<number> => {
  return axiosInstance
    .get(`/outage/inference`)
    .then((res) => res.data)
    .catch((err) => console.error("Error in `checkInferenceOutage`:", err));
};

/**
 * Create a user
 * @param body (SendVerificationEmailRequest)
 */
export const sendVerificationEmail = async (
  body: SendVerificationEmailRequest
): Promise<void> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${EMAIL_VERIFICATION_ENDPOINT}`, body, config)
    .then((res) => res.data)
    .catch((err) => console.error("Error in `sendVerificationEmail`:", err));
};

/**
 * Check if a user exists
 * @returns (bool)
 */
export const checkUser = async (userId: string): Promise<boolean> => {
  return axiosInstance
    .get(`${USER_ENDPOINT}/check/${userId}`)
    .then((res) => res.data)
    .catch((err) => console.error("Error in `checkUser`:", err));
};

/**
 * Check if a username exists
 * @param username (string)
 * @returns (bool)
 */
export const checkUserUsername = async (username: string): Promise<boolean> => {
  username = standardizeText(username);
  return axiosInstance
    .get(`${USER_ENDPOINT}/check/username/${username}`)
    .then((res) => res.data)
    .catch((err) => console.error("Error in `checkUser`:", err));
};

/**
 * Get the latest terms and conditions version number
 */
export const getTermsAndConditionsVersion = async (): Promise<number> => {
  return axiosInstance
    .get(`/terms/version`)
    .then((res) => res.data)
    .catch((err) =>
      console.error("Error in `getTermsAndConditionsVersion`:", err)
    );
};

/**
 * Get the latest terms and conditions text
 */
export const getTermsAndConditionsText = async (): Promise<
  Record<string, string>
> => {
  return axiosInstance
    .get(`/terms/text`)
    .then((res) => res.data)
    .catch((err) =>
      console.error("Error in `getTermsAndConditionsText`:", err)
    );
};

/**
 * Fetch all created player names by user
 */
export const fetchNamesCreatedByUser = async (
  userId: string
): Promise<FBPlayerName[]> => {
  return axiosInstance
    .get(`${USER_ENDPOINT}/names/${userId}`)
    .then((res) => res.data)
    .catch((err) => console.error("Error in `checkUser`:", err));
};

/**
 * Create a player name
 */
export const createPlayerName = async (
  body: CreatePlayerNameRequest
): Promise<FBPlayerName> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${USER_ENDPOINT}/names/new`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `createPlayerName`:", err);
    });
};

/**
 * Delete a player name
 */
export const deletePlayerName = async (
  body: DeletePlayerNameRequest
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${USER_ENDPOINT}/names/delete`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `deletePlayerName`:", err);
    });
};

// ----------------------
// User endpoints
// ----------------------

/**
 * Gets a user using the logged in user
 * @returns (FBUser)
 */
export const fetchUser = async (user_id: string): Promise<FBUser> => {
  return axiosInstance
    .get(`${USER_ENDPOINT}/${user_id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchUser`:", err);
    });
};

/**
 * Gets a user by username for search
 * @returns (FBUser)
 */
export const searchByPartialUsername = async (
  partialUsername: string
): Promise<UsernameSearchResult[]> => {
  return axiosInstance
    .get(`${USER_ENDPOINT}/search/${partialUsername}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `searchByPartialUsername`:", err);
    });
};

/**
 * Create a user
 * @param body (CreateUserRequest)
 * @returns (FBUser)
 */
export const createUser = async (body: CreateUserRequest): Promise<FBUser> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${USER_ENDPOINT}`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `createUser`:", err);
    });
};

/**
 * Send invitation
 * @param body (SendInviteRequest)
 */
export const sendInvite = async (body: SendInviteRequest): Promise<void> => {
  const config = { headers: { "Content-Type": "application/json" } };
  return axiosInstance
    .post(`${USER_ENDPOINT}/invite`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `sendInvite`:", err);
    });
};

/**
 * Send feedback
 * @param body (SendFeedbackRequest)
 */
export const sendFeedback = async (
  body: SendFeedbackRequest
): Promise<void> => {
  const config = { headers: { "Content-Type": "application/json" } };
  return axiosInstance
    .post(`${USER_ENDPOINT}/feedback`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `sendFeedback`:", err);
    });
};

/**
 * Send report
 * @param body (SendReportRequest)
 */
export const sendReport = async (body: SendReportRequest): Promise<void> => {
  const config = { headers: { "Content-Type": "application/json" } };
  return axiosInstance
    .post(`${USER_ENDPOINT}/report`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `sendReport`:", err);
    });
};

/**
 * Block user
 * @param body (BlockUserRequest)
 */
export const blockUser = async (body: BlockUserRequest): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } };
  return axiosInstance
    .post(`${USER_ENDPOINT}/block`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `blockUser`:", err);
    });
};

/**
 * Update username for a user
 * @param body (UpdateUserUsernameRequest)
 * @returns (FBUser)
 */
export const updateUserUsername = async (
  body: UpdateUserUsernameRequest
): Promise<FBUser> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${USER_ENDPOINT}/username`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `updateUserUsername`:", err);
    });
};

/**
 * Update first/last name for a user
 * @param body (UpdateUserRealnameRequest)
 * @returns (FBUser)
 */
export const updateUserRealname = async (
  body: UpdateUserRealnameRequest
): Promise<FBUser> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${USER_ENDPOINT}/realname`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `updateUserRealname`:", err);
    });
};

/**
 * Update profile picture for a user
 * @param body (UpdateUserProfilePictureRequest)
 * @returns (FBUser)
 */
export const updateUserProfilePicture = async (
  body: UpdateUserProfilePictureRequest
): Promise<FBUser> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${USER_ENDPOINT}/picture`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `updateUserProfilePicture`:", err);
    });
};

/**
 * Update subscription for a user
 * @param body (UpdateUserSubscriptionRequest)
 * @returns (FBUser)
 */
export const updateUserSubscription = async (
  body: UpdateUserSubscriptionRequest
): Promise<FBUser> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${USER_ENDPOINT}/subscription`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `updateUserSubscription`:", err);
    });
};

/**
 * Update permissions for a user
 * @param body (UpdateUserPermissionRequest)
 * @returns (FBUser)
 */
export const updateUserPermission = async (
  body: UpdateUserPermissionRequest
): Promise<FBUser> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${USER_ENDPOINT}/permission`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `updateUserPermission`:", err);
    });
};

/**
 * Update permissions for a user
 * @param body (UpdateUserPrivacyRequest)
 * @returns (FBUser)
 */
export const updateUserPrivacy = async (
  body: UpdateUserPrivacyRequest
): Promise<FBUser> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${USER_ENDPOINT}/privacy`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `updateUserPrivacy`:", err);
    });
};

/**
 * Update date of birth (dob) for a user
 * @param body (UpdateUserDobRequest)
 * @returns (FBUser)
 */
export const updateUserDob = async (
  body: UpdateUserDobRequest
): Promise<FBUser> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${USER_ENDPOINT}/dob`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `updateUserDob`:", err);
    });
};

/**
 * Send permission email to the user's parent
 * @param body (SendUserParentPermissionEmailRequest)
 * @returns (FBUser)
 */
export const sendUserParentPermissionEmail = async (
  body: SendUserParentPermissionEmailRequest
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${USER_ENDPOINT}/sendParentPermissionEmail`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `sendUserParentPermissionRequest`:", err);
    });
};

/**
 * Update notification for a user
 * @param body (UpdateUserNotificationTokenRequest)
 * @returns (FBUser)
 */
export const updateUserNotificationToken = async (
  body: UpdateUserNotificationTokenRequest
): Promise<FBUser> => {
  const config = { headers: { "Content-Type": "application/json" } };
  return axiosInstance
    .post(`${USER_ENDPOINT}/notification/token`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `updateUserNotificationToken`:", err);
    });
};

/**
 * Update permissions for a user
 * @param body (UpdateUserPrivacyRequest)
 * @returns (FBUser)
 */
export const updateUserTermsAgreedVersion = async (
  body: UpdateUserTermsAgreedVersionRequest
): Promise<FBUser> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${USER_ENDPOINT}/terms`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `updateUserTermsAgreedVersion`:", err);
    });
};

/**
 * Deletes a user
 * @returns boolean
 */
export const deleteUser = async (userId: string): Promise<boolean> => {
  return axiosInstance
    .post(`${USER_ENDPOINT}/${userId}/delete`)
    .then((res) => res.data)
    .catch((err) => console.error("Error in `deleteUser`:", err));
};

/**
 * Check if we should request a review from the user
 * @return boolean
 */
export const checkUserAppReviewed = async (
  body: CheckUserAppReviewedRequest
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${USER_ENDPOINT}/review/check`, body, config)
    .then((res) => res.data)
    .catch((err) => console.error("Error in `checkUserAppReviewed`:", err));
};

/**
 * Deletes a user
 * @returns boolean
 */
export const updateUserAppReviewed = async (
  body: UpdateUserAppReviewedRequest
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${USER_ENDPOINT}/review/requested`, body, config)
    .then((res) => res.data)
    .catch((err) => console.error("Error in `updateUserAppReviewed`:", err));
};

// ----------------------
// Profile endpoints
// ----------------------

/**
 * Fetch profile info
 * @param userId (string)
 * @returns (ProfileInfo)
 */
export const fetchProfileInfo = async (
  userId: string
): Promise<ProfileInfoType> => {
  return axiosInstance
    .get(`${PROFILE_ENDPOINT}/info/${userId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchProfileInfo`:", err);
    });
};

/**
 * Fetch profile highlights from recent sessions
 * @param req
 * @returns
 */
export const fetchProfileHighlights = async (
  req: GetProfileHighlightsRequest
): Promise<FBSessionHighlights[]> => {
  return axiosInstance
    .get(`${PROFILE_ENDPOINT}/highlights/${req.userId}`, {
      params: {
        page: req.page || 0,
        limit: req.limit || 10,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchMixtapeLibrary`:", err);
    });
};

/**
 * Fetch career calendar
 * @param userId (string)
 * @returns (number[])
 */
export const fetchCareerCalendar = async (
  userId: string
): Promise<number[]> => {
  return axiosInstance
    .get(`${PROFILE_ENDPOINT}/career/calendar/${userId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchCareerCalendar`:", err);
    });
};

/**
 * Fetch career log
 * @param userId (string)
 * @returns (BoxScore[])
 */
export const fetchCareerLog = async (
  userId: string,
  window: number = 365
): Promise<BoxScore[]> => {
  return axiosInstance
    .get(`${PROFILE_ENDPOINT}/career/log/${userId}`, {
      params: { window: window },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchCareerLog`:", err);
    });
};

/**
 * Fetch career shotchart
 * @param userId (string)
 * @param window (number)
 * @returns (MinimapShot[])
 */
export const fetchCareerShotchart = async (
  userId: string,
  window: number = 365
): Promise<MinimapShot[]> => {
  return axiosInstance
    .get(`${PROFILE_ENDPOINT}/career/shotchart/${userId}`, {
      params: { window: window },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchCareerShotchart`:", err);
    });
};

/**
 * Fetch training calendar
 * @param userId (string)
 * @returns (number[])
 */
export const fetchTrainingCalendar = async (
  userId: string
): Promise<number[]> => {
  return axiosInstance
    .get(`${PROFILE_ENDPOINT}/training/calendar/${userId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchTrainingCalendar`:", err);
    });
};

/**
 * Fetch training log
 * @param userId (string)
 * @returns (BoxScore[])
 */
export const fetchTrainingLog = async (
  userId: string,
  window: number = 365
): Promise<BoxScore[]> => {
  return axiosInstance
    .get(`${PROFILE_ENDPOINT}/training/log/${userId}`, {
      params: { window: window },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchTrainingLog`:", err);
    });
};

/**
 * Fetch training shotchart
 * @param userId (string)
 * @param window (number)
 * @returns (MinimapShot[])
 */
export const fetchTrainingShotchart = async (
  userId: string,
  window: number = 365
): Promise<MinimapShot[]> => {
  return axiosInstance
    .get(`${PROFILE_ENDPOINT}/training/shotchart/${userId}`, {
      params: { window: window },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchTrainingShotchart`:", err);
    });
};

// ----------------------
// Badge endpoints
// ----------------------

/**
 * Fetch badges for a user
 * @param userId (string)
 */
export const fetchBadges = async (userId: string): Promise<FBBadge[]> => {
  return axiosInstance
    .get(`${BADGE_ENDPOINT}/user/${userId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchBadges`:", err);
    });
};

/**
 * Fetch a particular badge for a user
 * @param badgeId (string)
 */
export const fetchBadge = async (
  badgeId: string
): Promise<FBBadge | undefined> => {
  return axiosInstance
    .get(`${BADGE_ENDPOINT}/${badgeId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchBadge`:", err);
    });
};

/**
 * Fetch user's next milestone badge
 * @param userId (string)
 * @returns (NextMilestone)
 */
export const fetchNextMilestone = async (
  userId: string
): Promise<NextMilestone> => {
  return axiosInstance
    .get(`${BADGE_ENDPOINT}/milestone/${userId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchNextMilestone`:", err);
    });
};

// ----------------------
// Notification endpoints
// ----------------------

/**
 * Fetch notifications for a user
 * @param userId (string)
 * @param createdAfter (number)
 */
export const fetchNotifications = async (
  userId: string,
  createdAfter: number,
  limit: number = 30
): Promise<FBNotif[]> => {
  return axiosInstance
    .get(`${NOTIF_ENDPOINT}/user/${userId}`, {
      params: { created_after: createdAfter, limit: limit },
    })
    .then((res) => res.data)
    .catch((err) => console.error("Error in `fetchNotifications`:", err));
};

/**
 * Fetch developer notifications
 * @param createdAfter (number)
 */
export const fetchDeveloperNotifications = async (
  createdAfter: number,
  limit: number = 5
): Promise<FBNotif[]> => {
  return axiosInstance
    .get(`${NOTIF_ENDPOINT}/developer`, {
      params: { createdAfter: createdAfter, limit: limit },
    })
    .then((res) => res.data)
    .catch((err) =>
      console.error("Error in `fetchDeveloperNotifications`:", err)
    );
};

/**
 * Fetch the number of notifications for a user
 * @param userId (string)
 */
export const fetchNotificationCount = async (
  userId: string,
  createdAfter: number
): Promise<number> => {
  return axiosInstance
    .get(`${NOTIF_ENDPOINT}/count/${userId}`, {
      params: { created_after: createdAfter },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchNotificationCount`:", err);
    });
};

/**
 * Fetch a particular badge for a user
 * @param badgeId (string)
 */
export const fetchNotification = async (notifId: string): Promise<FBNotif> => {
  return axiosInstance
    .get(`${NOTIF_ENDPOINT}/${notifId}`)
    .then((res) => res.data)
    .catch((err) => console.error("Error in `fetchNotification`:", err));
};

/**
 * Dismiss a notification
 * @param notifId (string)
 */
export const dismissNotification = async (
  notifId: string
): Promise<boolean> => {
  return axiosInstance
    .post(`${NOTIF_ENDPOINT}/dismiss/${notifId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `dismissNotification`:", err);
    });
};

/**
 * Dismiss all notifications
 * @param body DismissAllNotifsRequest
 */
export const dismissAllNotifications = async (
  body: DismissAllNotifsRequest
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } };
  return axiosInstance
    .post(`${NOTIF_ENDPOINT}/all/dismiss`, body, config)
    .then((res) => res.data)
    .catch((err) => console.error("Error in `dismissAllNotifications`:", err));
};

// ----------------------
// Mixtape endpoints
// ----------------------

/**
 * Fetch a user's mixtapes
 * @param userId (string)
 * @param page (number)
 * @param limit (number)
 */
export const fetchMixtapes = async (
  req: GetMixtapesRequest
): Promise<FBMixtape[]> => {
  return axiosInstance
    .get(`${MIXTAPE_ENDPOINT}/user/${req.userId}`, {
      params: {
        page: req.page || 0,
        limit: req.limit || 10,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchMixtapes`:", err);
    });
};

/**
 * Fetch a mixtape
 * @param mixtapeId
 * @returns
 */
export const fetchMixtape = async (mixtapeId: string): Promise<FBMixtape> => {
  return axiosInstance
    .get(`${MIXTAPE_ENDPOINT}/${mixtapeId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchMixtape`:", err);
    });
};

/**
 * Fetch highlights in a session
 * @param req
 * @returns
 */
export const fetchMixtapeLibrary = async (
  req: GetMixtapeLibraryRequest
): Promise<FBSessionHighlights[]> => {
  return axiosInstance
    .get(`${MIXTAPE_ENDPOINT}/user/${req.userId}/library`, {
      params: {
        page: req.page || 0,
        limit: req.limit || 10,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchMixtapeLibrary`:", err);
    });
};

/**
 * Fetch favorited highlights
 * @param req
 * @returns
 */
export const fetchMixtapeFavorites = async (
  req: GetMixtapeFavoritesRequest
): Promise<FBMixtapeHighlight[]> => {
  return axiosInstance
    .get(`${MIXTAPE_ENDPOINT}/user/${req.userId}/favorites`, {
      params: {
        page: req.page || 0,
        limit: req.limit || 50,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchMixtapeFavorites`:", err);
    });
};

/**
 * Fetch "most recent" mixtape
 * @param userId
 * @returns
 */
export const fetchRecentMixtape = async (
  userId: string
): Promise<FBMixtape | undefined> => {
  return axiosInstance
    .get(`${MIXTAPE_ENDPOINT}/recent/${userId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchDefaultMixtape`:", err);
    });
};

/**
 * Create a mixtape
 * @param body (CreateMixtapeRequest)
 * @returns (FBMixtape)
 */
export const createMixtape = async (
  body: CreateMixtapeRequest
): Promise<FBMixtape> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${MIXTAPE_ENDPOINT}/`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `createMixtape`:", err);
    });
};

/**
 * Update mixtape title
 * @param body (UpdateMixtapeTitleRequest)
 * @returns (FBMixtape)
 */
export const updateMixtapeTitle = async (
  body: UpdateMixtapeTitleRequest
): Promise<FBMixtape> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${MIXTAPE_ENDPOINT}/title`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `updateMixtapeTitle`:", err);
    });
};

/**
 * Update mixtape caption
 * @param body (UpdateMixtapeCaptionRequest)
 * @returns (FBMixtape)
 */
export const updateMixtapeCaption = async (
  body: UpdateMixtapeCaptionRequest
): Promise<FBMixtape> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${MIXTAPE_ENDPOINT}/caption`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `updateMixtapeCaption`:", err);
    });
};

/**
 * Update mixtape highlights
 * @param body (UpdateMixtapeHighlightsRequest)
 * @returns (FBMixtape)
 */
export const updateMixtapeHighlights = async (
  body: UpdateMixtapeHighlightsRequest
): Promise<FBMixtape> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${MIXTAPE_ENDPOINT}/highlights/update`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `updateMixtapeHighlights`:", err);
    });
};

/**
 * Remove mixtape highlight
 * @param body (RemoveMixtapeHighlightRequest)
 * @returns (FBMixtape)
 */
export const removeMixtapeHighlight = async (
  body: RemoveMixtapeHighlightRequest
): Promise<FBMixtape> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${MIXTAPE_ENDPOINT}/highlights/remove`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `removeMixtapeHighlight`:", err);
    });
};

/**
 * Add mixtape highlight
 * @param body (RemoveMixtapeHighlightRequest)
 * @returns (FBMixtape)
 */
export const addMixtapeHighlight = async (
  body: AddMixtapeHighlightRequest
): Promise<FBMixtape> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${MIXTAPE_ENDPOINT}/highlights/add`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `addMixtapeHighlight`:", err);
    });
};

/**
 * Delete mixtape title
 * @param body (DeleteMixtapeRequest)
 * @returns (FBMixtape)
 */
export const deleteMixtape = async (
  mixtapeId: string,
  body: DeleteMixtapeRequest
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${MIXTAPE_ENDPOINT}/${mixtapeId}/delete`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `deleteMixtape`:", err);
    });
};

/**
 * ----------------------
 * Group endpoints
 * ----------------------
 */

/**
 * Return groups of user
 */
export const fetchGroups = async (
  userId: string,
  page: number = 0,
  limit: number = 20
): Promise<Group[]> => {
  return axiosInstance
    .get(`${GROUP_ENDPOINT}`, {
      params: {
        userId: userId,
        page: page,
        limit: limit,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchGroups`:", err);
    });
};

/**
 * Return single group
 */
export const fetchGroup = async (
  groupId: string,
  userId: string
): Promise<Group> => {
  return axiosInstance
    .get(`${GROUP_ENDPOINT}/${groupId}`, {
      params: {
        userId: userId,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchGroup`:", err);
    });
};

/**
 * Create group for a user
 */
export const createGroup = async (body: CreateGroupRequest): Promise<Group> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${GROUP_ENDPOINT}/create`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `createGroup`:", err);
    });
};

/**
 * Edit group
 */
export const editGroup = async (
  body: EditGroupRequest,
  fieldsToUpdate: string[] // Add fieldsToUpdate parameter
): Promise<Group> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  const payload = {
    body,
    fieldsToUpdate,
  };
  return axiosInstance
    .post(`${GROUP_ENDPOINT}/edit`, payload, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `editGroup`:", err);
    });
};

/**
 * Delete group
 */
export const deleteGroup = async (
  body: DeleteGroupRequest
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${GROUP_ENDPOINT}/delete`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `deleteGroup`:", err);
    });
};

/**
 * Add group member
 */
export const addGroupMember = async (
  body: AddGroupMemberRequest
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${GROUP_ENDPOINT}/members/add`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `addGroupMember`:", err);
    });
};

/**
 * Remove group member
 */
export const removeGroupMember = async (
  body: RemoveGroupMemberRequest
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${GROUP_ENDPOINT}/members/remove`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `removeGroupMember`:", err);
    });
};

/**
 * Ban group member
 */
export const banGroupMember = async (
  body: BanGroupMemberRequest
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${GROUP_ENDPOINT}/members/ban`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `banGroupMember`:", err);
    });
};

/**
 * Promote a group member to an admin
 */
export const promoteGroupMemberToAdmin = async (
  body: PromoteGroupMemberToAdminRequest
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${GROUP_ENDPOINT}/members/promote/admin`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `promoteGroupMemberToAdmin`:", err);
    });
};

/**
 * Demote a group member to an admin
 */
export const demoteGroupMemberFromAdmin = async (
  body: DemoteGroupMemberFromAdminRequest
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${GROUP_ENDPOINT}/members/demote/admin`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `demoteGroupMemberFromAdmin`:", err);
    });
};

/**
 * Transfer group ownership
 */
export const transferGroupOwnership = async (
  body: TransferOwnershipRequest
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${GROUP_ENDPOINT}/owner/change`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `transferGroupOwnership`:", err);
    });
};

/**
 * Update avatar for a group
 * @param body (UpdateGroupAvatarRequest)
 * @returns (Group)
 */
export const updateGroupAvatar = async (
  body: UpdateGroupAvatarRequest
): Promise<Group> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${GROUP_ENDPOINT}/avatar`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `updateGroupAvatar`:", err);
    });
};

/**
 * Return members of group
 */
export const fetchGroupSeasons = async (
  req: GetGroupSeasonsRequest
): Promise<Season[]> => {
  return axiosInstance
    .get(`${GROUP_ENDPOINT}/seasons/${req.groupId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchGroupSeasons`:", err);
    });
};

/**
 * Edit event for a group
 */
export const editSeason = async (
  body: EditSeasonRequest,
  fieldsToUpdate: string[]
): Promise<Season> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  const payload = {
    body,
    fieldsToUpdate,
  };
  return axiosInstance
    .post(`${GROUP_ENDPOINT}/season/edit`, payload, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `editSeason`:", err);
    });
};

/**
 * Create group for a user
 */
export const createSeason = async (
  body: CreateSeasonRequest
): Promise<Season> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${GROUP_ENDPOINT}/season/create`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `createSeason`:", err);
    });
};

/**
 * Delete season for a group
 */
export const deleteSeason = async (
  body: DeleteSeasonRequest
): Promise<Boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${GROUP_ENDPOINT}/season/delete`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `deleteSeason`:", err);
    });
};

/**
 * Return members of group
 */
export const fetchGroupMembers = async (
  req: GetGroupMembersRequest
): Promise<GroupMember[]> => {
  return axiosInstance
    .get(`${GROUP_ENDPOINT}/members/${req.groupId}`, {
      params: {
        groupId: req.groupId,
        page: req.page || 0,
        limit: req.limit || 10,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchGroupMembers`:", err);
    });
};

/**
 * Return schedule of group
 */
export const fetchGroupSchedule = async (
  req: GetGroupScheduleRequest
): Promise<EventTickets[]> => {
  return axiosInstance
    .get(`${GROUP_ENDPOINT}/schedule/${req.groupId}`, {
      params: {
        groupId: req.groupId,
        page: req.page || 0,
        limit: req.limit || 10,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchGroupSchedule`:", err);
    });
};

/**
 * Return games of group
 */
export const fetchGroupSessionCards = async (
  req: GetGroupSessionCardsRequest
): Promise<[number, SessionCard[]]> => {
  return axiosInstance
    .get(`${GROUP_ENDPOINT}/cards/${req.groupId}`, {
      params: {
        groupId: req.groupId,
        page: req.page || 0,
        limit: NUM_SESSIONS_IN_GAMES,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchGroupSessionCards`:", err);
    });
};

/**
 * Return highlights of group
 */
export const fetchGroupHighlights = async (
  req: GetGroupHighlightsRequest
): Promise<FBHighlightV4[]> => {
  return axiosInstance
    .get(`${GROUP_ENDPOINT}/highlights/${req.groupId}`, {
      params: {
        groupId: req.groupId,
        page: req.page || 0,
        limit: req.limit || 10,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchGroupHighlights`:", err);
    });
};

/**
 * Return mixtapes of group
 */
export const fetchGroupMixtapes = async (
  req: GetGroupMixtapesRequest
): Promise<FBMixtape[]> => {
  return axiosInstance
    .get(`${GROUP_ENDPOINT}/mixtapes/${req.groupId}`, {
      params: {
        groupId: req.groupId,
        page: req.page || 0,
        limit: req.limit || 10,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchGroupMixtapes`:", err);
    });
};

/**
 * Return stats of group
 */
export const fetchGroupStats = async (
  req: GetGroupStatsRequest
): Promise<GroupStatsBoxScore[]> => {
  return axiosInstance
    .get(`${GROUP_ENDPOINT}/stats/${req.groupId}`, {
      params: {
        group_id: req.groupId,
        from_date: req.fromDate,
        to_date: req.toDate,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchGroupStats`:", err);
    });
};

/**
 * Return stat leaders of group
 */
export const fetchGroupStatLeaders = async (
  req: GetGroupStatsRequest
): Promise<GroupStatsBoxScore[]> => {
  return axiosInstance
    .get(`${GROUP_ENDPOINT}/stats/leaders/${req.groupId}`, {
      params: {
        group_id: req.groupId,
        from_date: req.fromDate,
        to_date: req.toDate,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchGroupStatLeaders`:", err);
    });
};

/**
 * Return group story experiment link
 */
export const fetchGroupStoryExperiment = async (
  req: GetGroupStoryExperimentRequest
): Promise<string | undefined> => {
  return axiosInstance
    .get(`${GROUP_ENDPOINT}/groupStoryExperiment/${req.groupId}`, {
      params: {
        group_id: req.groupId,
        userId: req.userId,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchGroupStoryExperiment`:", err);
    });
};

// ----------------------
// Group event endpoints
// ----------------------

/**
 * Create event for a group
 */
export const createEvent = async (
  body: CreateEventRequest
): Promise<[FBGroupEvent, FBEventTicket]> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${GROUP_ENDPOINT}/event/create`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `createEvent`:", err);
    });
};

/**
 * Edit event for a group
 */
export const editEvent = async (
  body: EditEventRequest,
  fieldsToUpdate: string[] // Add fieldsToUpdate parameter
): Promise<FBGroupEvent> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  const payload = {
    body,
    fieldsToUpdate,
  };
  return axiosInstance
    .post(`${GROUP_ENDPOINT}/event/edit`, payload, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `editEvent`:", err);
    });
};

/**
 * Delete event for a group
 */
export const deleteEvent = async (
  body: DeleteEventRequest
): Promise<Boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${GROUP_ENDPOINT}/event/delete`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `deleteEvent`:", err);
    });
};

/**
 * Return updated event
 */
export const declareGoingToEvent = async (
  body: DeclareGoingToEventRequest
): Promise<FBEventTicket> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${GROUP_ENDPOINT}/event/going`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `declareGoingToEvent`:", err);
    });
};

/**
 * Return updated event
 */
export const declareNotGoingToEvent = async (
  body: DeclareNotGoingToEventRequest
): Promise<FBEventTicket> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${GROUP_ENDPOINT}/event/notGoing`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `declareNotGoingToEvent`:", err);
    });
};

// ----------------------
// Group chat endpoints
// ----------------------

/**
 * Return chat of group
 */
export const fetchGroupChat = async (
  req: GetGroupChatRequest
): Promise<FBGroupChatMessage[]> => {
  return axiosInstance
    .get(`${GROUP_ENDPOINT}/chat/${req.groupId}`, {
      params: {
        groupId: req.groupId,
        page: req.page || 0,
        limit: req.limit || 10,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchGroupChat`:", err);
    });
};

/**
 * Return a message from a chat of group
 */
export const fetchGroupChatMessageById = async (
  messageId: string
): Promise<FBGroupChatMessage | undefined> => {
  return axiosInstance
    .get(`${GROUP_ENDPOINT}/message/${messageId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchGroupChatMessageById`:", err);
    });
};

/**
 * Post a new group chat message
 * @param body (PostGroupChatMessageRequest)
 * @returns (FBGroupChatMessage) I wonder if we should return the most up to date chat list
 */
export const postGroupChatMessage = async (
  body: PostGroupChatMessageRequest
): Promise<FBGroupChatMessage> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${GROUP_ENDPOINT}/chat`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `postGroupChatMessage`:", err);
    });
};

// ---------------------- 
// Group records endpoints
// ----------------------

/**
 * Return records of group
 */
export const fetchGroupRecords = async (
  req: GetGroupRecordsRequest
): Promise<GroupRecord[]> => {
  return axiosInstance
    .get(`${GROUP_ENDPOINT}/records/${req.groupId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchGroupRecords`:", err);
    });
};

// ----------------------
// Group games endpoints
// ----------------------

/**
 * Add session(s) to group
 */
export const addSessionsToGroup = async (
  body: AddSessionsToGroupRequest
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${GROUP_ENDPOINT}/session/add`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `addSessionsToGroup`:", err);
    });
};

/**
 * Remove session(s) from group
 */
export const removeSessionsFromGroup = async (
  body: RemoveSessionsFromGroupRequest
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${GROUP_ENDPOINT}/session/remove`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `removeSessionsFromGroup`:", err);
    });
};

// ----------------------
// Friend endpoints
// ----------------------

/**
 * Return friends of user
 */
export const fetchFriends = async (
  userId: string,
  page: number = 0,
  limit: number = 50
): Promise<Friend[]> => {
  return axiosInstance
    .get(`${FRIEND_ENDPOINT}`, {
      params: {
        userId: userId,
        page: page,
        limit: limit,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchFriends`:", err);
    });
};

export const fetchFriendshipByUserId = async (
  userId: string,
  friendId: string
): Promise<FBRelationship> => {
  return axiosInstance
    .get(`${FRIEND_ENDPOINT}/search/${friendId}`, {
      params: { userId: userId },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchFriendshipByUserId`:", err);
    });
};

/**
 * Return friend request by relationship ID
 * @param relationshipId (string)
 * @returns (FBRelationship)
 */
export const fetchFriendRequestById = async (
  relationshipId: string
): Promise<FBRelationship | undefined> => {
  return axiosInstance
    .get(`${FRIEND_ENDPOINT}/request/${relationshipId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchFriendRequestById`:", err);
    });
};

/**
 * Return friend requests of user
 */
export const fetchFriendRequests = async (
  userId: string,
  page: number = 0,
  limit: number = 5
): Promise<Friend[]> => {
  return axiosInstance
    .get(`${FRIEND_ENDPOINT}/requests`, {
      params: {
        userId: userId,
        page: page,
        limit: limit,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchFriendRequests`:", err);
    });
};

/**
 * Return friend recommendations of user
 */
export const fetchFriendRecommendations = async (
  userId: string,
  limit: number = 5,
  city?: string,
  state?: string,
  country?: string
): Promise<Friend[]> => {
  return axiosInstance
    .get(`${FRIEND_ENDPOINT}/recommendations/${userId}`, {
      params: {
        limit: limit,
        city: city,
        state: state,
        country: country,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchFriendRecommendations`:", err);
    });
};

export const requestFriend = async (
  body: RequestFriendRequest
): Promise<FBUser> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${FRIEND_ENDPOINT}/request`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `requestFriend`:", err);
    });
};

export const removeFriend = async (
  body: RemoveFriendRequest
): Promise<FBUser> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${FRIEND_ENDPOINT}/remove`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `removeFriend`:", err);
    });
};

export const acceptFriend = async (
  body: AcceptFriendRequest
): Promise<FBUser> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${FRIEND_ENDPOINT}/accept`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `acceptFriend`:", err);
    });
};

export const rejectFriend = async (
  body: RejectFriendRequest
): Promise<FBUser> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${FRIEND_ENDPOINT}/reject`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `rejectFriend`:", err);
    });
};

// ----------------------
// Feed endpoints
// ----------------------

/**
 * Fetches the "discover" feed
 * @param req (GetDiscoverFeedRequest)
 * @returns (FeedItem[])
 */

export const fetchDiscoverFeed = async (
  req: GetDiscoverFeedRequest
): Promise<FeedItem[]> => {
  const config = { params: req }; // Use params to send query parameters
  return axiosInstance
    .get(`${FEED_ENDPOINT}/discover`, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchDiscoverFeed`:", err);
    });
};

/**
 * Fetches the "for you" feed
 * @param req (GetMuFeedRequest)
 * @returns (FeedItem[])
 */
export const fetchMyFeed = async (
  userId: string,
  req: GetMyFeedRequest
): Promise<FeedItem[]> => {
  return axiosInstance
    .get(`${FEED_ENDPOINT}/${userId}`, {
      params: req,
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchMyFeed`:", err);
    });
};

/**
 * Fetch stats for a feed item
 * @param highlightId (string)
 * @returns (FeedStats): Engagement stats for a feed item
 */
export const fetchFeedStats = async (
  highlightId: string
): Promise<FeedStats> => {
  return axiosInstance
    .get(`${FEED_ENDPOINT}/highlight/stats/${highlightId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchFeedStats`:", err);
    });
};

/**
 * Record a "like" for a highlight in the feed
 * @param body (LikeFeedHighlightRequest)
 * @returns (FBEngagement)
 */
export const likeFeedHighlight = async (
  body: LikeFeedHighlightRequest
): Promise<FBEngagement> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${FEED_ENDPOINT}/highlight/like`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `likeFeedHighlight`:", err);
    });
};

/**
 * Removes a "like" for a highlght in the feed
 * @param body (UnlikeFeedHighlightRequest)
 * @returns (FBEngagement)
 */
export const unlikeFeedHighlight = async (
  body: UnlikeFeedHighlightRequest
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${FEED_ENDPOINT}/highlight/unlike`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `unlikeFeedHighlight`:", err);
    });
};

/**
 * Check if user likes a highlight in the feed
 * @param highlightId (string)
 * @param userId (string)
 * @returns
 */
export const checkLikeFeedHighlight = async (
  highlightId: string,
  userId: string
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .get(
      `${FEED_ENDPOINT}/highlight/check/like/${highlightId}/${userId}`,
      config
    )
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `checkLikeFeedHighlight`:", err);
    });
};

/**
 * Hide a highlight fromt he feed
 * @param body (HideFeedHighlightRequest)
 */
export const hideFeedHighlight = async (
  body: HideFeedHighlightRequest
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${FEED_ENDPOINT}/highlight/hide`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `hideFeedHighlight`:", err);
    });
};

/**
 * Show a highlight from the feed
 * @param body (ShowFeedHighlightRequest)
 */
export const showFeedHighlight = async (
  body: ShowFeedHighlightRequest
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${FEED_ENDPOINT}/highlight/show`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `showFeedHighlight`:", err);
    });
};

/**
 * Delete a highlight from the feed
 * @param body (DeleteFeedHighlightRequest)
 */
export const deleteFeedHighlight = async (
  body: DeleteFeedHighlightRequest
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${FEED_ENDPOINT}/highlight/delete`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `deleteFeedHighlight`:", err);
    });
};

// ======================
// Session endpoints
// ======================

/**
 * Create a session
 * @param body (CreateSessionRequest)
 * @param version (number)
 * @returns (FBSession)
 */
export const createSession = async (
  body: CreateSessionRequest,
  version: number = CURRENT_SESSION_VERSION
): Promise<SessionCard> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${SESSION_ENDPOINT}/v${version}`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `createSession`:", err);
    });
};

/**
 * Indicate that the session is uploading
 * @param body (UploadingRequest)
 */
export const uploadingSession = async (
  sessionId: string,
  body: UploadingRequest,
  version: number = CURRENT_SESSION_VERSION
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(
      `${SESSION_ENDPOINT}/v${version}/uploading/${sessionId}`,
      body,
      config
    )
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `uploadingSession`:", err);
    });
};

/**
 * Sets the video URL on the sesison object
 * @param sessionId (string)
 * @param body (UploadRequest)
 * @param version (number)
 */
export const uploadSession = async (
  sessionId: string,
  body: UploadRequest,
  version: number = CURRENT_SESSION_VERSION
): Promise<void> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${SESSION_ENDPOINT}/v${version}/upload/${sessionId}`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `uploadSession`:", err);
    });
};

/**
 * Delete a session
 * @param sessionId (string)
 * @param version (number)
 * @returns (boolean)
 */
export const deleteSession = async (
  sessionId: string,
  body: DeleteSessionRequest,
  version: number = CURRENT_SESSION_VERSION
): Promise<boolean> => {
  return axiosInstance
    .post(`${SESSION_ENDPOINT}/v${version}/${sessionId}/delete`, body)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `deleteSession`:", err);
    });
};

/**
 * Add editor to a session
 * @param sessionId (string)
 * @param body (TagInviteRequest)
 * * @param version
 */
export const addSessionEditor = async (
  sessionId: string,
  body: TagInviteRequest,
  version: number = CURRENT_SESSION_VERSION
): Promise<boolean> => {
  return axiosInstance
    .post(`${SESSION_ENDPOINT}/v${version}/editors/new/${sessionId}`, body)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `addSessionEditor`:", err);
    });
};

/**
 * Edit the point system for a session
 * @param sessionId
 * @param body (EditPointSystemRequest)
 * @param version
 * @returns
 */
export const editSessionPointSystem = async (
  sessionId: string,
  body: EditPointSystemRequest,
  version: number = CURRENT_SESSION_VERSION
): Promise<string> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(
      `${SESSION_ENDPOINT}/v${version}/edit/points/${sessionId}`,
      body,
      config
    )
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `editSessionPointSystem`:", err);
    });
};

/**
 * Edit the game type for a session
 * @param sessionId
 * @param body (EditSessionModeRequest)
 * @param version
 * @returns
 */
export const editSessionMode = async (
  sessionId: string,
  body: EditSessionModeRequest,
  version: number = CURRENT_SESSION_VERSION
): Promise<string> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(
      `${SESSION_ENDPOINT}/v${version}/edit/mode/${sessionId}`,
      body,
      config
    )
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `editSessionMode`:", err);
    });
};

/**
 * Sync two sessions together
 * @param body (SyncSessionRequest)
 * @param version
 * @returns
 */
export const syncSession = async (
  body: SyncSessionRequest,
  version: number = CURRENT_SESSION_VERSION
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${SESSION_ENDPOINT}/v${version}/sync`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `syncSession`:", err);
    });
};

/**
 * Un-sync two sessions together
 * @param body (UnsyncSessionRequest)
 * @param version
 * @returns
 */
export const unsyncSession = async (
  body: UnsyncSessionRequest,
  version: number = CURRENT_SESSION_VERSION
): Promise<SessionCard> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${SESSION_ENDPOINT}/v${version}/unsync`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `unsyncSession`:", err);
    });
};

export const updateSyncShift = async (
  body: UpdateSyncShiftRequest
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${SESSION_ENDPOINT}/shift/sync`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `updateSyncShift`:", err);
    });
};

/**
 * Fetch all sessions by page
 */
export const fetchSessionCards = async (
  userId: string,
  page: number = 0,
  limit: number = NUM_SESSIONS_IN_GAMES,
  version: number = CURRENT_SESSION_VERSION
): Promise<SessionCard[]> => {
  return axiosInstance
    .get(`${SESSION_ENDPOINT}/v${version}/cards/${userId}`, {
      params: {
        page: page,
        limit: limit,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchSessionCards`:", err);
    });
};

/**
 * Update session status
 * @param body (UpdateSessionStatusRequest)
 * @param version
 * @returns (string)
 */
export const updateSessionStatus = async (
  sessionId: string,
  body: UpdateSessionStatusRequest,
  version: number = CURRENT_SESSION_VERSION
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${SESSION_ENDPOINT}/v${version}/status/${sessionId}`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `updateSessionStatus`:", err);
    });
};

/**
 * Update session team names
 * @param body (UpdateSessionTeamNamesRequest)
 * @param version
 * @returns (string)
 */
export const updateSessionTeamNames = async (
  sessionId: string,
  body: UpdateSessionTeamNamesRequest,
  version: number = CURRENT_SESSION_VERSION
): Promise<FBSession> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(
      `${SESSION_ENDPOINT}/v${version}/team/names/${sessionId}`,
      body,
      config
    )
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `updateSessionTeamNames`:", err);
    });
};

/**
 * Update session team names
 * @param body (UpdateSessionHoopPointsRequest)
 * @returns (string)
 */
export const updateSessionHoopPointsV4 = async (
  sessionId: string,
  body: UpdateSessionHoopPointsRequest
): Promise<FBSession> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${SESSION_ENDPOINT}/v4/tags/hoops/${sessionId}`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `updateSessionHoopPointsV4`:", err);
    });
};

/**
 * Update session team names
 * @param body (UpdateSessionPaintKeypointsRequest)
 * @returns (string)
 */
export const updateSessionPaintKeypointsV4 = async (
  sessionId: string,
  body: UpdateSessionPaintKeypointsRequest
): Promise<FBSession> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${SESSION_ENDPOINT}/v4/tags/paints/${sessionId}`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `updateSessionPaintKeypointsV4`:", err);
    });
};

/**
 * Update session trimmedPausedTs field
 * @param body (UpdateTrimmedSessionTsRequest)
 * @param version
 * @returns (string)
 */
export const updateTrimmedSessionTs = async (
  sessionId: string,
  body: UpdateTrimmedSessionTsRequest,
  version: number = CURRENT_SESSION_VERSION
): Promise<string> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${SESSION_ENDPOINT}/v${version}/trim/${sessionId}`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `updateTrimmedSessionTs`:", err);
    });
};

/**
 * Fetch all sessions to sync with a query session id
 * @param userId
 * @param sessionId
 * @param version
 */
export const fetchSessionSyncCards = async (
  userId: string,
  sessionId: string,
  version: number = CURRENT_SESSION_VERSION
): Promise<SessionCard[]> => {
  return axiosInstance
    .get(`${SESSION_ENDPOINT}/v${version}/sync/cards/${userId}/${sessionId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchSessionSyncCards`:", err);
    });
};

/**
 * Fetch the raw session object
 * @param sessionId (string)
 * @param version
 * @returns (FBSession)
 */
export const fetchSession = async (
  sessionId: string,
  version: number = CURRENT_SESSION_VERSION
): Promise<FBSession | undefined> => {
  return axiosInstance
    .get(`${SESSION_ENDPOINT}/v${version}/${sessionId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchSession`:", err);
    });
};

/**
 * Fetch the session card
 * @param sessionId (string)
 * @param version
 * @returns (SessionCard)
 */
export const fetchSessionCard = async (
  sessionId: string,
  version: number = CURRENT_SESSION_VERSION
): Promise<SessionCard> => {
  return axiosInstance
    .get(`${SESSION_ENDPOINT}/v${version}/card/${sessionId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchSessionCard`:", err);
    });
};

/**
 * Fetch the synced session object
 * @param sessionId (string)\
 * @param version
 * @returns (FBSession)
 */
export const fetchSessionSynced = async (
  sessionId: string,
  version: number = CURRENT_SESSION_VERSION
): Promise<FBSession | undefined> => {
  return axiosInstance
    .get(`${SESSION_ENDPOINT}/v${version}/synced/${sessionId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchSessionSynced`:", err);
    });
};

/**
 * Fetch the session owner
 * @param sessionId (string)
 * @param version
 * @returns (FBSession)
 */
export const fetchSessionOwner = async (
  sessionId: string,
  version: number = CURRENT_SESSION_VERSION
): Promise<FBUser> => {
  return axiosInstance
    .get(`${SESSION_ENDPOINT}/v${version}/owner/${sessionId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchSessionOwner`:", err);
    });
};

/**
 * Fetch the session editors
 * @param sessionId (string)
 * @param version
 * @returns (List[str])
 */
export const fetchSessionEditors = async (
  sessionId: string,
  version: number = CURRENT_SESSION_VERSION
): Promise<string[]> => {
  return axiosInstance
    .get(`${SESSION_ENDPOINT}/v${version}/editors/${sessionId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchSessionEditors`:", err);
    });
};

/**
 * Fetch raw tags for a session
 * @param sessionId (string)
 * @param version
 * @returns (FBTag[])
 */
export const fetchSessionTags = async (
  sessionId: string,
  version: number = CURRENT_SESSION_VERSION
): Promise<FBTag[]> => {
  return axiosInstance
    .get(`${SESSION_ENDPOINT}/v${version}/tags/${sessionId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchSessionTags`:", err);
    });
};

/**
 * Fetch the session tags
 * @param sessionId (string)
 * @param version
 * @returns (FBTagV4[])
 */
export const fetchSessionTagsV4 = async (
  sessionId: string
): Promise<FBTagV4[]> => {
  return axiosInstance
    .get(`${SESSION_ENDPOINT}/v4/tags/${sessionId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchSessionTagsV4`:", err);
    });
};

/**
 * Fetch the session stats
 * @param sessionId (string)
 * @returns (PlayerStats[])
 */
export const fetchSessionStatsV2 = async (
  sessionId: string
): Promise<PlayerStats[]> => {
  return axiosInstance
    .get(`${SESSION_ENDPOINT}/v2/stats/${sessionId}`)
    .then((res) => res.data)
    .catch((err) => console.error("Error in `fetchSessionStats`:", err));
};

// ----------------------
// Session keyframe endpoints
// ----------------------

export const fetchSessionKeyframesV4 = async (
  sessionId: string
): Promise<FBKeyframeV4[]> => {
  return axiosInstance
    .get(`${SESSION_ENDPOINT}/v4/keyframes/${sessionId}`)
    .then((res) => res.data)
    .catch((err) => console.error("Error in `fetchSessionKeyframesV4`:", err));
};

// ----------------------
// Session badge endpoints
// ----------------------

export const fetchSessionBadgesV4 = async (
  sessionId: string
): Promise<FBBadge[]> => {
  return axiosInstance
    .get(`${BADGE_ENDPOINT}/session/${sessionId}`)
    .then((res) => res.data)
    .catch((err) => console.error("Error in `fetchSessionBadgesV4`:", err));
};

/**
 * Create a badge
 * @param body (CreateBadgeRequest)
 * @returns (FBBadge)
 */
export const createBadgeV4 = async (
  body: CreateBadgeRequest
): Promise<FBBadge> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${BADGE_ENDPOINT}/create`, body, config)
    .then((res) => res.data)
    .catch((err) => console.error("Error in `createBadgeV4`:", err));
};

/**
 * Edit the badge in a session
 * @param body (EditBadgeRequest)
 * @returns (FBBadge)
 */
export const editBadgeV4 = async (body: EditBadgeRequest): Promise<FBBadge> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${BADGE_ENDPOINT}/edit`, body, config)
    .then((res) => res.data)
    .catch((err) => console.error("Error in `editBadgeV4`:", err));
};

// ----------------------
// Session shots endpoints
// ----------------------

/**
 * Fetch the session shots
 * @param sessionId (string)
 * @returns (PlayerShotChart[])
 */
export const fetchSessionShotsV2 = async (
  sessionId: string
): Promise<PlayerShotChart[]> => {
  return axiosInstance
    .get(`${SESSION_ENDPOINT}/v2/shots/${sessionId}`)
    .then((res) => res.data)
    .catch((err) => console.error("Error in `fetchSessionShotsV2`:", err));
};

export const fetchSessionShotsRawV2 = async (
  sessionId: string
): Promise<FBShot[]> => {
  return axiosInstance
    .get(`${SESSION_ENDPOINT}/shots/raw/${sessionId}`)
    .then((res) => res.data)
    .catch((err) => console.error("Error in `fetchSessionShotsRawV2`:", err));
};

/**
 * Fetch the session shots
 * @param sessionId (string)
 * @returns (PlayerShotChart[])
 */
export const fetchSessionShotsV3 = async (
  sessionId: string
): Promise<FBShot[]> => {
  return axiosInstance
    .get(`${SESSION_ENDPOINT}/v3/shots/${sessionId}`)
    .then((res) => res.data)
    .catch((err) => console.error("Error in `fetchSessionShotsV3`:", err));
};

/**
 * Fetch the session shots
 * @param sessionId (string)
 * @returns (PlayerShotChart[])
 */
export const fetchSessionShotsV4 = async (
  sessionId: string
): Promise<FBShotV4[]> => {
  return axiosInstance
    .get(`${SESSION_ENDPOINT}/v4/shots/${sessionId}`)
    .then((res) => res.data)
    .catch((err) => console.error("Error in `fetchSessionShotsV4`:", err));
};

/**
 * Update shot properties
 * Only for v4
 */
export const editShotV4 = async (
  body: EditShotV4Request
): Promise<FBShotV4> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${SESSION_ENDPOINT}/v4/shots/edit`, body, config)
    .then((res) => res.data)
    .catch((err) => console.error("Error in `editShotV4`:", err));
};

/**
 * Update shot scorer locations
 */
export const updateShotMinimapsV4 = async (
  body: UpdateShotMinimapsV4Request
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${SESSION_ENDPOINT}/v4/shots/minimap/edit`, body, config)
    .then((res) => res.data)
    .catch((err) => console.error("Error in `updateShotMinimapsV4`:", err));
};

/**
 * Update highlight properties
 * Only for v4
 */
export const editHighlightV4 = async (
  body: EditHighlightV4Request
): Promise<FBHighlightV4> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${SESSION_ENDPOINT}/v4/highlights/edit`, body, config)
    .then((res) => res.data)
    .catch((err) => console.error("Error in `editHighlightV4`:", err));
};

/**
 * Update session team names
 * @note DEPRECATED for v4
 * @param body (IgnoreSessionShotRequest)
 * @param version
 * @returns (string)
 */
export const ignoreSessionShot = async (
  body: IgnoreSessionShotRequest,
  version: number = CURRENT_SESSION_VERSION
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${SESSION_ENDPOINT}/v${version}/shots/ignore`, body, config)
    .then((res) => res.data)
    .catch((err) => console.error("Error in `ignoreSessionShot`:", err));
};

/**
 * Update session shot status
 * @note DEPRECATED for v4
 * @param body (EditSessionShotStatusRequest)
 * @param version
 * @returns (string)
 */
export const editSessionShotStatus = async (
  body: EditSessionShotStatusRequest,
  version: number = CURRENT_SESSION_VERSION
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${SESSION_ENDPOINT}/v${version}/shots/edit/status`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `editSessionShotStatus`:", err);
    });
};

/**
 * Update session shot points
 * @note DEPRECATED for v4
 * @param body (EditSessionShotPointsRequest)
 * @param version
 * @returns (string)
 */
export const editSessionShotPoints = async (
  body: EditSessionShotPointsRequest,
  version: number = CURRENT_SESSION_VERSION
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${SESSION_ENDPOINT}/v${version}/shots/edit/points`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `editSessionShotPoints`:", err);
    });
};

// ----------------------
// Session clusters endpoints
// ----------------------

/**
 * Fetch cluster tags for a session
 * @param version
 */
export const fetchClusterTagsV3 = async (
  sessionId: string
): Promise<FBClusterTagV3[]> => {
  return axiosInstance
    .get(`${SESSION_ENDPOINT}/v3/tags/cluster/${sessionId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchClusterTagsV3`:", err);
    });
};

/**
 * Fetch a single cluster tag by id
 * @param clusterId (string)
 * @returns (FBClusterTagV4)
 */
export const fetchClusterTagV4 = async (
  clusterId: string
): Promise<FBClusterTagV4 | undefined> => {
  return axiosInstance
    .get(`${SESSION_ENDPOINT}/v4/cluster/${clusterId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchClusterTagV4`:", err);
    });
};

/**
 * Fetch all cluster tags for a session
 * @param sessionId (string)
 * @returns (FBClusterTagV4[])
 */
export const fetchClusterTagsV4 = async (
  sessionId: string
): Promise<FBClusterTagV4[]> => {
  return axiosInstance
    .get(`${SESSION_ENDPOINT}/v4/tags/cluster/${sessionId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchClusterTagsV4`:", err);
    });
};

/**
 * Create a new cluster tag for a tagged user
 * @param body (CreateTagV3Request)
 */
export const createClusterTagV3 = async (
  body: CreateClusterTagRequest
): Promise<FBClusterTagV3> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${SESSION_ENDPOINT}/v3/tags/cluster/create`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `createClusterTagV3`:", err);
    });
};

/**
 * Create a new cluster tag for a tagged user
 * @param body (CreateClusterTagRequestV4)
 */
export const createClusterTagV4 = async (
  body: CreateClusterTagV4Request
): Promise<FBClusterTagV4> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${SESSION_ENDPOINT}/v4/tags/cluster/create`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `createClusterTagV4`:", err);
    });
};

/**
 * Delete a new cluster tag for a tagged user
 * @param body (DeleteTagRequest)
 */
export const deleteClusterTag = async (
  body: DeleteTagRequest,
  version: number = CURRENT_SESSION_VERSION
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${SESSION_ENDPOINT}/v${version}/tags/cluster/delete`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `deleteClusterTag`:", err);
    });
};

/**
 * Reset all cluster tags for a session
 */
export const resetClusterTag = async (
  body: ResetTagRequest,
  version: number = CURRENT_SESSION_VERSION
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${SESSION_ENDPOINT}/v${version}/tags/reset`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `resetClusterTag`:", err);
    });
};

/**
 * Update the cluster tag for a tagged user
 * This could be player names, tagged user ids, or annotated shots
 */
export const editClusterTagV3 = async (
  body: EditTagV3Request
): Promise<FBClusterTagV3> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${SESSION_ENDPOINT}/v3/tags/cluster/edit`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `editClusterTagV3`:", err);
    });
};

export const editClusterTagV4 = async (
  body: EditClusterTagV4Request
): Promise<FBClusterTagV4> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${SESSION_ENDPOINT}/v4/tags/cluster/edit`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `editClusterTagV4`:", err);
    });
};

export const migrateClusterTagsV4 = async (
  body: MigrateClusterTagsV4Request
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${SESSION_ENDPOINT}/v4/tags/cluster/migrate`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `migrateClusterTagsV4`:", err);
    });
};

export const editTagV4 = async (body: EditTagV4Request): Promise<FBTagV4> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${SESSION_ENDPOINT}/v4/tags/edit`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `editTagV4`:", err);
    });
};

export const createTagV4 = async (
  body: CreateTagV4Request
): Promise<FBTagV4> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${SESSION_ENDPOINT}/v4/tags/create`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `createTagV4`:", err);
    });
};

export const createShotV4 = async (
  body: CreateShotV4Request
): Promise<TagShotHighlight> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${SESSION_ENDPOINT}/v4/shots/create`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `createShotV4`:", err);
    });
};

/**
 * Fetch raw tagged users for a session
 * @param sessionId (string)
 * @param version
 * @returns (FBUser[])
 */
export const fetchClusterTaggedUsers = async (
  sessionId: string,
  version: number = CURRENT_SESSION_VERSION
): Promise<FBUser[]> => {
  return axiosInstance
    .get(`${SESSION_ENDPOINT}/v${version}/tags/cluster/users/${sessionId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchClusterTaggedUsersV4`:", err);
    });
};

// ----------------------
// Session highlights endpoints
// ----------------------

export const fetchSessionHighlightsV2 = async (
  sessionId: string
): Promise<FBHighlight[]> => {
  return axiosInstance
    .get(`${SESSION_ENDPOINT}/v2/highlights/${sessionId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchSessionHighlightsV2`:", err);
    });
};

/**
 * Fetch the session highlights
 * @param sessionId (string)
 * @returns (FBHighlight[])
 */
export const fetchSessionHighlightsV3 = async (
  sessionId: string
): Promise<FBHighlight[]> => {
  return axiosInstance
    .get(`${SESSION_ENDPOINT}/v3/highlights/${sessionId}`)
    .then((res) => res.data)
    .catch((err) => console.error("Error in `fetchSessionHighlightsV3`:", err));
};

/**
 * Fetch the session highlights
 * @param sessionId (string)
 * @returns (FBHighlightV4[])
 */
export const fetchSessionHighlightsV4 = async (
  sessionId: string
): Promise<FBHighlightV4[]> => {
  return axiosInstance
    .get(`${SESSION_ENDPOINT}/v4/highlights/${sessionId}`)
    .then((res) => res.data)
    .catch((err) => console.error("Error in `fetchSessionHighlightsV4`:", err));
};

/**
 * Fetch a highlight by its ID
 * @param highlightId (string)
 * @returns (FBHighlightV4)
 */
export const fetchHighlightV4 = async (
  highlightId: string
): Promise<FBHighlightV4> => {
  return axiosInstance
    .get(`${SESSION_ENDPOINT}/v4/highlight/${highlightId}`)
    .then((res) => res.data)
    .catch((err) => console.error("Error in `fetchHighlightV4`:", err));
};

/**
 * Record a "favorite" for a highlight in a session
 * @param body (FavoriteHighlightRequest)
 * @param version
 * @returns (FBEngagement)
 */
export const favoriteHighlight = async (
  body: FavoriteHighlightRequest,
  version: number = CURRENT_SESSION_VERSION
): Promise<FBEngagement> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${SESSION_ENDPOINT}/v${version}/highlight/favorite`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `favoriteHighlight`:", err);
    });
};

/**
 * Remove a "favorite" for a highlight in a session
 * @param body (UnfavoriteHighlightRequest)
 * @param version
 * @returns (FBEngagement)
 */
export const unfavoriteHighlight = async (
  body: UnfavoriteHighlightRequest,
  version: number = CURRENT_SESSION_VERSION
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${SESSION_ENDPOINT}/v${version}/highlight/unfavorite`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `unfavoriteHighlight`:", err);
    });
};

/**
 * Check if user favorited a highlight in the feed
 * @param highlightId (string)
 * @param userId (string)
 * @param version
 * @returns
 */
export const checkFavoriteHighlight = async (
  highlightId: string,
  userId: string,
  version: number = CURRENT_SESSION_VERSION
): Promise<boolean> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .get(
      `${SESSION_ENDPOINT}/v${version}/highlight/check/like/${highlightId}/${userId}`,
      config
    )
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `checkFavoriteHighlight`:", err);
    });
};

// ----------------------
// Session comments endpoints
// ----------------------

export const fetchCommentById = async (
  commentId: string
): Promise<FBSessionComment | undefined> => {
  return axiosInstance
    .get(`${SESSION_ENDPOINT}/comment/${commentId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchCommentById`:", err);
    });
};

/**
 * Fetch the session comments
 * @param sessionId (string)
 * @param version
 * @returns (FBSessionComment[])
 */
export const fetchSessionComments = async (
  sessionId: string,
  version: number = CURRENT_SESSION_VERSION,
  page: number = 0,
  limit: number = NUM_COMMENTS_PER_CALL
): Promise<FBSessionComment[]> => {
  return axiosInstance
    .get(`${SESSION_ENDPOINT}/v${version}/comments/${sessionId}`, {
      params: {
        page: page,
        limit: limit,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `fetchSessionComments`:", err);
    });
};

/**
 * Post a new comment
 * @param body (PostSessionCommentRequest)
 * @param version
 * @returns (FBSession)
 */
export const postSessionComment = async (
  body: PostSessionCommentRequest,
  version: number = CURRENT_SESSION_VERSION
): Promise<FBSessionComment> => {
  const config = { headers: { "Content-Type": "application/json" } }; // to send as json
  return axiosInstance
    .post(`${SESSION_ENDPOINT}/comment`, body, config)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error in `postSessionComment`:", err);
    });
};
