<script setup>
import { ref, onMounted } from 'vue';
import { useUsersStore } from '@/stores/users';

// import Person from '@/models/users/Person';
// import { useRouter } from 'vue-router';
// import Notification from '@/models/notifications/Notification';
// import { useNotificationsStore } from '@/stores/notifications';
// import { NotifLevel } from '@/models/notifications/NotifLevel';

const usersStore = useUsersStore();
// const notificationsStore = useNotificationsStore();
// const router = useRouter();

const props = defineProps(['forgotRecoveryEmailPhone']);

const emit = defineEmits(['verified']);

const form = ref();

// const emailRules = ref([
//   (v) => (v && v.length > 0) || 'E-mail is required',
//   (v) => (v && v.length <= EMailMaxLength) || `Maximum ${EMailMaxLength} characters`,
//   (v) =>
//     !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(v) || 'E-mail must be valid'
// ]);

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
    status.value = 'Successful Verification';
    setTimeout(next, 1000);
  } else {
    error.value = 'The code is not valid';
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
    error.value = 'Incorrect format. A 4-digit code is expected.';
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
    error.value = 'Unable to send code';
  }
};
</script>

<template>
    <v-card class="otp-code" @paste="handlePaste($event)">
        <v-card-title class="text-h5">Enter the code</v-card-title>
        <div class="hint">You can simply paste the 4-digits code</div>
        <v-form class="form" ref="form">
          <div v-for="(digit, index) in otpArray" :key="index" class="otp-digit">
            <v-text-field class="otp-input"
              v-model="otpArray[index]"
              @paste="handlePaste($event)"
              @input="handleDigitChange(index, $event)"
              maxlength="1"
              ref="otpInputs"
              placeholder="0"
            />
          </div>
        </v-form>
        <div v-if="error" class = "error"><v-icon color="red">mdi-alert-circle</v-icon>{{ error }}</div>
        <div v-if="status" class = "status"><v-icon color="green">mdi-checkbox-marked-circle</v-icon>{{ status }}</div>
        <div class="txt-center">Didn’t get a link? <a href="void:" @click.prevent="resendCode">Resend code</a></div>
        <div class="forgot-pass-link"></div>
        <v-card-actions>
        <!-- <v-spacer></v-spacer> -->
        <v-btn class="primary-button" block variant="flat" :disabled="!valid" @click="next">Continue</v-btn>
        </v-card-actions>
    </v-card>
</template>

<style lang="scss" scoped>
.otp-code {
    padding: 35px;
    .hint {
      text-align: center;
      font-size: 12px;
      color: gray;
      padding: 3px;
    }
    .error {
      color: red;
      font-size: 12px;
    }
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
