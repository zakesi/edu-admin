<template>
  <div class="passport-layout-web-reg web-v3-layout-box">
    <div class="web-reg-left">
      <div class="left-title">
        <div>
          极客 · 云教育 <br />
          面向未来的技术人才教育
        </div>
      </div>
      <div class="left-img"></div>
    </div>
    <div class="web-reg-right">
      <div class="web-main-content">
        <div class="register-with-account-container flex-column">
          <div class="base-back-container">
            <div
              class="base-back-text"
              v-if="showBackArrow"
              @click="handleGoback"
            >
              返回
            </div>
          </div>
          <div class="base-title-container">
            <div class="base-title-title">
              {{ formInformation[step].title }}
            </div>
            <div class="base-title-subtitle">
              <span>{{ formInformation[step].description }}</span>
              <span style="font-weight: 600; color: #333;" v-if="step === 2">
                +86 {{ phone }}
              </span>
            </div>
          </div>
          <div class="base-input-container" v-if="step === 1">
            <div
              :class="['mobile-input-container', { 'on-error': mobileError }]"
            >
              <input
                class="mobile-input-code"
                id="register_code_area"
                name="register_form_items"
                spellcheck="false"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                maxlength="4"
                type="tel"
                disabled=""
                value="+86"
              />
              <div class="mobile-input-seperator-line"></div>
              <input
                class="mobile-input-phone"
                name="register_phone"
                placeholder="请输入你的手机号"
                spellcheck="false"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                type="tel"
                v-model="phone"
                @focus="handleFocus"
              />
            </div>
            <div class="mobile-input-error-msg" v-if="mobileError">
              手机号码错误，请重新输入。
            </div>
          </div>
          <div class="base-input-container" v-if="step === 2">
            <div class="code-box-container">
              <template v-for="(item, index) in code">
                <div class="code-box" :key="index">
                  <input
                    v-focus
                    :data-index="index"
                    :data-focus-index="focusIndex"
                    :class="['code-box-input', { active: code[index] }]"
                    type="tel"
                    name="register_form_items"
                    spellcheck="false"
                    autocomplete="off"
                    autocorrect="off"
                    autocapitalize="off"
                    v-model="code[index]"
                    :disabled="focusIndex !== index"
                    @keyup="handleCodeboxChange"
                  />
                </div>
              </template>
            </div>
            <div class="code-box-count" v-if="countDowning">
              {{ count }} 秒后可重新获取验证码
            </div>
            <div
              class="code-box-resend"
              v-if="!countDowning"
              @click="handleSendMessage"
            >
              重新获取验证码
            </div>
          </div>
          <div class="flex-grow"></div>
          <div
            v-if="step === 1"
            :class="[
              'base-button',
              { 'base-button-disabled': mobileInputDisabled }
            ]"
            @click="handleSendMessage"
          >
            下一步
          </div>
          <div
            v-if="step === 2"
            :class="[
              'base-button',
              { 'base-button-disabled': codeInputDisabled }
            ]"
            @click="handleSubmit"
          >
            登录
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import authService from "@/globals/service/auth";

export default {
  data() {
    return {
      count: 60,
      countDowning: false,
      step: 1, // 1/2
      formInformation: {
        1: {
          title: "欢迎来到极客 · EDU",
          description:
            " 以企业为教学出发点，以企业为人才流向地，面向市场及职场打造“教→学→求职”全流程的创新式闭环。 "
        },
        2: {
          title: "验证手机号",
          description:
            "请输的 6 位验证码，有效期十分钟。如未收到，请尝试重新获取验证码。"
        }
      },
      showBackArrow: false,
      mobileError: false,
      phone: "13511111111",
      code: ["", "", "", "", "", ""],
      focusIndex: 0
    };
  },
  computed: {
    mobileInputDisabled() {
      return this.phone.length !== 11;
    },
    codeInputDisabled() {
      return this.code.some(data => data === "");
    }
  },
  methods: {
    handleSendMessage() {
      if (!this.isMobile(this.phone)) {
        this.mobileError = true;
        return;
      }

      authService.smsSend({ phone: this.phone }).then(res => {
        const code = res.code;
        if (code) {
          this.$message.success("验证码：" + code, 9000);
        }
        this.showBackArrow = true;
        this.step = 2;
        this.countDown();
      });
    },
    handleGoback() {
      this.showBackArrow = false;
      this.step = 1;
      this.phone = "";
      this.countDownStop();
    },
    countDown() {
      this.countDowning = setInterval(() => {
        this.count--;
        if (this.count === 1) {
          this.countDownStop();
        }
      }, 1000);
    },
    countDownStop() {
      clearInterval(this.countDowning);
      this.count = 60;
      this.countDowning = false;
    },
    isMobile(phone) {
      return /^(1[34578]\d{9})$/.test(phone);
    },
    handleFocus() {
      if (this.mobileError) {
        this.mobileError = false;
      }
    },
    handleCodeboxChange(e) {
      const focusIndex = this.focusIndex;
      const value = this.code[focusIndex];
      if (e.keyCode === 8 && focusIndex !== 0) {
        this.focusIndex = focusIndex - 1;
        this.$set(this.code, focusIndex - 1, "");
        return;
      }

      if (/^\d$/.test(value)) {
        this.focusIndex = focusIndex + 1;
      } else {
        this.$set(this.code, focusIndex, "");
      }

      if (focusIndex === 5) {
        this.handleSubmit();
      }
    },
    handleSubmit() {
      const code = this.code.join("");
      authService
        .smsLogin({
          code,
          phone: this.phone
        })
        .then(() => {
          this.$message.success("登录成功");
          window.location.href = "/";
        })
        .catch(() => {
          this.code = this.code.map(() => "");
          this.focusIndex = 0;
        });
    }
  },
  directives: {
    focus: el => {
      const dataIndex = Number(el.getAttribute("data-index"));
      const dataFocusIndex = Number(el.getAttribute("data-focus-index"));
      if (dataIndex === dataFocusIndex) {
        el.focus();
      }
    }
  }
};
</script>

<style type="text/css" lang="less">
.passport-layout-web-reg {
  display: flex;
  height: 100%;
  width: 100%;
  min-height: 605px;
  position: relative;
  .web-reg-left {
    width: 519px;
    position: relative;
    background-image: url("~@/assets/img/login/login-bg-left.svg");
    padding: 0 20px;
    background-size: cover;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .left-title {
      margin: 0 auto;
      width: 349px;
      font-size: 24px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.5;
      letter-spacing: normal;
      color: #8286a7;
      position: relative;
      text-align: left;
    }

    .left-img {
      margin-top: 30px;
      background-image: url("~@/assets/img/feishu/fly-mate.png");
      width: 349px;
      height: 248px;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
  }

  .web-reg-right {
    flex: 1;
    min-width: 635px;
    background: #fff;
    position: relative;
    overflow: hidden;
  }

  .web-main-content {
    width: 498px;
    height: 562px;
    padding-left: 39px;
    padding-right: 39px;
    position: absolute;
    overflow: hidden;
    height: 562px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .flex-column {
    width: 100%;
    height: 100%;
    display: flex;
    flex: 1;
    min-width: 0;
    flex-direction: column;
    padding-bottom: 14px;
    .flex-grow {
      flex-grow: 1;
    }
  }

  .base-back-container {
    height: 60px;
    line-height: 60px;
    .base-back-text {
      display: flex;
      align-items: center;
      font-size: 14px;
      cursor: pointer;
      &:before {
        content: "";
        height: 16px;
        line-height: 16px;
        background-image: url("~@/assets/img/icon/icon-arrow-left.svg");
        background-size: auto 80%;
        background-position: 5%;
        background-repeat: no-repeat;
        padding: 3px 3px 3px 20px;
      }
    }
  }

  .base-title-container {
    margin-bottom: 8px;
    .base-title-title {
      font-size: 28px;
      line-height: 34px;
      font-weight: 600;
      color: #1f2329;
      white-space: pre-wrap;
    }
    .base-title-subtitle {
      font-size: 16px;
      font-weight: 400;
      line-height: 21px;
      color: #646a73;
      min-height: 63px;
      margin-top: 5px;
      white-space: pre-wrap;
    }
  }

  .base-button {
    height: 48px;
    line-height: 48px;
    border-radius: 4px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-sizing: border-box;
    border: 1px solid transparent;
    background-color: #3370ff;
    color: #f7f8fe;
    border-color: #3370ff;
    &.base-button-disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .mobile-input-container {
    position: relative;
    height: 48px;
    font-size: 18px;
    line-height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 1px solid #dee0e3;
    box-sizing: border-box;
    line-height: normal;
    color: #1f2329;
    padding-right: 1px;
    &.on-error {
      border: 1px solid #ff5b4c;
    }
    &:hover {
      border: 1px solid #3370ff;
    }

    input {
      outline: none;
      border: none;
      height: 24px;
      font-size: 18px;
      line-height: normal;
    }

    input:disabled {
      background-color: #fff;
    }

    .mobile-input-code {
      width: 60px;
      text-align: center;
      white-space: nowrap;
      flex: 0 0 60px;
      margin-left: 2px;
    }

    .mobile-input-phone {
      color: #1f2329;
      flex-grow: 1;
      padding: 0 10px;
    }

    .mobile-input-seperator-line {
      height: 26px;
      background-color: #bbbfc4;
      width: 1px;
    }
  }

  .mobile-input-error-msg {
    word-break: break-all;
    margin-top: 6px;
    font-size: 14px;
    color: #ff5b4c;
    line-height: 20px;
  }

  .code-box-container {
    display: flex;
    align-items: center;
    font-size: 18px;
    line-height: 26px;
    color: #1f2329;
    justify-content: space-between;

    .code-input-seg {
      width: 11px;
      height: 1px;
      background: #1f2329;
    }

    .code-box {
      &:first-child {
        .code-box-input {
          border: 1px solid #37f;
        }
      }
    }

    .code-box-input {
      width: 46px;
      height: 46px;
      border-radius: 4px;
      border: 1px solid #c3c6cb;
      outline: none;
      color: #1f2329;
      background-color: transparent;
      font-size: 18px;
      line-height: 26px;
      text-align: center;
      padding: 0;
      -webkit-appearance: none;

      &:focus {
        border: 1px solid #37f;
      }

      &.active {
        border: 1px solid #37f;
      }
    }
  }
  .code-box-count {
    font-size: 16px;
    color: #8f959e;
    margin-top: 12px;
    color: #8f959e;
    line-height: 20px;
  }
  .code-box-resend {
    font-size: 16px;
    margin-top: 12px;
    color: #3370ff;
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;
    transition: color 0.2s;
    font-weight: 500;
  }
}

@media (max-width: 1024px) {
  .passport-layout-web-reg {
    .web-reg-left {
      display: none;
    }
  }
}
</style>
