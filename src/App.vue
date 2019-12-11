<template>
  <div id="page-container">
    <!-- Main Container -->
    <main id="main-container">
      <div
        class="block hero flex-column mb-0 bg-image"
        :style="
          'background-image: url(' +
            require('@/assets/photos/photo22@2x.jpg') +
            ');'
        "
      >
        <!-- Chat Header -->
        <chat-header />
        <!-- END Chat Header -->
        <div
          id="messages-chat"
          ref="messagesChat"
          class="block-content block-content-full text-wrap-break-word overflow-y-auto w-100 flex-grow-1 px-lg-8 px-xlg-10 bg-white-90"
        >
          <div class="block block-rounded block-bordered">
            <div class="block-content">
              <router-view />
            </div>
          </div>
        </div>
      </div>
    </main>
    <!-- END Main Container -->
    <modal-login />
  </div>
  <!-- END Page Container -->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ModalLogin from '@/components/modals/ModalLogin.vue'
import { vxm } from '@/store/'
import ChatHeader from '@/components/layout/ChatHeader.vue'

@Component({
  components: {
    ChatHeader,
    ModalLogin
  }
})
export default class App extends Vue {
  get sidebarOpen() {
    return vxm.core.sidebarOpen
  }

  created() {
    const autoLogin = localStorage.getItem('autoLogin')
    if (autoLogin) {
      vxm.eosTransit.initScatter()
    }
    vxm.core.setLanguage()
  }
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
