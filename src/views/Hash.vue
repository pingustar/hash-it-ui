<template>
  <messages />
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import Messages from '@/components/layout/Messages.vue'
import ChatHeader from '@/components/layout/ChatHeader.vue'
import { vxm } from '@/store'
@Component({
  components: { ChatHeader, Messages }
})
export default class Hash extends Vue {
  created() {}
}
</script>
<style lang="scss" scoped></style>
