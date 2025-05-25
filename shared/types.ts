import {
    CompositeScreenProps,
    NavigatorScreenParams,
  } from "@react-navigation/native";
  import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
  import { NativeStackScreenProps } from "@react-navigation/native-stack";
  
  /**
   * ======================
   * Firebase Types
   * ======================
   */
  
  // Firebase user type
  export type FBUser = {
    userId: string;
    username: string;
    tag: string;
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
    dob?: number;
    email: string;
    emailSecondary: string;
    parentEmail?: string;
    parentPermissionStatus?: string;
    type: string;
    subscriptionType: string;
    notificationToken?: string;
    subscribedTopics?: string[]; // topics that the user is subscribed to
    cameraPermission: number;
    microphonePermission: number;
    locationPermission: number;
    pushPermission: number;
    locationPrivacy: number;
    statsPrivacy: number;
    highlightsPrivacy: number;
    feedPrivacy: number;
    termsAgreedVersion?: number;
    appStoreReviewed?: number;
    lastReviewRequested?: number;
    createdAt: number;
    updatedAt: number;
  };
  
  export type FBRelationship = {
    userId: string;
    recipientId: string;
    status: string;
    relation: string;
    createdAt: number;
    updatedAt: number;
  };
  
  // Firebase engagement type
  export type FBEngagement = {
    userId: number;
    contentId: number;
    contentType: string;
    engagementType: string;
    data: Record<string, any>;
    createdAt: number;
    updatedAt: number;
  };
  
  // Firebase session type
  export type FBSession = {
    sessionId?: string;
    rnfsPath?: string;
    video1080pUrl?: string;
    video720pUrl?: string;
    video480pUrl?: string;
    video360pUrl?: string;
    video240pUrl?: string;
    video144pUrl?: string;
    videoUrl?: string;
    videoWidth?: number;
    videoHeight?: number;
    videoFps?: number;
    videoPreview?: string;
    userId: string;
    username: string;
    pausedTs: number[];
    predictions?: string;
    highlights: string[];
    statistics?: string;
    shots?: string;
    shotsV4?: string[];
    status: string;
    highlightsInFeed: boolean;
    taggedUsers: FBTag[];
    tagsV4?: string[];
    sessionLength: number;
    minimap: string;
    sessionType: string; // 1v1, 2v2, etc.
    sessionMode?: string; // is this a shootaround or a game
    recordingSetup?: string; // is this waterbottle or tripod
    visible: number;
    numPlayers: number; // number of expected players in the session
    city?: string;
    state?: string;
    country?: string;
    longitude?: number;
    latitude?: number;
    version?: number;
    messaged?: boolean; // have we sent a notification about this session?
    pointSystem?: number; // is this 2s and 3s, or 1s and 2s
    isExample?: boolean; // is this an example / demo session
    hasTeams?: boolean; // does this session have teams
    teamNames?: string[]; // list of two team names
    editors?: string[]; // user ids for people who tagged themselves
    stakeholders?: string[]; // user ids for people who have access to this session
    missingNet?: boolean; // does the court have a net?
    syncedSessionId?: string; // synced session ID
    syncedShiftTs?: number; // synced session shift timestamp
    recordingStartTs?: number;
    recordingEndTs?: number;
    originalDuration?: number;
    trimmedStartTs?: number;
    trimmedEndTs?: number;
    trimmedDuration?: number;
    numUploadAttempts?: number;
    eventId?: string;
    groupId?: string;
    // --- start v4 additions ---
    firebaseBucketPath?: string;
    annotatedHoopPoints?: number[];
    overrideNetPresences?: number[];
    overrideHoopBoxes?: number[];
    annotatedPaintKeypoints?: number[];
    runVersion?: number;
    allRunVersions?: number[];
    processingProgress?: number;
    clusterClasses?: number[];
    clusterTags?: string[];
    // --- end v4 additions ---
    createdAt: number;
    updatedAt: number;
  };
  
  export type FBSessionComment = {
    sessionId: string;
    userId: string;
    username?: string;
    profilePicture?: string;
    message: string;
    replyTo?: string;
    createdAt: number;
    updatedAt: number;
  };
  
  export type FBGroupChatMessage = {
    messageId?: string;
    groupId: string;
    userId: string;
    username?: string;
    profilePicture?: string;
    message: string;
    replyTo?: string;
    highlightId?: string;
    sessionId?: string;
    createdAt: number;
    updatedAt: number;
  };
  
  export type FBGroupEvent = {
    groupId?: string;
    creator: string;
    ownerId: string;
    admins: string[];
    title: string;
    startDateTime: number;
    endDateTime?: number;
    timezone?: string;
    locationFormattedAddress?: string;
    locationMainText?: string;
    locationSecondaryText?: string;
    locationTypes?: string[];
    locationCoordinates?: number[];
    eventId: string;
    description?: string;
    recurring?: boolean;
    eventType?: string;
    privacy?: number;
    lastUpdater: string;
    createdAt: number;
    updatedAt: number;
  };
  
  export type FBEventTicket = {
    ticketId: string;
    eventId: string;
    userId: string;
    groupId: string;
    attendanceType: string;
    note?: string;
    attendanceResult?: string;
    ticketType?: string;
    price?: number;
    paymentStatus?: string;
    createdAt: number;
    updatedAt: number;
  };
  
  export type EventTickets = {
    event: FBGroupEvent;
    tickets: Record<string, Record<string, FBEventTicket>>;
  };
  
  export type FBTag = {
    sessionId?: string;
    shotId?: number;
    personId?: number;
    tagImages: string[];
    teamId?: number | null;
    userId?: string | null;
    clusterId?: number | null;
    tagClusterId?: string;
    initClusterId?: number | null;
    name?: string | null;
    ignore?: boolean;
  };
  
  export type FBPlayerName = {
    nameId?: string;
    creatorId: string;
    name: string;
    visible: number;
    createdAt: number;
    updatedAt: number;
  };
  
  export type CreatePlayerNameRequest = {
    creatorId: string;
    name: string;
  };
  
  export type DeletePlayerNameRequest = {
    userId: string;
    nameId: string;
  };
  
  export type FBTagV4 = {
    tagId: string;
    sessionId: string;
    shotId: string;
    shotIdx?: number;
    personId?: number;
    actionId: number;
    tagImage: string;
    autoClusterId: number;
    clusterId?: string | null;
    ignore?: boolean;
    runVersion: number;
    createdAt: number;
    updatedAt: number;
  };
  
  export type FBClusterTagV2 = {
    clusterId: number;
    personIds: number[];
    tagImages: string[]; // list of tag images
    teamId?: number | null;
    userId?: string | null;
    name?: string | null;
  };
  
  export type FBClusterTagV3 = {
    clusterId?: string;
    taggerId?: string;
    sessionId: string;
    shotIds: number[];
    shotSessionIds: string[];
    teamId?: number;
    userId?: string;
    name?: string;
    createdAt: number;
    updatedAt: number;
  };
  
  export type FBClusterTagV4 = {
    clusterId?: string;
    clusterClass: number;
    taggerId?: string;
    sessionId: string;
    teamId?: number;
    userId?: string;
    nameId?: string;
    name?: string;
    ignore?: boolean;
    runVersion: number;
    createdAt: number;
    updatedAt: number;
  };
  
  // Firebase highlight type
  export type FBHighlight = {
    highlightId: string;
    sessionId: string;
    shotId?: number;
    personId?: number;
    preview: string;
    video: string;
    length: number;
    intervals: FBInterval[];
    visible?: number;
    showInFeed?: boolean;
    falsePositive?: number;
    isLowlight?: boolean;
  };
  
  export type FBHighlightV4 = {
    highlightId?: string;
    sessionId: string;
    shotIdx: number;
    shotId: string;
    preview: string;
    video: string;
    length: number;
    showInFeed?: boolean;
    isLowlight?: boolean;
    visible?: number;
    runVersion: number;
    createdAt: number;
    updatedAt: number;
  };
  
  export type FBKeyframeV4 = {
    keyframeId?: string;
    sessionId: string;
    startTs: number;
    endTs: number;
    idx: number;
    ts: number;
    path: string;
    height: number;
    width: number;
    runVersion: number;
    createdAt: number;
    updatedAt: number;
  };
  
  export type ClusterHighlightV2 = {
    clusterId: number | null;
    personIds: number[];
    highlights: FBHighlight[];
    name: string | null | undefined;
    userId: string | null | undefined;
  };
  
  export type ClusterHighlightV3 = {
    clusterId: string;
    shotIds?: number[];
    highlights: FBHighlight[];
    name?: string;
    userId?: string;
  };
  
  export type FBMixtapeHighlight = {
    highlightId: string;
    sessionId: string;
    shotId: number | string;
    shotIdx?: number;
    preview: string;
    video: string;
    length: number;
    startTime?: number;
    endTime?: number;
    version?: number;
    isLowlight?: boolean;
    // Adding these in 03/08 for filtering
    shotOutcome?: boolean;
    isTwoPoint?: boolean;
    annotatedShotOutcome?: boolean;
    annotatedIsTwoPoint?: boolean;
    sessionCreatedAt?: number;
  };
  
  export type FBSessionHighlights = {
    session: FBSession;
    highlights: FBMixtapeHighlight[];
  };
  
  export type FBMixtape = {
    mixtapeId?: string;
    userId: string;
    title: string;
    caption?: string;
    highlights: FBMixtapeHighlight[];
    editable?: boolean;
    visible: number;
    createdAt: number;
    updatedAt: number;
  };
  
  export type FBBadge = {
    badgeId?: string;
    userId?: string;
    sessionId?: string;
    clusterId?: string;
    badgeType: string;
    visible: number;
    runVersion?: number;
    createdAt: number;
    updatedAt: number;
  };
  
  export type GameBadgesV4 = {
    sessionId: string;
    scorer?: FBBadge;
    rebounder?: FBBadge;
    assister?: FBBadge;
  };
  
  export type NextMilestone = {
    milestone?: string;
    numWorkouts: number;
  };
  
  export type CreateBadgeRequest = {
    badgeType: string;
    sessionId: string;
    runVersion: number;
    clusterId?: string;
    userId?: string;
  };
  
  export type EditBadgeRequest = {
    badgeId: string;
    clusterId?: string;
    userId?: string;
    ignore?: boolean;
  };
  
  export type FBNotif = {
    notifId?: string;
    userId: string;
    notifType: string;
    objectId?: string;
    message?: string;
    visible: number;
    createdAt: number;
    updatedAt: number;
  };
  
  export type FBShot = {
    sessionId?: string;
    shotId?: number;
    ballId: number;
    frameIndexCreatedAt: number;
    frameIndexUpdatedAt: number;
    location?: number[];
    personId: number;
    status: number;
    points: number;
    isTwoPointShot?: boolean;
    isInPaint?: boolean;
    isInCourt?: boolean;
    distanceToHoop?: number;
    timestampCreatedAt: number;
    timestampUpdatedAt: number;
    ignore?: boolean;
  };
  
  export type FBShotV4 = {
    shotId?: string;
    sessionId: string;
    shotIdx?: number;
    ballId?: number;
    startTs?: number;
    endTs?: number;
    clipLength?: number;
    hoopId?: number;
    keyFrameBallTs?: number;
    keyFrameBallIdx?: number;
    keyFramePersonTs?: number;
    keyFramePersonIdx?: number;
    scorerId?: number;
    scorerPossessionFirstIdx?: number;
    scorerPossessionFirstTs?: number;
    scorerPossessionFirstBbox?: number[];
    scorerPossessionLastIdx?: number;
    scorerPossessionLastTs?: number;
    scorerPossessionLastBbox?: number[];
    shotOutcome?: boolean;
    shotOutcomeByBall?: boolean;
    shotOutcomeByNet?: boolean;
    shotOutcomeByModel?: boolean;
    shotAboveIdx?: number;
    shotBelowIdx?: number;
    shotAboveTs?: number;
    shotBelowTs?: number;
    assisterId?: number;
    assisterPossessionLastIdx?: number;
    assisterPossessionLastTs?: number;
    assisterPossessionLastBbox?: number[];
    rebounderId?: number;
    rebounderPossessionFirstIdx?: number;
    rebounderPossessionFirstTs?: number;
    rebounderPossessionFirstBbox?: number[];
    paintKeypoints?: number[];
    isTwoPoint?: boolean;
    annotatedShotOutcome?: boolean;
    annotatedIsTwoPoint?: boolean;
    ignore?: boolean;
    version: number;
    runVersion: number;
    createdAt: number;
    updatedAt: number;
    // frontend parameters for minimap location
    scorerLocation?: number[];
  };
  
  export type FBInterval = {
    personId: number;
    ballId: number;
    shotStatus: number;
    shotPoints?: number;
    shotLocation?: number[];
    startIndex: number;
    endIndex: number;
    createIndex: number;
    updateIndex: number;
    startTs: number;
    endTs: number;
    shotDetectedTs: number;
    shotClassifiedTs: number;
  };
  
  export type ClipInterval = {
    startTs: number;
    endTs: number;
    createdTs?: number;
    updatedTs?: number;
    sessionId?: string;
  };
  
  export type FullVideo = {
    sessionId: string;
    video: string;
    length: number;
    isLocal?: boolean;
  };
  
  /**
   * @param tag - The tag associated with the shot
   * @param shot - The underlying shot object
   * @param highlight - The highlight associated with the shot
   * @param rebound - The rebound tag associated with the shot (if one exists)
   * @param assist - The assist tag associated with the shot (if one exists)
   */
  export type TagShotHighlight = {
    tag: FBTagV4;
    shot: FBShotV4;
    highlight?: FBHighlightV4;
    rebound?: FBTagV4;
    assist?: FBTagV4;
  };
  
  /**
   * ======================
   * Request Types
   * ======================
   */
  
  // Request to create a user
  export type CreateUserRequest = {
    type: string;
    subscriptionType: string;
    username?: string;
    email?: string;
    notificationToken?: string;
  };
  
  // Request to update notification token
  export type SendVerificationEmailRequest = {
    userId: string;
    email: string;
  };
  
  // Request to update notification token
  export type UpdateUserNotificationTokenRequest = {
    userId: string;
    token: string | null;
  };
  
  // Request to update username
  export type UpdateUserUsernameRequest = {
    userId: string;
    username: string;
  };
  
  // Request to update real name
  export type UpdateUserRealnameRequest = {
    userId: string;
    firstName?: string;
    lastName?: string;
  };
  
  // Request to update profile picture
  export type UpdateUserProfilePictureRequest = {
    userId: string;
    profilePicture: string;
  };
  
  // Request to update subscription
  export type UpdateUserSubscriptionRequest = {
    userId: string;
    subscriptionType: string;
  };
  
  // Request to update permissions
  export type UpdateUserPermissionRequest = {
    userId: string;
    category: string;
    permission: number;
  };
  
  // Request to update privacy
  export type UpdateUserPrivacyRequest = {
    userId: string;
    category: string;
    privacy: number;
  };
  
  // Request to update date of birth (dob)
  export type UpdateUserDobRequest = {
    userId: string;
    dob: number;
  };
  
  // Request to send the user's parent an email to request permission
  export type SendUserParentPermissionEmailRequest = {
    userId: string;
    parentEmail: string;
  };
  
  // Request to update terms and conditions agreed to version
  export type UpdateUserTermsAgreedVersionRequest = {
    userId: string;
    termsAgreedVersion: number;
  };
  
  export type UpdateUserAppReviewedRequest = {
    userId: string;
    appStoreReviewed: number;
  };
  
  export type CheckUserAppReviewedRequest = {
    userId: string;
  };
  
  // Request to create a group
  export type CreateGroupRequest = {
    name: string;
    userId: string;
    ownerId: string;
    admins: string[];
    description: string;
    groupType?: string;
    subscriptionType?: string;
    numberOfMembers?: number;
    seasonName: string;
    seasonStartDate: number;
    seasonEndDate: number;
  };
  
  // Request to edit a group
  export type EditGroupRequest = {
    userId: string;
    groupId: string;
    name?: string;
    description?: string;
    statsMinNumberOfGames?: number;
  };
  
  // Request to delete a group
  export type DeleteGroupRequest = {
    userId: string;
    groupId: string;
  };
  
  // Request to remove a member from a group
  export type AddGroupMemberRequest = {
    adderId: string;
    memberId: string;
    groupId: string;
  };
  
  // Request to remove a member from a group
  export type RemoveGroupMemberRequest = {
    removerId: string;
    memberId: string;
    groupId: string;
  };
  
  // Request to ban a member from a group
  export type BanGroupMemberRequest = {
    bannerId: string;
    memberId: string;
    groupId: string;
  };
  
  // Request to promote a member to an admin
  export type PromoteGroupMemberToAdminRequest = {
    promoterId: string;
    memberId: string;
    groupId: string;
  };
  
  // Request to promote a member to an admin
  export type DemoteGroupMemberFromAdminRequest = {
    demoterId: string;
    memberId: string;
    groupId: string;
  };
  
  // Request to promote a member to an admin
  export type TransferOwnershipRequest = {
    currentOwnerId: string;
    newOwnerId: string;
    groupId: string;
  };
  
  // Request to update group avatar
  export type UpdateGroupAvatarRequest = {
    userId: string;
    avatar: string;
    groupId: string;
  };
  
  // Search results
  export type UsernameSearchResult = {
    userId: string;
    username: string;
    profilePicture?: string;
    firstName?: string;
    lastName?: string;
    createdAt: number;
  };
  
  // Request to make a friend request
  export type RequestFriendRequest = {
    userId: string;
    recipientId: string;
  };
  
  // Request to remove a friend
  export type RemoveFriendRequest = {
    userId: string;
    recipientId: string;
  };
  
  export type AcceptFriendRequest = {
    userId: string;
    senderId: string;
  };
  
  export type RejectFriendRequest = {
    userId: string;
    senderId: string;
  };
  
  export type SendInviteRequest = {
    userId: string;
    inviteEmail: string;
  };
  
  export type DismissAllNotifsRequest = {
    userId: string;
    notifIds: string[];
  };
  
  export type SendFeedbackRequest = {
    userId: string;
    username: string;
    email: string;
    sessionId: string;
    source: string;
    feedback: string;
  };
  
  export type SendReportRequest = {
    userId: string;
    username: string;
    email: string;
    report: string;
    source: string;
    reportType: string;
    reportedUserId: string;
    reportedContentId: string;
  };
  
  export type BlockUserRequest = {
    userId: string;
    recipientId: string;
  };
  
  export type TagInviteRequest = {
    userId: string;
  };
  
  export type CreateClusterTagRequest = {
    taggerId: string;
    sessionId: string;
    teamId?: number;
    userId?: string;
    name?: string;
  };
  
  export type CreateClusterTagV4Request = {
    taggerId: string;
    sessionId: string;
    clusterClass: number;
    teamId?: number;
    userId?: string;
    name?: string;
    nameId?: string;
    tagIds?: string[];
  };
  
  export type DeleteTagRequest = {
    taggerId: string;
    clusterId: string;
  };
  
  export type ResetTagRequest = {
    taggerId: string;
    sessionId: string;
  };
  
  export type EditTagV3Request = {
    clusterId: string;
    taggerId: string;
    shotIds?: number[];
    shotSessionIds?: string[];
    teamId?: number;
    userId?: string;
    name?: string;
  };
  
  export type EditClusterTagV4Request = {
    clusterId: string;
    taggerId: string;
    teamId?: number;
    userId?: string;
    name?: string;
    nameId?: string;
    ignore: boolean;
  };
  
  export type MigrateClusterTagsV4Request = {
    userId: string;
    srcClusterId: string;
    dstClusterId: string;
    ignoreSrc: boolean;
  };
  
  export type CreateShotV4Request = {
    userId: string;
    sessionId: string;
    runVersion: number;
    shotTs: number;
    shotPoints: number;
    shotOutcome: boolean;
    scorerClusterId: string;
    secondaryClusterId?: string;
  };
  
  export type CreateTagV4Request = {
    userId: string;
    sessionId: string;
    shotId: string;
    shotIdx?: number;
    personId?: number;
    actionId: number;
    tagImage?: string;
    clusterId?: string;
    runVersion?: number;
  };
  
  export type EditTagV4Request = {
    userId: string;
    tagId: string;
    clusterId: string;
    ignore: boolean;
  };
  
  export type EditShotV4Request = {
    userId: string;
    shotId: string;
    shotOutcome?: boolean;
    isTwoPoint?: boolean;
    ignore: boolean;
  };
  
  export type UpdateShotMinimapsV4Request = {
    userId: string;
    shotIds: string[];
    locations: number[][];
    isTwoPoints: boolean[];
  };
  
  export type EditHighlightV4Request = {
    userId: string;
    highlightId: string;
    showInFeed: boolean;
    isLowlight: boolean;
    visible: number;
  };
  
  // Request to edit points system
  export type EditPointSystemRequest = {
    userId: string;
    pointSystem: number;
  };
  
  // Request to edit game type
  export type EditSessionModeRequest = {
    userId: string;
    sessionMode: string;
  };
  
  export type SyncSessionRequest = {
    userId: string;
    sessionId: string;
    syncedSessionId: string;
    syncedShiftTs?: number;
  };
  
  export type UnsyncSessionRequest = {
    userId: string;
    sessionId: string;
  };
  
  export type UpdateSyncShiftRequest = {
    userId: string;
    sessionId: string;
    syncedSessionId: string;
    syncedShiftTs: number;
  };
  
  // Request to upload session
  export type UploadRequest = {
    userId: string;
    videoUrl: string;
    pausedTs: number[];
  };
  
  // Request to indicate that the session is uploading
  export type UploadingRequest = {
    userId: string;
  };
  
  // Request to delete session
  export type DeleteSessionRequest = {
    userId: string;
  };
  
  export type UpdateSessionStatusRequest = {
    userId: string;
    status: string;
  };
  
  export type UpdateSessionTeamNamesRequest = {
    userId: string;
    teamNames: string[];
  };
  
  export type UpdateSessionHoopPointsRequest = {
    userId: string;
    hoops: AnnotatedHoop[];
  };
  
  export type UpdateSessionPaintKeypointsRequest = {
    userId: string;
    paints: AnnotatedPaint[];
  };
  
  export type IgnoreSessionShotRequest = {
    userId: string;
    sessionId: string;
    shotId: number;
    ignore: boolean;
    highlightId?: string;
  };
  
  export type EditSessionShotStatusRequest = {
    userId: string;
    sessionId: string;
    shotId: number;
    status: number;
    highlightId?: string;
  };
  
  export type EditSessionShotPointsRequest = {
    userId: string;
    sessionId: string;
    shotId: number;
    points: number;
  };
  
  // Request to create a session
  export type CreateSessionRequest = {
    userId: string;
    sessionType: string;
    sessionMode?: string;
    numPlayers?: number;
    rnfsPath: string;
    highlightsInFeed: boolean;
    pausedTs: number[];
    // location
    city?: string;
    state?: string;
    country?: string;
    longitude?: number;
    latitude?: number;
    // metadata
    pointSystem?: number;
    recordingSetup?: string;
    createdAt?: number;
    recordingStartTs?: number;
    recordingEndTs?: number;
    originalDuration?: number;
  };
  
  // Request to post session comment
  export type PostSessionCommentRequest = {
    sessionId: string;
    userId: string;
    message: string;
    replyTo?: string;
  };
  
  // Request to update trimmedSessionTs field
  export type UpdateTrimmedSessionTsRequest = {
    userId: string;
    trimmedStartTs: number;
    trimmedEndTs: number;
    trimmedDuration: number;
  };
  
  export type GetMyFeedRequest = {
    page: number;
    limit: number;
    city?: string;
    state?: string;
    country?: string;
  };
  
  // Request to get feed
  export type GetDiscoverFeedRequest = {
    userId?: string;
    page: number;
    limit?: number;
  };
  
  export type GetProfileHighlightsRequest = {
    userId: string;
    page?: number;
    limit?: number;
  };
  
  export type GetMixtapesRequest = {
    userId: string;
    page?: number;
    limit?: number;
  };
  
  export type GetMixtapeLibraryRequest = {
    userId: string;
    page?: number;
    limit?: number;
  };
  
  export type GetMixtapeFavoritesRequest = {
    userId: string;
    page?: number;
    limit?: number;
  };
  
  export type CreateMixtapeRequest = {
    userId: string;
    title: string;
    caption?: string;
    highlights: FBMixtapeHighlight[];
  };
  
  export type UpdateMixtapeTitleRequest = {
    userId: string;
    mixtapeId: string;
    title: string;
  };
  
  export type UpdateMixtapeCaptionRequest = {
    userId: string;
    mixtapeId: string;
    caption: string;
  };
  
  export type RemoveMixtapeHighlightRequest = {
    userId: string;
    mixtapeId: string;
    highlight: FBMixtapeHighlight;
  };
  
  export type AddMixtapeHighlightRequest = {
    userId: string;
    mixtapeId: string;
    highlight: FBMixtapeHighlight;
  };
  
  export type UpdateMixtapeHighlightsRequest = {
    userId: string;
    mixtapeId: string;
    highlights: FBMixtapeHighlight[];
  };
  
  export type DeleteMixtapeRequest = {
    userId: string;
  };
  
  export type HideFeedHighlightRequest = {
    userId: string;
    highlightId: string;
    highlightVersion?: number;
  };
  
  export type ShowFeedHighlightRequest = {
    userId: string;
    highlightId: string;
    highlightVersion?: number;
  };
  
  // Request to like a feed highlight
  export type LikeFeedHighlightRequest = {
    userId: string;
    highlightId: string;
    highlightVersion?: number;
  };
  
  // Request to unlike a feed highlight
  export type UnlikeFeedHighlightRequest = {
    userId: string;
    highlightId: string;
    highlightVersion?: number;
  };
  
  export type FavoriteHighlightRequest = {
    userId: string;
    highlightId: string;
  };
  
  export type UnfavoriteHighlightRequest = {
    userId: string;
    highlightId: string;
  };
  
  // Request to delete a feed highlight
  export type DeleteFeedHighlightRequest = {
    userId: string;
    highlightId: string;
    highlightVersion?: number;
    isFalsePositive: boolean;
  };
  
  // Groups
  export type GetGroupMembersRequest = {
    groupId: string;
    page: number;
    limit: number;
  };
  
  export type GetGroupSeasonsRequest = {
    groupId: string;
  };
  
  // Request to create a group
  export type CreateSeasonRequest = {
    name: string;
    creator: string;
    groupId: string;
    startDate: number;
    endDate: number;
    seasonAvatar?: string;
    description?: string;
  };
  
  // Request to edit a season
  export type EditSeasonRequest = {
    userId: string;
    seasonId: string;
    name?: string;
    startDate?: number;
    endDate?: number;
    description?: string;
  };
  
  // Request to delete a season
  export type DeleteSeasonRequest = {
    userId: string;
    seasonId: string;
  };
  
  export type GetGroupScheduleRequest = {
    groupId: string;
    page: number;
    limit: number;
  };
  
  export type GetGroupChatRequest = {
    groupId: string;
    page: number;
    limit: number;
  };
  
  export type GetGroupSessionCardsRequest = {
    groupId: string;
    page: number;
  };
  
  export type GetGroupHighlightsRequest = {
    groupId: string;
    page: number;
    limit: number;
  };
  
  export type GetGroupMixtapesRequest = {
    groupId: string;
    page: number;
    limit: number;
  };
  
  export type GetGroupRecordsRequest = {
    groupId: string;
  };
  
  export type GetGroupStatsRequest = {
    groupId: string;
    fromDate: number;
    toDate: number;
  };
  
  export type GetGroupStoryExperimentRequest = {
    groupId: string;
    userId: string;
  };
  
  // Request to create an event
  export type CreateEventRequest = {
    groupId?: string;
    creator: string;
    ownerId: string;
    admins: string[];
    title: string;
    startDateTime: number;
    endDateTime?: number;
    timezone?: string;
    locationFormattedAddress?: string;
    locationMainText?: string;
    locationSecondaryText?: string;
    locationTypes?: string[];
    locationCoordinates?: number[];
    description?: string;
    recurring?: boolean;
    eventType?: string;
    privacy?: number;
    lastUpdater: string;
  };
  
  // Request to edit an event
  export type EditEventRequest = {
    userId: string;
    eventId: string;
    title?: string;
    startDateTime?: number;
    endDateTime?: number;
    timezone?: string;
    locationFormattedAddress?: string;
    locationMainText?: string;
    locationSecondaryText?: string;
    locationTypes?: string[];
    locationCoordinates?: number[];
    description?: string;
  };
  
  // Request to delete an event
  export type DeleteEventRequest = {
    userId: string;
    eventId: string;
  };
  
  // Request to post going attendance to event
  export type DeclareGoingToEventRequest = {
    eventId: string;
    userId: string;
    groupId: string;
    ticketId?: string;
    note?: string;
  };
  
  // Request to post not going attendance to event
  export type DeclareNotGoingToEventRequest = {
    eventId: string;
    userId: string;
    groupId: string;
    ticketId?: string;
    note?: string;
  };
  
  // Request to post group chat message
  export type PostGroupChatMessageRequest = {
    groupId: string;
    userId: string;
    message: string;
    replyTo?: string;
    highlightId?: string;
    sessionId?: string;
  };
  
  // Request to add sessions to a group
  export type AddSessionsToGroupRequest = {
    userId: string;
    groupId: string;
    selectedSessions: Array<[string, number]>;
  };
  
  // Request to remove sessions from a group
  export type RemoveSessionsFromGroupRequest = {
    userId: string;
    groupId: string;
    selectedSessionIds: string[];
  };
  
  /**
   * ======================
   * Response Types
   * ======================
   */
  
  export type GroupRecord = {
    userId: string;
    recordName: string;
    recordValue: number;
    recordDate: number;
    sessionId: string;
    rank: number;
  }
  
  export type GroupStatsBoxScore = {
    userId: string;
    sessionMode: string;
    sessionType: string;
    numSessions: number;
    points: number;
    fieldGoalsMade: number;
    fieldGoalsAttempts: number;
    threePointMade: number;
    threePointAttempts: number;
    rebounds?: number;
    assists?: number;
    pointsPerGame?: number;
    reboundsPerGame?: number;
    assistsPerGame?: number;
    pointsPerGameChange?: number;
    reboundsPerGameChange?: number;
    assistsPerGameChange?: number;
  };
  
  export type BoxScore = {
    sessionId: string;
    sessionMode: string;
    numPlayers: number;
    date: number;
    minutes: number;
    points: number;
    fieldGoalsMade: number;
    fieldGoalsAttempts: number;
    threePointMade: number;
    threePointAttempts: number;
    rebounds?: number;
    assists?: number;
  };
  
  export type PlayByPlayStats = {
    points: number;
    fieldGoalsMade: number;
    fieldGoalsAttempts: number;
    threePointMade: number;
    threePointAttempts: number;
    rebounds?: number;
    assists?: number;
  };
  
  export type ProfileInfoType = {
    joined: number;
    friends: number;
    city?: string;
    state?: string;
    country?: string;
  };
  
  export type ProfileStatsType = {
    numSessions: number;
    courtTime: number;
    fieldGoalsMade: number;
    fieldGoalsAttempts: number;
    threePointMade: number;
    threePointAttempts: number;
    points: number;
    rebounds?: number;
    assists?: number;
  };
  
  export type MinimapShot = {
    shotId: string;
    sessionId: string;
    createdAt: number;
    outcome: boolean;
    isTwoPoints: boolean;
    x: number;
    y: number;
  };
  
  export type Friend = {
    userId: string;
    tag: string;
    username: string;
    profilePicture?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    createdAt: number;
  };
  
  export type GroupMember = {
    userId: string;
    tag: string;
    username: string;
    role?: string;
    profilePicture?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    createdAt: number;
  };
  
  export type Group = {
    groupId: string;
    name: string;
    userId: string;
    ownerId: string;
    admins: string[];
    description: string;
    updatedAt: number;
    createdAt: number;
    location?: string;
    locationPrivacy?: number;
    groupAvatar: string;
    numberOfMembers?: number;
    groupType?: string;
    subscriptionType?: string;
    statsMinNumberOfGames?: number;
  };
  
  export type Season = {
    seasonId: string;
    name: string;
    creator: string;
    groupId: string;
    lastUpdater: string;
    startDate: number;
    endDate: number;
    ended: boolean;
    seasonAvatar: string;
    description: string;
    visible: number;
    createdAt: number;
    updatedAt: number;
  };
  
  export type FeedItem = {
    userId: string; // ID for the user UPLOADED in the feed item
    username: string; // username for the user UPLOADED in the feed item
    profilePicture?: string; // profile picture for the user who UPLOADED the feed item
    date: number; // date for sorting content
    sessionId: string; // session ID
    highlights: FeedHighlight[];
  };
  
  export type FeedHighlight = {
    preview: string;
    video: string;
    highlightId: string;
    highlightVersion?: number;
  };
  
  export type FeedStats = {
    highlightId: string; // highlight id
    highlight: FBHighlight; // underlying highlight
    // metrics
    likes: number; // number of likes
    views: number; // number of views
    score: number; // score of the highlight
  };
  
  export type SessionCard = {
    sessionId: string; // session identifier
    sessionStatus: string; // session status
    sessionType: string; // solo, 1v1, 2v2, 3v3, 4v4, 5v5
    sessionMode?: string; // game vs shootaround
    userId: string;
    date: number; // epoch timestamp
    duration: number; // seconds
    numPlayers: number; // number of players
    rnfsPath?: string;
    videoUrl?: string;
    preview?: string; // public blob path
    pausedTs?: number[];
    trimmedStartTs?: number;
    trimmedEndTs?: number;
    numUploadAttempts?: number;
    // location
    city?: string;
    state?: string;
    country?: string;
    // versioning | 1 => old tagging system, 2 => new tagging system
    version?: number;
    // metadata
    pointSystem?: number;
    recordingSetup?: string;
    syncedSessionId?: string;
    isExample?: boolean;
    hasTeams?: boolean;
    teamNames?: string[];
    createdAt: number;
    updatedAt: number;
  };
  
  export type OfflineSessionCard = {
    sessionStatus: string; // session status
    sessionType: string; // solo, 1v1, 2v2, 3v3, 4v4, 5v5
    sessionMode?: string; // game vs shootaround
    userId: string;
    date: number; // epoch timestamp
    rnfsPath?: string;
    preview?: string; // public blob path
    pausedTs?: number[];
    // versioning | 1 => old tagging system, 2 => new tagging system
    version?: number;
    // metadata
    pointSystem?: number;
    recordingSetup?: string;
    createdAt: number;
    updatedAt: number;
  };
  
  export type PlayerStats = {
    sessionId?: string;
    personId?: number;
    shotId?: number;
    numMakes: number;
    numTakes: number;
    numMakes2pt: number;
    numTakes2pt: number;
    numMakes3pt: number;
    numTakes3pt: number;
    points: number;
  };
  
  export type ClusterStatsV2 = {
    clusterId: number;
    userId?: string;
    personIds: number[];
    numTakes: number;
    numMakes: number;
    numTakes2pt: number;
    numMakes2pt: number;
    numTakes3pt: number;
    numMakes3pt: number;
    points: number;
  };
  
  export type TeamStatsV2 = {
    teamId: number;
    clusterIds: number[];
    numMakes: number;
    numTakes: number;
    numMakes2pt: number;
    numTakes2pt: number;
    numMakes3pt: number;
    numTakes3pt: number;
    points: number;
  };
  
  export type PlayerShotChart = {
    personId?: number;
    shotId?: number;
    shots: PlayerShot[];
    minimapWidth: number;
    minimapHeight: number;
  };
  
  export type ClusterShotChartV2 = {
    clusterId: number;
    personIds: number[];
    shots: PlayerShot[];
    minimapWidth: number;
    minimapHeight: number;
  };
  
  export type ClusterShotsV3 = {
    clusterId: string;
    shotIds: number[];
    shots: FBShot[];
  };
  
  export type ClusterActionsV4 = {
    clusterId: string;
    actionId: number;
    tags: FBTagV4[];
    shots: FBShotV4[];
  };
  
  export type TeamShotChartV2 = {
    teamId: number;
    clusterIds: number[];
    shots: PlayerShot[];
    minimapWidth: number;
    minimapHeight: number;
  };
  
  export type TeamShotsV3 = {
    teamId: number;
    clusterIds: string[];
    shots: FBShot[];
  };
  
  export type TeamActionsV4 = {
    teamId: number;
    actionId: number;
    clusterIds: string[];
    tags: FBTagV4[];
    shots: FBShotV4[];
  };
  
  export type PlayerShot = {
    location?: number[];
    status: number;
    ignore?: boolean;
    isTwoPointShot?: boolean;
  };
  
  export type ShotChartZone = {
    makes: number;
    attempts: number;
    misses: number;
    percentage: string;
  };
  
  export type ShotChartZones = {
    BLOCK_LEFT: ShotChartZone;
    ELBOW_LEFT: ShotChartZone;
    PAINT_UPPER_RIGHT: ShotChartZone;
    PAINT_UPPER_LEFT: ShotChartZone;
    PAINT_BOTTOM_RIGHT: ShotChartZone;
    PAINT_BOTTOM_LEFT: ShotChartZone;
    KEY_ZONE: ShotChartZone;
    BLOCK_RIGHT: ShotChartZone;
    ELBOW_RIGHT: ShotChartZone;
    WING_LEFT: ShotChartZone;
    MIDDLE_THREE_POINT: ShotChartZone;
    WING_RIGHT: ShotChartZone;
    CORNER_LEFT: ShotChartZone;
    CORNER_RIGHT: ShotChartZone;
  };
  
  export type ShotChartRegions = {
    PAINT: ShotChartZone;
    TWO_POINT: ShotChartZone;
    THREE_POINT: ShotChartZone;
  };
  
  export type PlayerPositionChart = {
    personId: number;
    heatmap: number[];
    shape: number[];
    minimapWidth: number;
    minimapHeight: number;
  };
  
  export type ClusterPositionChart = {
    clusterId: number;
    personIds: Array<number>;
    heatmap: number[];
    shape: number[];
    minimapWidth: number;
    minimapHeight: number;
  };
  
  export type TeamPositionChart = {
    teamId: number;
    clusterIds: number[];
    heatmap: number[];
    shape: number[];
    minimapWidth: number;
    minimapHeight: number;
  };
  
  export type GroupedStat = {
    key: string;
    month: number;
    year: number;
    numMakes: number;
    numTakes: number;
    numMakes3pt: number;
    numTakes3pt: number;
    points: number;
  };
  
  export type ProgressType = {
    atValue: number;
    currentPlaybackTime: number;
    currentTime: number;
    playableDuration: number;
    seekableDuration: number;
    target: number;
  };
  
  export type SeekType = {
    currentTime: number;
    seekTime: number;
  };
  
  export type ClipActionStats = {
    numMakes: number;
    numMisses: number;
    numTakes: number;
    numRebounds: number;
    numAssists: number;
    numActions: number;
  };
  
  export type ClipPlayerStats = {
    clusterId: string;
    clusterClass: number;
    username: string;
    profilePicture?: string;
    count: number;
  };
  
  /**
   * ======================
   * Notification Types
   * ======================
   */
  
  export type NotificationType = {
    title: string;
    body: string;
  };
  
  export type MessageDataType = {
    params: string;
    name: string;
    user?: string;
    screen?: string;
  };
  
  export type MessageType = {
    data: MessageDataType;
    from: string;
    messageId: string;
    notification: NotificationType;
  };
  
  /**
   * ======================
   * Annotation Types
   * ======================
   */
  
  export type BoundingBox = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
  
  export type ImageShape = {
    width: number;
    height: number;
  };
  
  export type Frame = {
    ts: number;
    path: string;
    idx: number;
  };
  
  export type AnnotatedPoint = {
    x: number;
    y: number;
  };
  
  /**
   * Allows the user to pick a point where the paint should be
   * We use this for the homography input
  . * The timestamp is the keyframe used to do this.
   */
  export type AnnotatedPaint = {
    paintLeft: AnnotatedPoint;
    paintRight: AnnotatedPoint;
    freeThrowLeft: AnnotatedPoint;
    freeThrowRight: AnnotatedPoint;
    timestamp: number;
  };
  
  /**
   * Allows the user to pick a point where the hoop should be
   * The timestamp is the keyframe used to do this.
   */
  export type AnnotatedHoop = {
    point: AnnotatedPoint;
    timestamp: number;
  };
  
  /**
   * ======================
   * Navigation Types
   * ======================
   */
  
  export type AuthStackParamList = {
    Splash: undefined;
    LoginOrRegister: undefined;
    ResetPassword: undefined;
  };
  
  export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
    NativeStackScreenProps<AuthStackParamList, T>;
  
  export type AppStackParamList = {
    Tabs: NavigatorScreenParams<AppTabParamList>;
    PublicProfile: {
      userId?: string;
      editedMixtape?: FBMixtape;
      deletedMixtapeId?: string;
      initTab?: number;
      initNumNotifs?: number;
      fromNotification?: boolean;
      feedHighlight?: string;
    };
    TaggingV1: {
      sessionId: string;
    };
    TaggingSelfV2: {
      sessionId: string;
      reset?: boolean;
    };
    TaggingTeamV2: {
      sessionId: string;
    };
    TaggingPlayerV2: {
      sessionId: string;
      clusterId: number;
    };
    TaggingV3: {
      sessionId: string;
      session?: FBSession;
      synced?: FBSession;
      initClusters: FBClusterTagV3[];
      initShots: FBShot[];
      initTags: FBTag[];
      initTaggedUsers: FBUser[];
      initHighlights: FBHighlight[];
    };
    TaggingV4: {
      sessionId: string;
      session?: FBSession;
      synced?: FBSession;
      initClusters: FBClusterTagV4[];
      initShots: FBShotV4[];
      initTags: FBTagV4[];
      initTaggedUsers: FBUser[];
      initHighlights: FBHighlightV4[];
    };
    SessionV2: {
      sessionId: string;
      refresh?: boolean;
    };
    SessionV3: {
      sessionId: string;
      newTags?: FBTag[];
      newClusters?: FBClusterTagV3[];
      newShots?: FBShot[];
      newHighlights?: FBHighlight[];
    };
    SessionV4: {
      sessionId: string;
      newTags?: FBTagV4[];
      newClusters?: FBClusterTagV4[];
      newShots?: FBShotV4[];
      newHighlights?: FBHighlightV4[];
      unsyncedSecondarySessionCard?: SessionCard;
      openHighlightId?: string;
      feedHighlight?: string;
    };
    Settings: undefined;
    SettingsLite: undefined;
    Username: undefined;
    Realname: undefined;
    Notifs: undefined;
    Video: undefined;
    Recording: {
      videoQuality: string;
      sessionType: string;
      sessionMode: string;
      pointSystem: number;
      numPlayers: number;
      recordingSetup: string;
      groupId?: string;
    };
    PreUpload: {
      userId: string;
      sessionId: string;
      rnfsPath: string;
      pausedTs: number[];
      numUploadAttempts?: number;
      videoLength?: number;
      isLocal?: boolean;
      offlineMode?: boolean;
    };
    Processing: {
      userId: string;
      sessionId: string;
      sessionCard: SessionCard;
      videoUrl: string;
      sessionUserId: string;
    };
    Errored: {
      userId: string;
      sessionId: string;
      videoUrl: string;
      videoLength?: number;
      sessionUserId: string;
    };
    Feedback: {
      previousScreen: string;
      sessionId?: string;
    };
    MixtapeCreator: {
      mixtapeId: string;
      mixtapeTitle: string;
      refresh?: boolean;
    };
    MixtapeLibrary: {
      mixtapeId: string;
    };
    Report: {
      source: string;
      reportType: string;
      reportedUserId?: string;
      reportedContentId?: string;
    };
    UpdateVersion: undefined;
    Outage: undefined;
    TermsAndConditions: {
      latestTermsAndConditionsVersion: number;
    };
    ReAuth: undefined;
    EmailCollection: undefined;
    EmailVerification: {
      email: string;
    };
    DateOfBirthCollection: undefined;
    ParentPermissionRequest: undefined;
    ParentPermissionDenied: undefined;
    Router: undefined;
    CreateGroup: undefined;
    Group: {
      groupId?: string;
      group?: Group;
      refreshedChat?: FBGroupChatMessage[];
      refreshedSchedule?: FBGroupEvent[];
      refreshedTickets?: Record<string, Record<string, FBEventTicket>>;
      newEventCreated?: FBGroupEvent;
      refreshedGames?: SessionCard[];
      refreshedSeasons?: Season[];
      refreshedMembers?: GroupMember[];
      refreshedNumberOfMembers?: number;
      newlyCreatedGroup?: boolean;
      newlyUpdatedGroup?: boolean;
      refreshedNumberOfGames?: number;
      gamesNeedRefresh?: boolean;
      membersNeedRefresh?: boolean;
    };
    GroupMembers: {
      groupId: string;
      group?: Group;
      members: GroupMember[];
    };
    GroupSchedule: {
      group: Group;
      groupId: string;
      members: GroupMember[];
      events: FBGroupEvent[];
      tickets: Record<string, Record<string, FBEventTicket>>;
      newEventCreated?: FBGroupEvent;
    };
    GroupChat: {
      group: Group;
      groupId: string;
      initialChat: any;
    };
    GroupGames: {
      group: Group;
      games: SessionCard[];
      numberOfGames: number;
      gamesNeedRefresh?: boolean;
    };
    GroupHighlights: {
      group: Group;
      highlights: FBHighlightV4[];
      mixtapes: FBMixtape[];
    };
    GroupStats: {
      groupId: string;
      stats: GroupStatsBoxScore[];
      members: GroupMember[];
      seasons: Season[];
      recentlyEndedSeason?: Season;
      hasActiveSeason: boolean;
      statsMinNumberOfGames?: number;
    };
    CreateEvent: {
      group: Group;
      members: GroupMember[];
      source: string;
      events: FBGroupEvent[];
      tickets: Record<string, Record<string, FBEventTicket>>;
    };
    Event: {
      group: Group;
      members: GroupMember[];
      events: FBGroupEvent[];
      event: FBGroupEvent;
      tickets: Record<string, Record<string, FBEventTicket>>;
      source: string;
    };
    EditEvent: {
      group: Group;
      members: GroupMember[];
      event: FBGroupEvent;
      events: FBGroupEvent[];
      tickets: Record<string, Record<string, FBEventTicket>>;
      source: string;
    };
    EditGroup: {
      group: Group;
      seasons: Season[];
      refreshedSeasons?: Season[];
      newlyCreatedGroup?: boolean;
    };
    EditSeason: {
      group: Group;
      seasons: Season[];
      seasonToEdit: Season;
    };
    CreateSeason: {
      group: Group;
      seasons: Season[];
    };
    AddGamesToGroup: {
      group: Group;
      currentSessions: SessionCard[];
      numberOfGames: number;
    };
    ManageMembers: {
      group: Group;
      refreshNeeded?: boolean;
    };
    ManageMember: {
      group: Group;
      member: GroupMember;
    };
    TransferOwnership: {
      group: Group;
      newOwner: GroupMember;
    };
  };
  
  export type AppStackScreenProps<T extends keyof AppStackParamList> =
    NativeStackScreenProps<AppStackParamList, T>;
  
  export type AppTabParamList = {
    Feed: {
      isOnboarding?: boolean;
      initHighlight?: string;
    };
    Record: {
      isOnboarding?: boolean;
    };
    Games: {
      newSession?: SessionCard;
      updatedSession?: SessionCard;
      unsyncedSecondarySessionCard?: SessionCard;
      syncedSecondarySessionId?: string;
      deletedSessionId?: string;
      newOfflineSession?: boolean;
      isOnboarding?: boolean;
    };
    Profile: {
      userId?: string;
      editedMixtape?: FBMixtape;
      deletedMixtapeId?: string;
      initTab?: number;
      initNumNotifs?: number;
      fromNotification?: boolean;
      isOnboarding?: boolean;
      feedHighlight?: string;
    };
    Hoopers: {
      groupsRefreshNeeded?: boolean;
      groupId?: string;
      isOnboarding?: boolean;
    };
  };
  
  export type AppTabScreenProps<T extends keyof AppTabParamList> =
    CompositeScreenProps<
      BottomTabScreenProps<AppTabParamList, T>,
      AppStackScreenProps<keyof AppStackParamList>
    >;
  
  declare global {
    namespace ReactNavigation {
      interface RootParamList extends AppStackParamList {}
    }
  }
  
  export type OnLoadInput = {
    duration: number;
    naturalSize: {
      width: number;
      height: number;
      orientation: string;
    };
  };
  