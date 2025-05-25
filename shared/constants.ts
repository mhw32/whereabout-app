import Config from "react-native-config";

// URL to make API requests to
export const API_URL = Config.API_URL || "http://localhost:8000";

// Dependency API keys
export const SEGMENT_API_KEY = Config.SEGMENT_API_KEY_PROD;
export const SENTRY_DSN = Config.SENTRY_DSN || "";

// Google Places API key
export const GOOGLE_PLACES_API_KEY = Config.GOOGLE_PLACES_API_KEY || "";

// App versions
export const CURRENT_SESSION_VERSION: number = 4;
export const CURRENT_TAGGING_VERSION: number = 2;

// Async storage keys
export const ASYNC_STORAGE_TAGPLAYER_PULSE_SEEN_KEY =
  "@hooper:tagplayer_pulse_seen";
export const ASYNC_STORAGE_EDITSHOT_PULSE_SEEN_KEY =
  "@hooper:editshot_pulse_seen";
export const ASYNC_STORAGE_RECORD_INSTRUCTIONS_PULSE_SEEN_KEY =
  "@hooper:recordinstructions_pulse_seen";
export const ASYNC_STORAGE_TAGGING_INSTRUCTIONS_PULSE_SEEN_KEY =
  "@hooper:tagginginstructions_pulse_seen";
export const ASYNC_RECENT_GROUP_SELECTION_FOR_RECORDING_KEY =
  "@hooper:recent_group_selection_for_recording";

// Session states
export const SESSION_CREATED: string = "created";
export const SESSION_UPLOADING: string = "uploading";
export const SESSION_UPLOADED: string = "uploaded";
export const SESSION_WAITING: string = "waiting";
export const SESSION_PROCESSED: string = "processed";
export const SESSION_TAGGED: string = "tagged";
export const SESSION_ERROR: string = "error";

export const RELATIONSHIP_STATUS_PENDING: string = "pending";
export const RELATIONSHIP_STATUS_ACCEPTED: string = "accepted";
export const RELATIONSHIP_STATUS_REJECTED: string = "rejected";
export const RELATIONSHIP_STATUS_BANNED: string = "rejected";

// Parent permission states for the child user
export const PARENT_PERMISSION_STATUS_APPROVED: string = "approved";
export const PARENT_PERMISSION_STATUS_DENIED: string = "denied";

// Users with 4K access
export const FOUR_K_ACCESS_USERS: string[] = ["grub", "kangexpress"];

// Recording quality levels
export const TEN_EIGHTY_P: string = "1080p";
export const FOURTEEN_FORTY_P: string = "1440p";
export const LOW_FOUR_K: string = "low4k";
export const FOUR_K: string = "4k";

// Device storage requirement
export const MINIMUM_DEVICE_AVAILABLE_STORAGE_IN_GB: number = 3;

// Session types
export const SESSION_SOLO: string = "solo";
export const SESSION_1v1: string = "1v1";
export const SESSION_2v2: string = "2v2";
export const SESSION_3v3: string = "3v3";
export const SESSION_4v4: string = "4v4";
export const SESSION_5v5: string = "5v5";

// Session modes
export const GAME_MODE: string = "game";
export const SHOOTAROUND_MODE: string = "shootaround";

// Hardware mode
export const TRIPOD_SETUP: string = "tripod";
export const GROUND_SETUP: string = "ground";

// Point systems
export const POINTS_TWOS_AND_THREES: number = 1;
export const POINTS_ONES_AND_TWOS: number = 2;
export const POINTS_ONES_ONLY: number = 3;

// Action types
export const ACTION_SHOT: number = 1;
export const ACTION_REBOUND: number = 2;
export const ACTION_ASSIST: number = 3;

// Permission types
export const CAMERA_PERMISSION: string = "camera";
export const MICROPHONE_PERMISSION: string = "microphone";
export const LOCATION_PERMISSION: string = "location";
export const PUSH_PERMISSION: string = "push";

// Privacy types
export const LOCATION_PRIVACY: string = "location";
export const STATS_PRIVACY: string = "stats";
export const HIGHLIGHTS_PRIVACY: string = "highlights";
export const FEED_PRIVACY: string = "feed";

// Group types
export const GROUP_TYPE_ADMIN: string = "admin";
export const GROUP_TYPE_CONSUMER: string = "consumer";
export const GROUP_TYPE_TRAINER: string = "trainer";
export const GROUP_TYPE_CAMP: string = "camp";
export const GROUP_TYPE_TEAM: string = "team";
export const GROUP_TYPE_LEAGUE: string = "league";
export const GROUP_TYPE_PARENT: string = "parent";
export const GROUP_TYPE_COMPANY_BRAND: string = "company_brand";
export const GROUP_TYPE_INFLUENCER: string = "influencer";
export const GROUP_TYPE_OTHER: string = "other";

// Group Subscription types
export const GROUP_SUBSCRIPTION_TYPE_BETA: string = "beta";
export const GROUP_SUBSCRIPTION_TYPE_FREE: string = "free";
export const GROUP_SUBSCRIPTION_TYPE_PREMIUM: string = "premium";

// User types
export const USER_TYPE_ADMIN: string = "admin";
export const USER_TYPE_USER: string = "user";

// Subscription types
export const SUBSCRIPTION_TYPE_BETA: string = "beta";
export const SUBSCRIPTION_TYPE_FREE: string = "free";
export const SUBSCRIPTION_TYPE_PRO: string = "pro";

// Content types
export const CONTENT_TYPE_HIGHLIGHT: string = "highlight";

// Engagement types
export const ENGAGEMENT_TYPE_LIKE: string = "like";
export const ENGAGEMENT_TYPE_FAVORITE: string = "favorite";

// Authentication constants
export const GOOGLE_CLIENT_ID: string = Config.GOOGLE_CLIENT_ID || "";
export const GOOGLE_MAPS_API_KEY: string = Config.GOOGLE_MAPS_API_KEY || "";

// Error messages
export const UNKNOWN_ERROR_TITLE: string = "Something went wrong";
export const UNKNOWN_ERROR_MESSAGE: string = "Please try this again later.";

// Deep linking constants
export const HOOPER_DEEP_LINK: string = "hooper://";
export const HOOPER_UNIVERSAL_LINK: string = "https://app.hooper.gg";

// Linking URL constants
export const HOOPER_PRIVACY_POLICY: string =
  "https://www.hooper.gg/privacy-policy";
export const HOOPER_FAQ: string = "https://www.hooper.gg/faq";

// Color constants
export const HOOPER_BLUE = "#5040FF";
export const HOOPER_NEON_GREEN = "#0bff8d";
export const HOOPER_GREY = "#16181A";
export const HOOPER_LIGHT_BLUE = "#80B5FF";

// Notification constants
export const HOOPER_CHANNEL_ID: string = "hooper";
export const HOOPER_CHANNEL_NAME: string = "Hooper Channel";

// Feed constants
export const NUM_SESSIONS_IN_FEED: number = 10;
export const NUM_LIKE_INCREMENT: number = 23;
export const FEED_SORT_DEBUG_MODE: boolean = false;
export const NUM_COMMENTS_PER_CALL: number = 50;
export const NUM_SESSIONS_IN_GAMES: number = 50;

// Recording constants
export const BANNER_BATTERY_LEVEL: number = 0.2;
export const MIN_BATTERY_LEVEL: number = 0.05;
export const BANNER_STORAGE_LEVEL: number = 5; // in GB
export const MIN_STORAGE_LEVEL: number = 2; // in GB

// Bumper video constants
export const BUMPER_CLIP_URL: string =
  "https://firebasestorage.googleapis.com/v0/b/hooper-ac7b0.appspot.com/o/media%2FHooper%20Bumper%20Final%20Hori.mp4?alt=media&token=a8df440e-1c53-497c-b57a-1ecb02dff002";
export const BUMPER_HIGHLIGHT_URL: string =
  "https://firebasestorage.googleapis.com/v0/b/hooper-ac7b0.appspot.com/o/media%2FHooper%20Bumper%20Final%20Vert.mp4?alt=media&token=facbfb9c-8656-4ceb-80d6-6aed7ae9dc10";

// Admin user IDs
export const ADMIN_ID_LIST: string[] = [
  "5O7Fu27SVcYVNldVnhKGnInwsaI2",
  "ZtdMaviOScMfJmQfJAxJZMioB9p1",
];

// Apple Review user email
export const APPLE_ANDROID_REVIEW_EMAILS: string[] = [
  "applereview@hooper.gg",
  "androidreview@hooper.gg",
];

// Video editing constants
export const MAX_VIDEO_LENGTH: number = 3600;
export const MAX_RECORDING_LENGTH_WITH_PAUSES: number = 4500;
export const MIN_VIDEO_LENGTH: number = 30;
export const VIDEO_END_TRIM_THRESHOLD: number = 30;
export const MIN_VIDEO_LENGTH_FOR_END_TRIM: number = 60;

// PreUpload View mode constants
export const MODE_PREVIEW: string = "PREVIEW";
export const MODE_UPLOADING: string = "UPLOADING";

// Comments
export const COMMENT_LIMIT: number = 2500;
export const COMMENT_PREVIEW_LIMIT: number = 50;

// Shot status
export const SHOT_STATUS_PENDING: number = 0;
export const SHOT_STATUS_MAKE: number = 1;
export const SHOT_STATUS_MISS: number = 2;

// Badge types
export const BADGE_GAME_TOP_SCORER = "badge_game_top_scorer";
export const BADGE_GAME_TOP_REBOUNDER = "badge_game_top_rebounder";
export const BADGE_GAME_MOST_ASSISTS = "badge_game_most_assists";
export const BADGE_WORKOUT_1 = "badge_workout_1";
export const BADGE_WORKOUT_5 = "badge_workout_5";
export const BADGE_WORKOUT_10 = "badge_workout_10";
export const BADGE_WORKOUT_20 = "badge_workout_20";
export const BADGE_WORKOUT_50 = "badge_workout_50";
export const BADGE_WORKOUT_100 = "badge_workout_100";

export const BADGE_TYPES = [
  BADGE_GAME_TOP_SCORER,
  BADGE_GAME_TOP_REBOUNDER,
  BADGE_GAME_MOST_ASSISTS,
  BADGE_WORKOUT_1,
  BADGE_WORKOUT_5,
  BADGE_WORKOUT_10,
  BADGE_WORKOUT_20,
  BADGE_WORKOUT_50,
  BADGE_WORKOUT_100,
];

// Notification types
export const NOTIF_COMMENT = "notif_comment";
export const NOTIF_DEVELOPER = "notif_developer";
export const NOTIF_FRIEND_REQUEST = "notif_friend_request";
export const NOTIF_FRIEND_SESSION = "notif_friend_session";
export const NOTIF_SESSION_PROCESSED = "notif_session_processed";
export const NOTIF_USER_TAGGED = "notif_user_tagged";
export const NOTIF_BADGE = "notif_badge";
export const NOTIF_GROUP_CHAT_MESSAGE = "notif_group_chat_message";

export const NOTIF_TYPES = [
  NOTIF_COMMENT,
  NOTIF_DEVELOPER,
  NOTIF_FRIEND_REQUEST,
  NOTIF_FRIEND_SESSION,
  NOTIF_SESSION_PROCESSED,
  NOTIF_USER_TAGGED,
  NOTIF_BADGE,
  NOTIF_GROUP_CHAT_MESSAGE,
];

export const CLIP_MODES: string[] = [
  "fullVideo",
  "attempts",
  "makes",
  "misses",
];

// Cutoff date for when to unilaterally and silently delete temp recording files
// Date and time (GMT): Thursday, June 6, 2024 12:42:51 AM
// Epoch ts in ms
export const DATE_CUTOFF_DELETE_TEMP_FILES: number = 1717634571000;

// Shot Chart region polygon coordinate
// paint left, paint right, free throw right, free throw left
export const PAINT_REGION_COORDINATES: [number, number][] = [
  [771.82, 7.989],
  [1210.29, 7.633],
  [1210.669, 655.017],
  [771.834, 654.884],
];
export const TWO_POINT_REGION_COORDINATES: [number, number][] = [
  [124.923, 7.348],
  [125.424, 51.073],
  [127.899, 88.264],
  [132.895, 125.99],
  [144.693, 190.727],
  [162.953, 257.016],
  [188.677, 331.305],
  [238.538, 434.172],
  [283.338, 505.035],
  [326.848, 561.277],
  [380.286, 619.488],
  [434.213, 668.829],
  [501.163, 719.514],
  [568.294, 761.389],
  [644.038, 799.05],
  [716.767, 827.845],
  [798.902, 850.956],
  [879.287, 866.672],
  [945.242, 872.879],
  [1003.187, 874.17],
  [1068.261, 871.318],
  [1140.304, 861.939],
  [1205.169, 850.503],
  [1293.785, 821.722],
  [1357.488, 796.648],
  [1413.578, 769.157],
  [1471.745, 734.618],
  [1534.889, 689.301],
  [1591.759, 640.853],
  [1650.418, 580.228],
  [1693.869, 527.894],
  [1724.399, 483.339],
  [1755.618, 433.11],
  [1778.251, 390.504],
  [1814.616, 306.149],
  [1838.66, 233.36],
  [1853.892, 166.583],
  [1864.2, 100.981],
  [1868.276, 55.518],
  [1868.598, 7.965],
];
export const THREE_POINT_REGION_COORDINATES: [number, number][] = [
  [9.974, 7.836],
  [10.485, 1399.652],
  [1973.859, 1400.127],
  [1973.087, 8.432],
];
export const THREE_POINT_REGION_POLYGON: [number, number][] = [
  [120, 0],
  [125, 65],
  [150, 205],
  [180, 297],
  [215, 385],
  [260, 464],
  [312, 540],
  [385, 620],
  [480, 700],
  [565, 750],
  [650, 795],
  [740, 829],
  [850, 852],
  [985, 863],
  [1090, 857],
  [1215, 834],
  [1305, 805],
  [1385, 769],
  [1460, 726],
  [1545, 665],
  [1645, 568],
  [1720, 471],
  [1765, 391],
  [1800, 316],
  [1830, 226],
  [1850, 141],
  [1855, 72],
  [1857, 0],
  [120, 0],
];

// Shot Chart zone polygon coordinates
export const BLOCK_LEFT_COORDINATES: [number, number][] = [
  [771.187, 324.627],
  [771.297, 8.188],
  [124.768, 7.472],
  [125.91, 73.116],
  [136.499, 153.617],
  [155.852, 236.994],
  [184.536, 321.954],
];
export const ELBOW_LEFT_COORDINATES: [number, number][] = [
  [184.361, 321.942],
  [771.252, 324.642],
  [773.466, 844.886],
  [714.075, 827.441],
  [635.301, 796.042],
  [547.219, 749.147],
  [443.265, 677.323],
  [352.258, 591.392],
  [277.066, 495.536],
  [210.628, 381.406],
];
export const PAINT_UPPER_RIGHT_COORDINATES: [number, number][] = [
  [988.127, 7.327],
  [1209.76, 7.603],
  [1210.513, 327.371],
  [988.863, 326.907],
];
export const PAINT_UPPER_LEFT_COORDINATES: [number, number][] = [
  [772.026, 8.137],
  [988.045, 7.417],
  [988.928, 326.925],
  [771.223, 324.546],
];
export const PAINT_BOTTOM_RIGHT_COORDINATES: [number, number][] = [
  [988.769, 327.244],
  [1210.121, 327.623],
  [1210.956, 654.415],
  [990.13, 653.952],
];
export const PAINT_BOTTOM_LEFT_COORDINATES: [number, number][] = [
  [771.032, 325.396],
  [771.648, 654.792],
  [989.667, 653.677],
  [988.652, 327.438],
];
export const KEY_ZONE_COORDINATES: [number, number][] = [
  [771.954, 655.158],
  [1210.911, 655.18],
  [1211.82, 847.001],
  [1169.857, 856.645],
  [1134.454, 862.7],
  [1058.569, 871.86],
  [991.713, 874.479],
  [914.545, 869.869],
  [836.908, 859.801],
  [773.542, 845.042],
];
export const BLOCK_RIGHT_COORDINATES: [number, number][] = [
  [1210.017, 7.604],
  [1869.772, 7.874],
  [1866.72, 80.441],
  [1856.928, 156.383],
  [1835.604, 244.238],
  [1805.562, 331.602],
  [1210.872, 327.507],
];
export const ELBOW_RIGHT_COORDINATES: [number, number][] = [
  [1805.593, 331.484],
  [1210.58, 327.531],
  [1211.718, 847.317],
  [1320.654, 811.857],
  [1413.673, 768.463],
  [1500.043, 714.832],
  [1584.233, 646.864],
  [1658.062, 570.82],
  [1717.714, 494.674],
  [1775.048, 397.535],
];
export const WING_LEFT_COORDINATES: [number, number][] = [
  [10.275, 561.462],
  [11.485, 1399.699],
  [771.615, 1399.977],
  [773.456, 845.048],
  [721.443, 829.759],
  [650.764, 802.614],
  [591.145, 774.177],
  [528.46, 738.921],
  [450.123, 682.684],
  [405.262, 643.679],
  [355.488, 594.147],
  [328.564, 563.393],
];
export const MIDDLE_THREE_POINT_COORDINATES: [number, number][] = [
  [773.44, 845.021],
  [837.304, 859.86],
  [879.157, 866.016],
  [924.214, 870.778],
  [992.063, 874.408],
  [1063.706, 871.516],
  [1119.787, 865.678],
  [1171.77, 856.73],
  [1212.118, 846.836],
  [1214.206, 1399.741],
  [771.954, 1400.083],
];
export const WING_RIGHT_COORDINATES: [number, number][] = [
  [1214.501, 1399.414],
  [1974.655, 1399.321],
  [1974.173, 562.636],
  [1665.636, 562.486],
  [1609.073, 624.881],
  [1548.215, 678.665],
  [1482.804, 726.418],
  [1424.332, 762.773],
  [1354.205, 797.954],
  [1274.079, 828.539],
  [1212.166, 846.834],
];
export const CORNER_LEFT_COORDINATES: [number, number][] = [
  [327.295, 563.291],
  [11.231, 562.225],
  [10.215, 7.799],
  [124.935, 7.845],
  [125.993, 49.249],
  [131.712, 114.09],
  [140.814, 174.289],
  [155.199, 234.712],
  [185.128, 322.911],
  [207.095, 373.854],
  [244.576, 444.762],
  [295.94, 522.952],
];
export const CORNER_RIGHT_COORDINATES: [number, number][] = [
  [1665.411, 561.975],
  [1974.733, 563.784],
  [1973.628, 8.116],
  [1869.194, 8.954],
  [1869.52, 32.163],
  [1867.708, 74.029],
  [1862.557, 120.468],
  [1850.777, 186.368],
  [1837.898, 236.854],
  [1811.99, 315.989],
  [1769.494, 407.736],
  [1712.821, 501.256],
];
export const SHOT_CHART_WIDTH = 1978;
export const SHOT_CHART_HEIGHT = 1406;

// Feedback
export const FEEDBACK_LIMIT: number = 2000;

// Report
export const REPORT_LIMIT: number = 4000;

// Shimmer UI
export const SHIMMER_COLORS: string[] = ["#434343", "#2c2c2c", "#434343"];

// Event attendance types
export const ATTENDANCE_GOING: string = "going";
export const ATTENDANCE_NOT_GOING: string = "notGoing";
export const ATTENDANCE_MAYBE: string = "maybe";

// Speedtest file
export const SPEEDTEST_FILE_URL: string =
  "https://firebasestorage.googleapis.com/v0/b/hooper-ac7b0.appspot.com/o/other%2F10MB.zip?alt=media&token=094e3e73-b772-4a50-9bf7-576e60b9de64";
export const SPEEDTEST_FILE_MBSIZE: number = 10;
export const SPEEDTEST_DOWNLOAD_TO_UPLOAD_RATIO: number = 10;
export const SPEEDTEST_UPLOAD_CUTOFF: number = 2;
