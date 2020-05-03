<template>
  <div class="row text-left">
    <div class="col">
      <b-button
        :class="visible ? null : 'collapsed'"
        :aria-expanded="visible ? 'true' : 'false'"
        aria-controls="collapse-4"
        variant="light"
        @click="visible = !visible"
        >Categories</b-button
      >
      <b-collapse id="collapse-4" v-model="visible" class="mt-2">
        <b-list-group>
          <router-link
            v-for="(item, index) in getCategoryMenu"
            :key="index"
            :to="{
              path: 'subCategory',
              query: { id: item._id, name: item.name }
            }"
          >
            <b-list-group-item>{{ item.name }}</b-list-group-item>
          </router-link>
        </b-list-group>
      </b-collapse>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      visible: true
    }
  },
  computed: {
    ...mapGetters({ getCategoryMenu: 'getCategoryMenu' })
  }
}
</script>
