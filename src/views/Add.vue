<template>
  <add-hash />
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AddHash from '@/components/modals/AddHash.vue'
@Component({
  components: { AddHash }
})
export default class Add extends Vue {
  created() {}
}
</script>
<style lang="scss" scoped></style>
