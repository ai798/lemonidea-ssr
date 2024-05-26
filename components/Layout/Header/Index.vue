<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

// import { googleLogout } from 'vue3-google-login'
import { vOnClickOutside } from '@vueuse/components'
import { useUserStore } from '@/store/user'
import { getUserPrivacy, sendFB } from '@/api/index'
import emitter from '@/utils/mitt'

const { locale } = useI18n()

const userStore = useUserStore()
const Cookies = useCookie('user')
const date = new Date()
const showDialog = ref(false)

const year = date.getFullYear()
const month = date.getMonth()
const day = date.getDate()
const hour = date.getHours()
const clickTime: any = computed(() => {
  return userStore.getClickTime
})
const clickShowRedBot = ref(false)
const hasToken = computed(() => {
  return JSON.stringify(userStore.getUserInfo) !== '{}'
})
onMounted(() => {
  const timeArr: any = clickTime.value?.split('-') ?? []
  if (timeArr.length === 0)
    clickShowRedBot.value = true
  if (month - timeArr[1] > 0)
    clickShowRedBot.value = false
  if (day - timeArr[2] > 0 && hour - timeArr[3] === 0)
    clickShowRedBot.value = false
})
const visible = ref(false)
const router = useRouter()
const { t } = useI18n()
const user: any = computed(() => {
  return userStore.getUserInfo
})
function closeModel() {
  visible.value = false
}
const showFeedBack = ref(false)
const showTips = ref(false)
const feedback = ref('')
function handleSendFB() {
  if (!feedback.value)
    return
  sendFB({ feedback: feedback.value }, userStore.getLang, userStore.getUserToken)
    .then((res) => {
      if (res.errCode === 0) {
        ElMessage({
          message: res.errMsg,
          type: 'success',
        })
      }
    })
    .finally(() => {
      feedback.value = ''
    })
  showFeedBack.value = false
}
function handleGoToIns() {
  // open('https://www.instagram.com/lemonaidea')
}
const local: any = locale.value === 'en' ? '' : `/${locale.value}`
const localGoHome: any = locale.value === 'en' ? '/' : `/${locale.value}`
function handleOpenPrivacy() {
  router.push(`${local}/privacy`)
}
function handleGoHome() {
  router.push(`${localGoHome}`)
}
function handleLogout() {
  // localStorage.removeItem('user')
  // localStorage.removeItem('user_token')
  // localStorage.removeItem('user_profile')
  Cookies.value = ''
  userStore.setUserToken('')
  visible.value = false
  userStore.reset()
  // googleLogout()
  router.push('/')
  // location.reload()
  userStore.setModel('3.5')
}
function testRoute() {
  const cur = router.currentRoute.value.path.split('/')

  return cur.find((ele: string) => ['ja', 'ms', 'zh-tw', 'th'].includes(ele))
}
function handleGoLogin() {
  showTips.value = false
  console.log('testRoute()', testRoute())
  console.log('local', local)
  if (testRoute())
    router.replace(`${local}/login`)
  else router.push(`${local}/login`)
}
function handleShowFreeTips() {
  if (userStore.hasToken)
    emitter.emit('showLoginDialog')
  else showTips.value = true

  if (!clickTime.value) {
    const currentDate = `${year}-${month}-${day}-${hour} `
    // localStorage.setItem('clickTime', currentDate)
    userStore.setClickTime(currentDate)
    clickShowRedBot.value = false
  }
}
</script>

<template>
  <div class="header">
    <div @click="handleGoHome">
      <img
        class="logo"
        src="@/assets/lemon-8.png"
        alt=""
      >
      <img
        class="beta"
        src="@/assets/beta.png"
        alt=""
      >
    </div>
    <div class="header-right">
      <div
        class="icon-box abs"
        @click="handleShowFreeTips"
      >
        <img
          class="small-icon"
          src="@/assets/flash.png"
          alt=""
        >
        <span>{{ $t("lemonaidea_invite_entrance_web") }}</span>
        <img
          v-if="hasToken && clickShowRedBot"
          class="small-icon-red"
          src="@/assets/red.jpg"
          alt=""
        >
      </div>
      <div
        class="icon-box"
        @click="handleOpenPrivacy"
      >
        <img
          class="small-icon"
          src="@/assets/privacy.jpg"
          alt=""
        >
        <span>{{ $t("lemonaidea_privacy") }}</span>
      </div>
      <div
        class="icon-box"
        @click="handleGoToIns"
      >
        <img
          class="small-icon"
          src="@/assets/instagram.jpg"
          alt=""
        >
        <span>Instagram</span>
      </div>
      <div
        class="icon-box"
        @click="showFeedBack = true"
      >
        <img
          class="small-icon"
          src="@/assets/mail.png"
          alt=""
        >
        <span>{{ $t("lemonaidea_feedback") }}</span>
      </div>
      <li class="hidden !block">
        <ClientOnly>
          <Dropdown />
        </ClientOnly>
      </li>
      <div
        v-if="!user?.user?.username"
        class="login"
        @click="handleGoLogin()"
      >
        {{ $t("lemonaidea_login_btn_web") }}
      </div>
      <el-popover
        :visible="visible"
        placement="bottom"
        :width="212"
      >
        <template #reference>
          <div
            v-if="user?.user?.username"
            class="user-header"
            @click="visible = !visible"
          >
            {{ user?.user?.username?.slice(0, 1) ?? "" }}
          </div>
        </template>
        <!-- <div v-else @click="router.push('/register')">
        go login
      </div> -->
        <div
          v-on-click-outside="closeModel"
          class="inner"
          @click="handleLogout"
        >
          <img src="@/assets/logout.jpg">
          <p>{{ $t("lemonaidea_logout") }}</p>
        </div>
      </el-popover>
    </div>
  </div>

  <ClientOnly>
    <el-dialog
      v-model="showFeedBack"
      :title="t('lemonaidea_feedback')"
      width="30%"
      style="height: 300px"
      class="basic_dialog"
      center
    >
      <el-input
        v-model="feedback"
        :autosize="{ minRows: 5, maxRows: 5 }"
        resize="none"
        type="textarea"
      />
      <template #footer>
        <span class="dialog-footer">
          <!-- <el-button @click="showFeedBack = false">Cancel</el-button> -->
          <el-button
            type="primary"
            class="fb-but"
            @click="handleSendFB"
          >
            {{ $t("lemonaidea_feedback_confirm") }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </ClientOnly>
  <ClientOnly>
    <el-dialog
      v-model="showTips"
      class="tips-dialog"
      :title="t('lemonaidea_limited_free_title')"
      width="30%"
      style="height: 280px"
      center
    >
      <p>{{ $t("lemonaidea_login_alert_desc_c") }}</p>
      <template #footer>
        <span class="dialog-footer-tips">
          <!-- <el-button @click="showFeedBack = false">Cancel</el-button> -->
          <!-- <el-button class="fb-but" type="primary" @click="showTips = false">
                      {{ t("lemonaidea_limited_free_btn") }}
                    </el-button> -->
          <el-button
            class="confirm_copy"
            type="default"
            @click="handleGoLogin"
          >{{ $t("lemonaidea_login_alert_btn_go") }}</el-button>
          <p
            class="cancle"
            @click="showTips = !showTips"
          >
            {{ $t("cancel") }}
          </p>
        </span>
      </template>
    </el-dialog>
  </ClientOnly>

  <!-- 已登录的tips弹窗--->
  <ClientOnly>
    <LoginDialog :show-dialog="showDialog" />
  </ClientOnly>
</template>

<style lang="scss" scoped>
.header {
  z-index: 10;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  margin-top: 8px;
  width: calc(100% - 16px);
  height: 64px;
  border-radius: 44px;
  border: 1px;
  background-color: #fff;
  padding: 0 12px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  .logo {
    width: 156px;
    height: 40px;
    position: relative;
    margin-left: 24px;
    cursor: pointer;
  }
  .beta {
    position: absolute;
    width: 48px;
    height: 20px;
    top: 10px;
    left: 184px;
    padding: 2px 7px 2px 7px;
    border-radius: 4px;
  }
  .header-right,
  .icon-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    img {
      width: 32px;
      height: 32px;
    }
    span {
      font-family: Poppins;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: left;
    }
  }
  .hidden {
    list-style: none;
  }
  .header-right {
    .login {
      display: flex;
      height: 40px;
      padding: 7px 16px;
      justify-content: center;
      align-items: center;
      border-radius: 32px;
      background: #1d242f;
      color: #fff;
      font-family: Poppins;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      /* 142.857% */
      margin-left: 16px;
    }
  }
  .icon-box {
    margin-right: 24px;
  }
  .abs {
    position: relative;
  }
  .small-icon-red {
    position: absolute;
    right: -10px;
    top: 0;
    width: 10px !important;
    height: 10px !important;
  }
}

.user-header {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 50%;
  margin-left: 16px;
  padding: 0 10px;
  background-color: #60696c;
  color: #fff;
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  line-height: 40px;
  text-align: center;
}

.basic_dialog {
}

.confirm_copy {
  display: flex;
  width: 285px;
  height: 54px;
  padding: 10px 26px;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background: #1d242f;
  color: #fff;
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.cancle {
  color: #909090;
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 10px 26px;
  text-align: center;
  cursor: pointer;
}

.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.dialog-footer-tips {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.fb-but {
  display: flex;
  width: 258px;
  height: 48px;
  padding: 10px 26px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 16px;
  background: #1e232d;
  border: none;
  color: #fff;
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.tips-dialog {
  width: 590px;
  height: 290px;
  flex-shrink: 0;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.05);
  p {
    color: #1d2331;
    text-align: center;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
}
</style>

<style lang="scss">
.el-dialog--center {
  width: 590px;
  flex-shrink: 0;
  border-radius: 24px !important;
  background: #fff;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.05);
}

.el-dialog__header {
  padding: 24px 0;
}

.el-dialog__headerbtn {
  background: url("@/assets/close.png");
  background-size: cover;
  top: 24px;
  right: 24px;
  height: 24px;
  width: 24px;
  i {
    display: none;
  }
}

.el-dialog__body {
  padding: 0 24px !important;
}

.el-dialog__title {
  color: #656565;
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  /* 133.333% */
}

.inner {
  display: flex;
  height: 42px;
  padding: 3px 8px !important;
  align-items: center;
  align-self: stretch;
  border-radius: 3px;
  background: #e9edf5;
  cursor: pointer;
  img {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
  p {
    overflow: hidden;
    color: #1d2331;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    /* 142.857% */
  }
}
</style>

<style lang="scss">
.el-textarea__inner {
  border-radius: 8px;
  background: #f6f7f5;
  width: 100%;
  flex-shrink: 0;
}

.el-dialog__footer {
  position: absolute;
  bottom: 24px;
  padding: 0;
  left: 0;
  right: 0;
}

.el-popper {
  height: 64px;
  width: 212px;
  padding: 8px 8px !important;
}
</style>

<style lang="scss">
.el-textarea__inner {
  border-radius: 8px;
  background: #f6f7f5;
  width: 100%;
  flex-shrink: 0;
}

.el-dialog__footer {
  position: absolute;
  bottom: 24px;
  padding: 0;
  left: 0;
  right: 0;
}

.el-popper {
  height: 64px;
  width: 212px;
  padding: 8px 8px !important;
}
</style>
