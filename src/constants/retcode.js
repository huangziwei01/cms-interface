const SessionExpired = { code: -1, msg: "FAILED OVERDUE" }; //登录过期


const Fail = { code: 0, msg: "FAILED" }; //失败
const Success = { code: 1, msg: "SUCCESS OK" }; //成功


const ArgsError = { code: 2, msg: "ERROR ARGUMENTS" }; //参数错误
const ServerError = { code: 3, msg: "ERROR SERVER" }; //服务端错误
const UserExisted = { code: 10, msg: "USER ALREADY EXISTE" }; //用户已经存在
const UsernameOrPasswordError = {
  code: 11,
  msg: "ERROR INCORRECT USERNAME OR PASSWORD",
}; //用户名或者密码错误
const UserNotExist = { code: 12, msg: "USER DOES NOT EXISTE" }; //用户不存在
const NoAuthority = { code: 13, msg: "No AUTHORITY" }; //无权限
const IncorrectFormat = { code: 14, msg: "INCORRECT FORMAT" }; //格式不正确
const NotNullValue = { code: 15, msg: "NOT NULL VALUE" }; //空值
const UnknownError = { code: 100, msg: "UNKNOWN ERROR" }; //未知错误
const LoginOverdue = { code: 101, msg: "LOGIN OVERDUE" }; //登录态已过期


module.exports = {
  SessionExpired,
  Fail,
  Success,
  ArgsError,
  ServerError,
  UserExisted,
  UsernameOrPasswordError,
  UserNotExist,
  NoAuthority,
  IncorrectFormat,
  NotNullValue,
  UnknownError,
  LoginOverdue,
};
