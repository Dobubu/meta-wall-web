export enum WebWSEventType {
  WEB_INIT = 'WEB_Init',
  WEB_TYPING = 'WEB_Typing',
  WEB_ADD_MESSAGE = 'WEB_Add_Message',
  WEB_USER_LEAVE = 'WEB_User_Leave',
}

export enum AppWSEventType {
  APP_INIT_RESPONSE = 'APP_Init_Response',
  APP_TYPING_RESPONSE = 'APP_Typing_Response',
  APP_ADD_MESSAGE_RESPONSE = 'APP_Add_Message_Response',
  APP_USER_LEAVE_RESPONSE = 'APP_User_Leave_Response',
  APP_ONLINE_TOTAL_RESPONSE = 'APP_Online_Total_Response',
}

export enum StorageType {
  ACCESSTOKEN = 'meta_wall_access_token',
  USERID = 'meta_wall_user_id',
  THEME = 'meta_wall_theme',
}
