<template>
  <div
    class="block-header block-header-default w-100 bg-white-95 shadow-lg d-flex justify-content-between"
    style="min-height: 70px; height: 70px;"
  >
    <div>
      <b-btn :to="{ name: 'add' }" variant="primary">
        <font-awesome-icon icon="plus" class="mr-2" />
        Add Something
      </b-btn>
    </div>
    <router-link :to="{ name: 'hash' }" tag="h3" class="p-0 m-0 cursor">
      <img
        class="img-avatar img-avatar32"
        :src="require('@/assets/img/telos.png')"
        alt="Telos Logo"
      />
      <span class="font-size-sm font-w700 ml-2 text-uppercase">
        # Hash It
      </span>
    </router-link>
    <div class="block-options">
      <b-btn variant="dual" class="d-none">
        <font-awesome-icon icon="cog" />
      </b-btn>
      <b-btn v-if="isAuthenticated" @click="loginAction()" variant="dual">
        <div class="d-flex align-items-center">
          <span>{{ isAuthenticated }}</span>
          <font-awesome-icon icon="power-off" fixed-width class="ml-2" />
        </div>
      </b-btn>
      <b-btn v-else @click="loginAction()" variant="dual">
        <div class="d-flex align-items-center">
          <span>Login</span>
          <font-awesome-icon icon="sign-in-alt" fixed-width class="ml-2" />
        </div>
      </b-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { vxm } from '@/store'
import * as scatter from '@/api/scatter'

@Component
export default class ChatHeader extends Vue {
  // data

  // computed
  get isAuthenticated() {
    const account = vxm.eosTransit.accountInfo
    if (account) return account.name
    else return false
  }

  // methods
  async loginAction() {
    if (!this.isAuthenticated) {
      this.$bvModal.show('modal-login')
    } else {
      vxm.eosTransit.logout()
    }
  }

  // Lifecycle hooks
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>

<style lang="scss" scoped></style>
