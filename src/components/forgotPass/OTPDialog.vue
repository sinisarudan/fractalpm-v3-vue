<script setup>
import { ref, onMounted } from 'vue';
import { useUsersStore } from '@/stores/users';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();

// import Person from '@/models/users/Person';
// import { useRouter } from 'vue-router';
// import Notification from '@/models/notifications/Notification';
// import { useNotificationsStore } from '@/stores/notifications';
// import { NotifLevel } from '@/models/notifications/NotifLevel';

const usersStore = useUsersStore();
// const notificationsStore = useNotificationsStore();
// const router = useRouter();

const props = defineProps({
  forgotRecoveryEmailPhone: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['verified']);

const form = ref();

/**
 * @type {import('vue').Ref<boolean>}
 */
const valid = ref(false);

/**
 * @type {import('vue').Ref<string>}
 */
const error = ref();

/**
 * @type {import('vue').Ref<string>}
 */
const status = ref();

onMounted(() => {
//   watch(forgotRecoveryEmailPhone, validateForm);
});

const next = async () => {
  emit('verified');
};

const otpArray = ref(Array(4).fill(''));

const checkCodeValidity = async (code) => {
  valid.value = await usersStore.checkCodeValidity(code);
  if (valid.value) {
    otpArray.value = Array(4).fill('✓');
    status.value = i18n.t('signup.successVerification');
    setTimeout(next, 1000);
  } else {
    error.value = i18n.t('errors.codeNotValid');
  }
};

const handlePaste = (event) => {
  event.preventDefault();

  /**
   * @type {string}
   */
  const pastedText = event.clipboardData.getData('text');
  // Assuming pastedText is a string of four digits
  if (/^\d{4}$/.test(pastedText)) {
    error.value = undefined;
    otpArray.value = pastedText.split('');
    checkCodeValidity(pastedText);
  } else {
    error.value = i18n.t('errors.incorrectFormat') + ' ' + i18n.t('login.fourDigitCode');
  }
};

const otpInputs = ref();

const focusNextInput = () => {
  const currentIndex = otpArray.value.findIndex((digit) => digit === '');
  if (currentIndex !== -1) {
    otpInputs.value[currentIndex].focus();
  }
};

const handleDigitChange = (index, $event) => {
  console.log('handleDigitChange', index, otpArray.value);
  const code = otpArray.value.join('');
  if (/^\d{4}$/.test(code)) {
    error.value = undefined;
    checkCodeValidity(code);
  } else {
    focusNextInput();
  }
};

const resendCode = async () => {
  console.log('resendCode');
  const result = await usersStore.sendOTPCode(props.forgotRecoveryEmailPhone);
  if (result) {
    error.value = undefined;
    status.value = 'Code sent'; setTimeout(() => { status.value = undefined; }, 2000);
  } else {
    error.value = i18n.t('errors.sendCode');
  }
};
</script>

<template>
  <v-card
    class="otp-code"
    @paste="handlePaste($event)"
  >
    <v-card-title class="on-background-darken-1">
      {{ $t('login.enterCode') }}
    </v-card-title>
    <div class="hint on-background-lighten-1">
      {{ $t('login.pasteCode') }}
    </div>
    <v-form
      ref="form"
      class="form"
    >
      <div
        v-for="(digit, index) in otpArray"
        :key="index"
        class="otp-digit"
      >
        <v-text-field
          ref="otpInputs"
          v-model="otpArray[index]"
          class="otp-input"
          maxlength="1"
          placeholder="0"
          @paste="handlePaste($event)"
          @update:model-value="handleDigitChange(index, $event)"
        />
      </div>
    </v-form>
    <div
      v-if="error"
      class="text-error"
    >
      <v-icon color="red">
        mdi-alert-circle
      </v-icon>{{ error }}
    </div>
    <div
      v-if="status"
      class="status"
    >
      <v-icon color="green">
        mdi-checkbox-marked-circle
      </v-icon>{{ status }}
    </div>
    <div class="txt-center on-background-lighten-1">
      {{ $t('login.notGettingLink') }} <a
        href="void:"
        @click.prevent="resendCode"
      >{{ $t('login.resendCode') }}</a>
    </div>
    <div class="forgot-pass-link" />
    <v-card-actions>
      <!-- <v-spacer></v-spacer> -->
      <v-btn
        class="primary-button"
        block
        variant="flat"
        :disabled="!valid"
        @click="next"
      >
        {{ $t('common.continue') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style lang="scss" scoped>
.otp-code {
    padding: 35px;
    text-align: center;
    align-items: center;
    .hint {
      text-align: center;
      font-size: 12px;
      color: gray;
      padding: 3px;
    }
    // .error {
    //   color: red;
    //   font-size: 12px;
    // }
    .status {
      color: darkgreen;
      font-size: 12px;
    }
    .form {
      margin: 24px;
      // max-height: 350px;
      // overflow-y: scroll;
      .tf-label{
        text-align: left;
      }
      .txt-center{
        text-align: center;
      }
      .otp-digit {
        display: inline-block;
        margin: 0 14px;
        border-radius: 6px;
        .otp-input {
          text-align: center;
          // min-width: 32px;
        }
      }
    }
}
// .actions {
//   padding: 5px;
//   margin: auto;
// }
</style>
<style lang="scss">
.otp-code {
  .v-card-title {
  //styleName: Hero/XS;
  font-family: Manrope;
  font-size: 24px;
  font-weight: 800;
  line-height: 48px;
  letter-spacing: 0.30000001192092896px;
  text-align: left;
}
.v-field__input {
  border: 1px solid rgb(var(--v-theme-on-background-darken-1)) !important;
  border-radius: 6px !important;
}
}
</style>
