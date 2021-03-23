<template>
  <div class="MyMenuItem">
    <el-submenu
      :index="data.id"
      :key="data.id"
      v-if="data.children && data.children.length > 0"
    >
      <template #title>
        <span>{{ data.title }}</span>
      </template>
      <template v-for="item in data.children">
        <template v-if="item.children && item.children.length > 0">
          <my-menu-item :data="item" :key="item.id" />
        </template>
        <el-menu-item v-else :index="item.path" :key="item.id">
          {{ item.title }}
        </el-menu-item>
      </template>
    </el-submenu>
    <el-menu-item v-else :index="data.path" :key="data.id">
      {{ data.title }}
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: 'BaseMenuItem',
  props: {
    data: Object
  }
}
</script>
