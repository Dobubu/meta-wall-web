export enum WebWSEventType {
  WebInit = 'WEB_Init',
  WebTyping = 'WEB_Typing',
  WebAddMessage = 'WEB_Add_Message',
  WebUserLeave = 'WEB_User_Leave',
}

export enum AppWSEventType {
  AppInitResponse = 'APP_Init_Response',
  AppTypingResponse = 'APP_Typing_Response',
  AppAddMessageResponse = 'APP_Add_Message_Response',
  AppUserLeaveResponse = 'APP_User_Leave_Response',
  AppOnlineTotalResponse = 'APP_Online_Total_Response',
}
