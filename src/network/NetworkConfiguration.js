export const API_URL = "https://apiclone.instacash.land/api/";
export const CATCHWOO_URL = "https://userapi.catchwoo.com/api/";

export const NetworkConfiguration = {
  DEVICETOKEN: "admin/updateDeviceToken",
  ADMINLOGIN: "admin/adminlogin",
  TOTALHOST: "admin/getMontlyHost",
  TOTALUSER: "admin/getMontlyUser",
  USERPURCHASE: "admin/adminFindUserEarning",
  ONLINEUSER: "admin/adminOnlineUser",
  OFFLINEHOST: "admin/findOfflineHost",
  ONLINEHOST: "admin/findOnlineHost",
  OFFLINEUSER: "admin/adminOfflineUser",
  DASHBOARDNOTIFICATION: "admin/dashboardNotification",
  FORGOTPASSWORD: "admin/adminForgetPassword",
  SENDTOALL: "admin/sendMultiNotification",
  SENDTOFEW: "admin/sendMultiNotiToMore",
  RESETPASSWORD: "admin/adminResetPasword",
  PINCODE: "admin/searchByPinCode",
  ENTEROTP: "admin/verifyOtp",
  FINDONEUSER: "admin/findOneUser",
  DELETELEADER: "admin/adminDeletedLeader",
  EDITLEADER: "admin/updateLeaderData",
  USERREPORT: "admin/userReportsList",
  HOSTEARNING: "admin/adminGetHostEarning",
  DELETEBUCKET: "admin/deleteCoinsData",
  HOSTREPORT: "admin/hostReportsList",
  HOSTBLOCKDETAILS: "admin/hostBlockListDetails",
  HOSTFOLLOWER: "admin/hostFollowerDetails",
  REJECTHOST: "admin/rejectHostRequest",
  HOSTFOLLOWING: "admin/hostFollowingsList",
  HOSTCALLHISTORY: "admin/hostCallHistory",
  GETINTEREST: "interest/getAllInterest",
  POSTSUSPENDEDUSER: "admin/adminSuspendUser",
  POSTSUSPENDEDHOST: "admin/adminSuspendHost",
  SUSPENDEDUSER: "admin/getListUserSuspended",
  SUSPENDEDHOST: "admin/getListHostSuspended",
  SUSPENDHOST: "admin/adminSuspendHost",
  WARNEDHOST: "admin/getWaringHostList",
  WARNEDUSER: "admin/getWaringUserList",
  WARNHOSTNOTIFICATION: "admin/sendWorningNotificationHost",
  GETHOSTNOTIFICATION: "admin/getNotificationHost",
  GETBANNER: "banner/getAllBanner",
  GETONEGIFT: "gift/getOneGift",
  GETONESTICKER: "sticker/adminGetOneSticker",
  GETONEHOST: "admin/getOneHostProfile",
  GETUSERGIFT: "admin/adminGetUserSendGift",
  GETAUDIOCALLTIME: "admin/getSetAudioCallTime",
  PENDINGHOST: "admin/getHostPending",
  GETHELPLINENUMBER: "helpline/findAllhelplinenumber",
  ACCEPTEDHOST: "admin/getAllAcceptHost",
  REQUESTEDHOST: "admin/acceptHostRequest",
  GETLEADER: "admin/getAllLeader",
  GETONEBANNER: "banner/getOneBanner",
  GETAMOUNT: "admin/getBucketUserCoins",
  GETONEUSER: "admin/findOneUser",

  GETONECOIN: "wallet/findOnewallet",
  GETHOSTGIFT: "admin/adminGetHostSendGift",
  GETBUCKETLIST: "admin/findIncDecCoins",
  GETPAYMENTHISTORY: "admin/userPaymentDetails",
  TOTALHOSTEARNING: "admin/adminFindHostEarning",
  CHANGEPASSWORD: "admin/adminSetPassword",
  GETUSERFOLLOWING: "admin/userFollowingsList",
  GETPREMIUMCOINS: "admin/adminGetSetCoins",
  GETUSERFOLLOWER: "admin/userFollowerDetails",
  GETTOPTALENT: "admin/findTopTalentUser",
  REJECTEDHOST: "admin/getHostRejected",
  RANDOMCALLCHARGE: "admin/adminGetRandomCoins",
  GETHOSTFEEDBACK: "admin/hostFeedbackList",
  GETUSERFEEDBACK: "admin/userFeedbackList",
  GETUSERBLOCKLIST: "admin/userBlockListDetails",
  WEEKLYSTAR: "admin/findTopWeeklyStarHost",
  GETLEADERHOSTS: "admin/getLeaderHostlist",
  GETUSERCALLHISTORY: "admin/userCallHistory",
  COINSDEDUCTION: "admin/coinDeductionUser",
  USERWARNINGNOTIFICATION: "admin/sendWorningNotification",
  GETUSERS: "admin/getUsersPending",
  GETUSERNOTIFICATION: "admin/getNotificationUser",
  GETHOSTAUDIOCHARGE: "admin/getHostAudioFee",
  GETVIDEOCALLBALANCE: "admin/getHostFeesBalance",
  GETGIFT: "gift/getAllGift",
  GETWALLET: "wallet/getWallet",
  GETNOTIFICATION: "admin/adminGetAllNotification",
  GETSTICKER: "sticker/adminFindAllSticker",
  ADDGIFT: "gift/addGiftPicture",
  SENDREPLYHOST: "admin/updateFeedbackStatusHost",
  SENDREPLYUSER: "admin/updateFeedbackStatus",
  GETUSERMOMENT: "admin/adminFindUserMoment",
  HOSTMOMENT: "admin/adminFindHostMoment",
  DELETEUSER: "admin/adminDeletedUser",
  DELETEUSERMOMENT: "admin/adminDeletedUserMoment",
  DELETECOIN: "wallet/walletDeleted",
  DELETEGIFT: "gift/giftDelete",
  DELETEBANNER: "banner/bannerDelete",
  DELETEINTEREST: "interest/interestDeleted",
  DELETEWARNING: "admin/adminDeleteWarning",
  DELETESTICKER: "sticker/adminStickerDelete",
  DELETESUSPENSION: "admin/adminDeleteSuspended",
  DELETENOTIFICATION: "admin/adminDeleteNotification",
  DELETEHOSTMOMENT: "admin/adminDeletedHostMoment",
  DELETEHOST: "admin/adminDeletedHost",
  UPDATELEADER: "admin/addleaderId",
  UPDATEUSER: "admin/adminUpdateUser",
  UPDATEHOSTCHARGE: "admin/adminUpdateHostBalance",
  UPDATEAUDIOCALLCHARGE: "admin/addAudioCallFees",
  UPDATEPREMIUMCOINS: "admin/AdminSetPostCoins",
  UPDATERANDOMCOINS: "admin/randomCallCoins",
  UPDATENORMALCALLTIME: "admin/adminSetNormalCallTime",
  UPDATERANDOMCALLTIME: "admin/adminSetRandomCallTime",
  GETRANDOMCALLTIME: "admin/adminGetRandomPerSecCoins",
  GETNORMALCALLTIME: "admin/adminGetSetPerSecCoins",
  ADDWALLET: "wallet/addWallet",
  UPDATEWALLET: "wallet/updateWallet",
  ADDHELPLINE: "helpline/addhelplinenumber",
  ADDINTEREST: "interest/addInterest",
  UPDATEBANNERNAME: "banner/updateBannerField",
  UPDATEHOSTVIDEOFEES: "admin/adminAddHostuserfress",
  UPDATEHELPLINE: "helpline/updateNumber",
  UPDATEAUDIOCALLTIME: "admin/setAudioCallTime",
  UPDATESTICKER: "sticker/adminUpdateStickerData",
  UPDATEINTEREST: "interest/updateInterest",
  UPDATEGIFT: "gift/updateGiftdata",
  ADDLEADER: "admin/adminAddleader",
  ADDBANNER: "banner/addBannerPicture",
  ADDSTICKER: "sticker/addStickerPicture",
  WEEKLYTALENT: "admin/findWeeklyTalentUser",
  TOPSTAR: "admin/findTopStarHost",
  NEWSTAR: "admin/findNewStarHost",
  SUSPICIOUSDATA: "admin/suspicious",
  GETFLOWER: "gift/getRoseDetails",

  //subAdmin
  SUBADMINLIST: "admin/subAdminList",
  ADDSUBADMIN: "admin/adminAddSubAdmin",
  GETONESUBADMIN: "admin/subAdminDetails",
  EDITSUBADMIN: "admin/editSubAdmin",
  DELETESUBADMIN: "admin/adminDeleteSubadmin",

  //allcallhistory
  DROPPEDCALL: "admin/getAllCallTypeUser",
};
