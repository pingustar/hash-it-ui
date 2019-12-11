<template>
  <b-modal id="modal-login" size="lg" centered hide-footer>
    <template slot="modal-title">
      Select Wallet Provider
    </template>
    <b-row class="mt-4">
      <b-col cols="12" class="mb-3">
        <h3 class="text-center">Network: Telos Testnet</h3>
      </b-col>
      <template v-if="!loading">
        <b-col cols="6" class="text-center">
          <img
            @click="initLogin('sqrl')"
            class="img-avatar img-avatar-thumb cursor mt-3 mb-2"
            :src="require('@/assets/img/sqrl.png')"
            alt="Provider Logo"
          />
          <h3 @click="initLogin('sqrl')" class="cursor mb-4">
            Sqrl
          </h3>
        </b-col>
        <b-col cols="6" class="text-center">
          <img
            @click="initLogin('scatter')"
            class="img-avatar img-avatar-thumb cursor mt-3 mb-2"
            :src="require('@/assets/img/scatter.svg')"
            alt="Provider Logo"
          />
          <h3 @click="initLogin('scatter')" class="cursor mb-1">
            Scatter
          </h3>
        </b-col>
      </template>
      <template v-else>
        <b-col cols="12">
          <div class="d-flex justify-content-center align-items-center">
            <img
              v-if="wallet === 'scatter'"
              class="img-avatar img-avatar-thumb"
              :src="require('@/assets/img/scatter.svg')"
              alt="Provider Logo"
            />
            <img
              v-if="wallet === 'sqrl'"
              class="img-avatar img-avatar-thumb"
              :src="require('@/assets/img/sqrl.png')"
              alt="Provider Logo"
            />
            <h2 class="m-0 p-0 ml-3 text-capitalize">
              {{ wallet }}
            </h2>
          </div>
          <h5 class="d-flex align-items-center justify-content-center mb-4 mt-3">
            <font-awesome-icon icon="spinner" spin fixed-width class="mr-2" />
            <span>connecting to wallet ...</span>
          </h5>
        </b-col>
      </template>
      <b-col cols="12" class="text-center">
        <b-alert
          :show="error"
          variant="danger"
          dismissible
          @dismissed="error = false"
        >
          {{ error }}
        </b-alert>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { vxm } from '@/store'

@Component
export default class ModalLogin extends Vue {
  // data
  loading = false
  wallet = ''
  error: any = false

  // computed

  // methods
  async initLogin(wallet: string) {
    this.wallet = wallet
    this.loading = true
    this.error = false
    try {
      await vxm.eosTransit.initScatter()
      this.$bvModal.hide('modal-login')
    } catch (e) {
      if (typeof e === 'string') this.error = e
      else this.error = e.message
      console.log(e)
    } finally {
      this.loading = false
      this.wallet = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.img-avatar-thumb {
  margin: 0.25rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  -webkit-box-shadow: 0 0 0 0.25rem hsla(0, 0%, 100%, 0.3);
  box-shadow: 0 0 0 0.25rem hsla(0, 0%, 100%, 0.3);
}
.img-avatar {
  display: inline-block !important;
  width: 64px;
  height: 64px;
  border-radius: 50%;
}
</style>
