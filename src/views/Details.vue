<template>
  <div>
    <h3 class="text-center text-muted text-uppercase mb-2">Hash #</h3>
    <h5 class="text-center pb-3">{{ hash }}</h5>
    <table v-if="!loading" class="table table-striped table-hover table-vcenter">
      <thead>
        <tr>
          <th colspan="2">Hash # Item</th>
          <th class="text-center">From</th>
          <th class="text-right">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="hash in items" :key="hash.id">
          <td class="text-center">
            {{ hash.id }}
          </td>
          <td>
            <span class="font-w600">
              {{ hash.content }}
            </span>
          </td>
          <td class="text-center">
            {{ hash.username }}
          </td>
          <td class="font-size-sm text-right">
            {{ hash.created_at }}
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="d-flex justify-content-center align-items-center p-5">
      <div class="text-center">
        <font-awesome-icon icon="spinner" spin size="2x" class="mb-3"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { vxm } from '@/store'
import * as scatter from '@/api/scatter'

@Component
export default class Details extends Vue {
  @Prop() hash!: string

  items: any[] = []
  loading = false

  async getHashes() {
    const hash = await scatter.rpc.get_table_rows({
      code: vxm.core.chainInfo.contract,
      table: 'hashes',
      scope: vxm.core.chainInfo.contract,
      limit: 500
    })
    const hashInt = hash.rows.find((hash: any) => hash.hash === this.hash)
    console.log(hashInt)
    if (hashInt) {
      const items = await scatter.rpc.get_table_rows({
        code: vxm.core.chainInfo.contract,
        table: 'items',
        scope: hashInt.hashInt,
        limit: 500
      })
      this.items = items.rows.reverse()
    }
    return
  }

  async created() {
    this.loading = true
    await this.getHashes()
    // @ts-ignore
    this.$options.interval = setInterval(await this.getHashes(), 1000)
    this.loading = false
  }

  beforeDestroy() {
    // @ts-ignore
    clearInterval(this.$options.interval)
  }
}
</script>
<style lang="scss" scoped></style>
