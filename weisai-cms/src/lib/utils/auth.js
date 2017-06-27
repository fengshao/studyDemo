var Q = require("q");
// var UserDto = require("./user-dto");
/*
 *
 * user
 * {
 *  token:String,
 *  userid:String,
 *  username:String,
 *  ...
 * }
 *
 */
// //获取token
// function getAccesstoken(req) {
//     var user = UserDto.turnSessionDataToUser(req&&req.session);
//     return (user && user.token) || "";
// }
// //获取用户信息
// function getUser(req) {
//     return UserDto.turnSessionDataToUser(req && req.session ) || {};
//  }
// //清除session的内容
// function clean(req, res) {
//     //defer机制
//     var deferred = Q.defer();
//     req.session.destroy(function () {
//         deferred.resolve();
//     });
//     return deferred.promise;
// }
//
// //向系统中保存用户的信息
// /**
//  * @param req
//  * @param user
//  *
//  * 将token和licensekey保存到session中
//  * 将userId和account和name保存到cookie中
//  */
// function saveUserInfo(req, user) {
//     //defer机制
//     var deferred = Q.defer();
//     //用户信息保存到session中
//     var userData = UserDto.toSessionData(user);
//     req.session.user = userData.user;
//     req.session["_USER_TOKEN_"] = userData["_USER_TOKEN_"];
//     req.session.isLogin = true;
//     deferred.resolve();
//     return deferred.promise;
// }
//
// exports.getToken = getAccesstoken;
// exports.clean = clean;
// exports.saveUserInfo = saveUserInfo;
// exports.getUser = getUser;