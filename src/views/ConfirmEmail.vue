<script setup>
import { ref, onMounted, computed } from 'vue';
import { useDisplay } from 'vuetify';
import AppLayoutWithIntro from '@/components/AppLayoutWithIntro.vue';
import SetNewPassword from '@/components/forgotPass/SetNewPassword.vue';
import Person from '@/models/users/Person';
import { useUsersStore } from '@/stores/users';
// import { useRouter } from 'vue-router';
// import Notification from '@/models/notifications/Notification';
import { useNotificationsStore } from '@/stores/notifications';
import { NotifLevel } from '@/models/notifications/NotifLevel';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();

const usersStore = useUsersStore();
const notificationsStore = useNotificationsStore();
// const router = useRouter();

const { mobile } = useDisplay();

const props = defineProps({
  uid: {
    type: String,
    default: ''
  },
  token: {
    type: String,
    default: ''
  }
});

/**
 * @type {import('vue').Ref<string>}
 */
const confirmState = ref('');

/**
 * @type {import('vue').Ref<Person>}
 */
const user = ref(Person.PersonInit);

onMounted(async () => {
  console.log('mobile.value', mobile.value);
  user.value = await usersStore.confirmEmail(props.uid, props.token);
  if (user.value) {
    confirmState.value = 'confirmed';
  } else {
    notificationsStore.add({ title: i18n.t('signup.confirmationError'), level: NotifLevel.ERROR });
    confirmState.value = 'failed';
  }
});

const resend = () => {
  notificationsStore.add({ title: 'To be developed', level: NotifLevel.INFO });
};

/**
 * @type {import('vue').Ref<(boolean)>}
 */
const setNewPasswordShow = computed(
  () =>
    confirmState.value === 'confirmed' && confirmState.value !== 'set-password-failed'
);

/**
   * checks the validity of a code for a given phone number or email address.
   *
   * @param {string} password - The token to be validated.
   */
const passwordChanged = async (password) => {
  user.value = await usersStore.confirmEmail(props.uid, props.token, password);
  if (user.value) {
    confirmState.value = 'changed';
  } else {
    notificationsStore.add({ title: i18n.t('signup.confirmationError'), level: NotifLevel.ERROR });
    confirmState.value = 'set-password-failed';
  }
  // console.log("password", password);
};

</script>

<template>
  <AppLayoutWithIntro>
    <div class="confirm-email">
      <div><h1>{{ $t("login.welcome") }}</h1></div>
      <div>
        <div v-if="confirmState==='failed' || confirmState === 'set-password-failed'">
          <h2 v-if="confirmState==='failed'">
            {{ $t('login.emailNotConfirmed') }}
          </h2>
          <h2 v-else-if="confirmState==='set-password-failed'">
            {{ $t('login.passSetFailure') }}
          </h2>
          <v-btn
            block
            @click="resend"
          >
            {{ $t('login.resendConfirmation') }}
          </v-btn>
        </div>
        <div v-else-if="confirmState==='confirmed'">
          <h2>{{ $t('common.congratulations') }} {{ $t('login.emailConfirmed') }}</h2>
        </div>
        <div v-else-if="confirmState==='changed'">
          <h2>{{ $t('common.congratulations') }} {{ $t('login.passSetSuccess') }}</h2>
        </div>
        <div v-else>
          <h2>{{ $t('login.emailBeingConfirmed') }}</h2>
        </div>
      </div>
    </div>
  </AppLayoutWithIntro>
  <v-dialog
    v-model="setNewPasswordShow"
    persistent
    :fullscreen="mobile"
    :max-width="mobile ? 'none' : '400px'"
    data-testid="set-new-password-dialog"
  >
    <SetNewPassword
      @password-changed="passwordChanged"
    />
    <!-- <v-btn
      size="xs"
      color="transparent"
      variant="flat"
      icon
      class="close-button"
      @click="hideAllDialogs();"
    >
      <v-icon color="white">
        mdi-close
      </v-icon>
    </v-btn> -->
  </v-dialog>
</template>

<style lang="scss">
@import "../variables";
.confirm-email {
  min-width: 440px;
  // padding: 15px;
  // overflow: scroll;
  // text-align: left;
  // // height: 100%;
  .close-button {
    position: absolute;
    top: -30px;
    right:0px;
    // margin: 30px;
}
  h1 {
    //styleName: Hero/S;
    font-family: Manrope;
    font-size: 32px;
    font-weight: 800;
    line-height: 48px;
    letter-spacing: 0.30000001192092896px;
    text-align: left;
    // color: $main-color;
  }
  h2 {
    //styleName: UI/Text/M/Regular;
    font-family: Inter;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: left;
    color: $secondary-color;
  }
  .form {
    margin-top: 24px;
    // max-height: 350px;
    // overflow-y: scroll;
  }
}
.actions {
  // padding: 5px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  text-align: left;
  // color: $main-color;
  .agree {
    font-family: Inter;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.10000000149011612px;
    text-align: left;
  }
}
</style>
<style lang="scss" scoped>
  @import "../variables";
</style>
