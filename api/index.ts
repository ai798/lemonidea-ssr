import { http } from '@/utils/request'

// import { useUserStore } from "@/store/modules/user";
// const userStore = useUserStore();
const BASE_URL = 'http://8.218.221.95:18001'
/**
 * 账号密码登录
 * @returns UseAxiosReturn
 */
export function loginPassword(lang: any, token: any) {
  return http.post(`${BASE_URL}/api/login`, {
    data: { name: '123' },
    headers: {
      'Accept-Language': lang,
      'Authorization': `Bearer ${token}`,
    },
  })
}

/**
 * 生成内容
 * @returns UseAxiosReturn
 */
export function generate(data: any, lang: any, token: any) {
  return http.post(`${BASE_URL}/api/chat/generate`, data, {
    headers: {
      'Accept-Language': lang,
      'Authorization': `Bearer ${token}`,
    },
  })
}
/**
 * 发送反馈
 * @returns UseAxiosReturn
 */
export function sendFB(data: any, lang: any, token: any) {
  return http.post(`${BASE_URL}/api/user/feedback`, data, {
    headers: {
      'Accept-Language': lang,
      'Authorization': `Bearer ${token}`,
    },
  })
}

/**
 * 发送验证码
 * @returns UseAxiosReturn
 */
export function postSendCode(data: any, lang: any, token: any) {
  return http.post(`${BASE_URL}/api/user/verifycode`, data, {
    headers: {
      'Accept-Language': lang,
      'Authorization': `Bearer ${token}`,
    },
  })
}

/**
 * 注册
 * @returns UseAxiosReturn
 */
export function postRegister(data: any, lang: any, token: any) {
  return http.post(`${BASE_URL}/api/user/register`, data, {
    headers: {
      'Accept-Language': lang,
      'Authorization': `Bearer ${token}`,
    },
  })
}

/**
 * 检查是否注册
 * @returns UseAxiosReturn
 */
export function checkRegister(data: any, lang: any, token: any) {
  return http.post(`${BASE_URL}/api/user/checkregister`, data, {
    headers: {
      'Accept-Language': lang,
      'Authorization': `Bearer ${token}`,
    },
  })
}
/**
 * 登录
 * @returns UseAxiosReturn
 */
export function postLogin(data: any, lang: any, token: any) {
  return http.post(`${BASE_URL}/api/user/login`, data, {
    headers: {
      'Accept-Language': lang,
      'Authorization': `Bearer ${token}`,
    },
  })
}
/**
 * 获取用户资料
 * @returns UseAxiosReturn
 */
export function getUserProfile(lang: any, token: any) {
  return http.get(`${BASE_URL}/api/user/profile`, {
    headers: {
      'Accept-Language': lang,
      'Authorization': token ? `Bearer ${token}` : '',
    },
  })
}
/**
 * 获取邀请用户的资料
 * @returns UseAxiosReturn
 */
export function postInviteUserProfile(data: any, lang: any, token: any) {
  return http.post(`${BASE_URL}/api/user/invitecodeinfo`, data, {
    headers: {
      'Accept-Language': lang,
      'Authorization': `Bearer ${token}`,
    },
  })
}
/**
 * Google登陆
 * @returns UseAxiosReturn
 */
export function googleLogin(data: any, lang: any, token: any) {
  return http.post(`${BASE_URL}/api/user/logingoogle`, data, {
    headers: {
      'Accept-Language': lang,
      'Authorization': `Bearer ${token}`,
    },
  })
}
/**
 * 隐私政策
 * @returns UseAxiosReturn
 */
export function getUserPrivacy(lang: any, token: any) {
  return http.get(`${BASE_URL}/api/user/privacy`, {
    headers: {
      'Accept-Language': lang,
      'Authorization': `Bearer ${token}`,
    },
  })
}
