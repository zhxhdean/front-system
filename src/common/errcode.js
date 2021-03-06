// 成功
export const SUCCESS = 0;

// 1-50 请求参数错误 参数为空
export const EMPTY_PARAMETERS = 1;
// 密码错误
export const INCORRECT_PASSWORD = 2;
// token错误
export const TOKEN_ERROR = 10;
// token超时
export const TOKEN_TIMEOUT_ERROR = 11;
// token即将过期(属于成功验证token)
export const TOKEN_IMMINENT_TIMEOUT = 12;

// 不存在用户
export const NO_USER = 20;
export const EMPTY_UID = 21;

// 51-99 接口错误 >=100 ,框架级错误 超时
export const TIMEOUT_MESSAGE = 'ECONNABORTED';
export const TIMEOUT = 100;
export const NETWORK_ERROR_MESSAGE = 'Network Error';
export const NETWORK_ERROR = 101;

// 
export const METHOD_NOT_ALLOWED = 405;
