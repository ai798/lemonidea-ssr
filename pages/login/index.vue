<script lang="ts" setup>
// import { decodeCredential } from 'vue3-google-login'
import { useRouter } from 'vue-router'
import md5 from 'md5'
import { ElMessage } from 'element-plus'

import type { CredentialResponse } from 'vue3-google-signin'
import { GoogleSignInButton, decodeCredential } from 'vue3-google-signin'

import { useLocalStorage } from '@vueuse/core'
import { CLIENTID } from '@/utils/index'
import { useUserStore } from '@/store/user'
import { googleLogin, postLogin, postRegister, postSendCode } from '@/api'

const Cookies = useCookie('user')
const { locale } = useI18n()
const userStore = useUserStore()
const email = ref('')
const code = ref('')
const timer = ref(0)
const resend = ref(false)
const isInvited = ref(false)
const router = useRouter()
const inviteUser = ref({} as any)
const invitedId = computed(() => {
  return router.currentRoute.value.params.inviteId ?? ''
})
const emailValid = computed(() => {
  const reg
    = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/
  return reg.test(email.value)
})
const pass = computed(() => {
  return emailValid.value && code.value !== ''
})

function handleSignInSuccess(response: CredentialResponse) {
  const { credential } = response
  callback(response)
  const decodedCredential = decodeCredential(credential)
  console.log('User:', decodedCredential)
}

function handleSignInError() {
  console.error('Signin Failed')
}
// function handleGetProfile() {
//   postInviteUserProfile({ invite_code: invitedId.value }, userStore.getLang).then(
//     (res) => {
//       if (res.errCode === 0) {
//         isInvited.value = true
//         inviteUser.value = res.payload.user
//       }
//     },
//   )
// }
// handleGetProfile();
function callback(response: any) {
  // decodeCredential will retrive the JWT payload from the credential
  const userData: any = decodeCredential(response.credential)
  if (userData) {
    googleLogin(
      {
        email: userData.email,
        name: userData.name,
        sub: userData.id,
        sign: md5(userData.email + userData.id + CLIENTID),
      },
      userStore.getLang,
      userStore.getUserToken,
    ).then((res) => {
      console.log(res)
      if (res.errCode === 0 || res.errCode === 2053) {
        router.push('/')
        // userStore.setInfo(res.payload);
        // window.localStorage.setItem('user', JSON.stringify(res.payload))
        // window.localStorage.setItem('user_token', res.payload.token.access)
        // window.localStorage.setItem('unlogin_uuid', '')
        Cookies.value = res.payload.token.access
        userStore.reset()
        userStore.setUserToken(res.payload.token.access)
        userStore.setUnloginUserId('')
        userStore.setProfile()
        userStore.setInfo(res.payload)
      }
    })
  }
  console.log('Handle the userData', userData)
}
const { pause, resume } = useIntervalFn(() => {
  /// / 每次定时任务 控制时间递减
  if (timer.value <= 0) {
    // 停止递减：停止定时器
    resend.value = true
    pause()
  }
  else {
    timer.value -= 1
  }
}, 1000)
function handleSendCode() {
  if (!email.value || timer.value)
    return
  postSendCode(
    { email: email.value, verify_type: '03' },
    userStore.getLang,
    userStore.getUserToken,
  ).then((res) => {
    console.log(res)
    if (res)
      resend.value = false
  })
  // 开启定时效果
  if (timer.value === 0) {
    timer.value = 60
    // 重启定时器
    resume()
  }
  else {
    return
  }
  ElMessage({
    message: t('lemonaidea_login_code_sent_toast'),
    type: 'success',
  })
}
function handleOpenPrivacy() {
  console.log(locale.value)
  const local = locale.value === 'en' ? '' : `/${locale.value}`
  router.push(`${local}/privacy`)
}

const googleloginpic = computed(() => `/images/googlelogin.jpg`)
function handleRegister() {
  console.log(router.currentRoute.value)
  const params = {
    // email: router.currentRoute.value.query.email,
    email: email.value,
    verify_code: code.value,
    invite_code: router.currentRoute.value.query.inviteCode,
  }
  if (
    router.currentRoute.value.fullPath.includes('login')
    || router.currentRoute.value.query.isUser === '1'
  ) {
    postLogin(params, userStore.getLang, userStore.getUserToken)
      .then((res) => {
        if (res.errCode === 0) {
          userStore.setInfo(res.payload)
          // window.localStorage.setItem('user', JSON.stringify(res.payload))
          // window.localStorage.setItem('user_token', res.payload.token.access)
          // window.localStorage.setItem('unlogin_uuid', '')
          useCookie('user_token', res.payload.token.access)
          userStore.setUserToken(res.payload.token.access)
          userStore.setUnloginUserId('')
          userStore.setUnloginUserId('')
          router.push('/')
          userStore.setProfile()

          // } else if (res.errCode === 2002) {
          //   ElMessage({
          //     // message: t("leomaidea_login_verify_error"),
          //     message: res.errMsg,
          //     type: "warning",
          //   });
          // } else if (res.errCode === 2023) {
          //   ElMessage({
          //     message: t("leomaidea_login_verify_error"),
          //     type: "warning",
          //   });
          // ElMessage({
          //   message: `${t("lemonaidea_login_subtitle")} ${email.value} ${t(
          //     "lemonaidea_login_subtitle_left"
          //   )}`,
          //   type: "warning",
          // });
        }
        else {
          ElMessage({
            message: res.errMsg,
            type: 'warning',
          })
        }
      })
      .then(() => {})
  }
  else {
    postRegister(params, userStore.getLang, userStore.getUserToken)
      .then((res) => {
        if (res.errCode === 0) {
          userStore.setInfo(res.payload)
          // window.localStorage.setItem('user', JSON.stringify(res.payload))
          // window.localStorage.setItem('user_token', res.payload.token.access)
          useCookie('user_token', res.payload.token.access)
          userStore.setUserToken(res.payload.token.access)
          router.push('/')
          userStore.setProfile()
        }
        else {
          ElMessage({
            message: res.errMsg,
            type: 'warning',
          })
        }
      })
      .then(() => {})
  }
}
onDeactivated(() => {
  resume()
})
</script>

<template>
  <div class="login_main">
    <!-- src="@/assets/logo-png" -->
    <img
      class="logo_login"
      src="@/assets/logo-login.png"
    >
    <div class="main_box">
      <div class="content">
        <p class="title">
          {{ $t("lemonaidea_login_title_web") }}
        </p>
        <span class="title_span">{{ $t("lemonaidea_subtitle") }}</span>
        <div class="center_box">
          <el-input
            v-model="email"
            :placeholder="$t('lemonaidea_login_emailadress')"
          />
          <el-input
            v-model="code"
            class="code_input"
            :placeholder="$t('leomaidea_login_verify_code')"
          >
            <template #append>
              <el-button
                class="send_code"
                :class="[emailValid ? 'valid_email' : '', timer ? 'dark' : '']"
                @click="handleSendCode"
              >
                {{ resend ? $t("lemonaidea_btn_send") : `${timer}s` }}
              </el-button>
            </template>
          </el-input>
          <el-button
            :class="[pass ? 'pass_code' : 'button']"
            @click="handleRegister"
          >
            {{ $t("lemonaidea_login_btn_web") }}
          </el-button>
        </div>
        <!-- <span class="text"
        >By clicking Create account, you agree to lemonaidea Terms and Conditions and
        confirm you have read our Privacy Notice. You may receive offers, news and updates
        from us.</span
      > -->
        <p class="or">
          OR
        </p>
        <!----google登录 ---->
        <GoogleSignInButton
          @success="handleSignInSuccess"
          @error="handleSignInError"
        >
          <AppImg
            :src="googleloginpic"
            alt="googlelogin"
            class="googlepic"
          />
          Login with Google
        </GoogleSignInButton>
        <!-- <button class="googlelogin" :disabled="!isReady" @click="() => login()">
          <AppImg :src="googleloginpic" alt="googlelogin" class="googlepic" />
          Login with Google
        </button> -->

        <!-- <GoogleLogin :callback="callback" /> -->
        <!-- <span class="account"
          >Don't have an account?
          <span class="underline login" @click="router.push('/register')">Sign up</span>
        </span> -->
      </div>

      <div class="privacy">
        <span class="text">{{ $t("lemonaidea_login_policy") }}</span>
        <span
          class="underline login"
          @click="handleOpenPrivacy"
        >
          {{ $t("lemonaidea_privacy") }}
        </span>
        <span class="text">{{ $t("lemonaidea_login_policy_left") }}</span>
        <!-- <span class="text"> This site is protected by reCAPTCHA and the</span>
        <span class="underline">Google Privacy</span>
        <span class="text">Policy and</span>
        <span class="underline">Terms of Service apply</span>. -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login_main {
  height: 100%;
  background-color: #fff;
  .logo_login {
    width: 156px;
    height: 26px;
    flex-shrink: 0;
    margin: 48px 0 0 48px;
    display: inline-block;
  }
  .main_box {
    margin-top: 98px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .send_code {
      width: 142px;
      height: 48px;
      flex-shrink: 0;
      border-radius: 8px;
      background: #e0e2da;
      color: #a8aaa3;
      font-family: Helvetica;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px; /* 150% */
    }
    .title {
      color: #1d2331;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
        sans-serif;
      font-size: 48px;
      font-style: normal;
      font-weight: 900;
      line-height: 74px; /* 154.167% */
    }
    .title_span {
      margin-top: 8px;
      margin-bottom: 48px;
    }
    .center_box:deep(.el-input-group__append) {
      box-shadow: 0 0 0 0;
      border: 0;
    }
    .center_box :deep(.el-input__wrapper) {
      box-shadow: 0 0 0 0;
    }
    .center_box {
      width: 588px;

      .el-input {
        width: 588px;
        height: 48px;
        flex-shrink: 0;
      }
      .button {
        width: 588px;
        height: 48px;
        flex-shrink: 0;
        border-radius: 48px;
        background: #e0e2da;
        color: #a8aaa3;
        font-family: Helvetica;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        margin-top: 16px;
        margin-bottom: 24px;
        border: none;
      }
      .code_input {
        margin-top: 8px;
      }
    }
    .privacy {
      position: absolute;
      bottom: 0;
    }
    .valid_email {
      width: 142px;
      height: 48px;
      flex-shrink: 0;
      border-radius: 8px;
      background: #7730d0;
      color: #fff;
      font-family: Helvetica;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px; /* 150% */
    }
    .dark {
      width: 142px;
      height: 48px;
      flex-shrink: 0;
      border-radius: 8px;
      background: #e0e2da;
      color: #a8aaa3;
      text-align: center;
      font-family: Helvetica;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px; /* 150% */
    }
    .pass_code {
      width: 588px;
      height: 48px;
      flex-shrink: 0;
      border-radius: 48px;
      background: #1d242f;
      color: #fff;
      font-family: Helvetica;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      margin-top: 16px;
      margin-bottom: 24px;
      border: none;
    }
    .text {
      color: #656565;
      font-family: Helvetica;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      width: 587px;
    }
    .or {
      color: #1d2331;
      text-align: center;
      font-family: Helvetica;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin: 12px 0;
    }
    .googlelogin {
      border-radius: 48px;
      border: 1px solid #dadce0;
      background: #fff;
      width: 588px;
      height: 48px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #1d2331;
      font-family: Helvetica;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      .googlepic {
        width: 20px;
        height: 20px;
        margin-right: 12px;
      }
    }
    .account {
      margin: 48px 0 104px 0;
      color: #656565;
      text-align: center;
      font-family: Helvetica;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.7px;
    }
    .underline {
      color: #7730d0;
      font-family: Helvetica;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.7px;
      text-decoration-line: underline;
    }
    .login {
      font-size: 14px;
      cursor: pointer;
    }
  }
}
</style>

<style lang="scss">
.el-input__wrapper {
  border-radius: 8px;
  background: #f6f7f5;
}
.el-input__inner {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  color: #1d2331;
  font-family: Helvetica;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px; /* 100% */
}
.el-input__inner:focus{
  outline: none;
  --tw-ring-shadow:none;
}
</style>
