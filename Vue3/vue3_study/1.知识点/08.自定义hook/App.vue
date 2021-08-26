<template>
  <div></div>
  <h3>点击坐标 x: {{ x }} y: {{ y }}</h3>
  <hr />
  <!-- 请求对象数据 -->
  <h3>请求对象数据</h3>
  <h3 v-if="loading">加载中....</h3>
  <h3 v-else-if="errorMsg">错误信息：{{ errorMsg }}</h3>
  <ul v-else>
    <li>id: {{ data.id }}</li>
    <li>address: {{ data.address }}</li>
    <li>distance: {{ data.distance }}</li>
  </ul>
  <hr />
  <!-- 请求数组数据 -->
  <h3>请求数组数据</h3>
  <h3 v-if="loading">加载中....</h3>
  <h3 v-else-if="errorMsg">错误信息：{{ errorMsg }}</h3>
  <ul v-else v-for="item in data" :key="item.id">
    <li>id: {{ item.id }}</li>
    <li>title: {{ item.title }}</li>
    <li>price: {{ item.price }}</li>
  </ul>
  <hr />
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import useMousePosition from "./hooks/useMousePosition";
import useRequest from "./hooks/useRequest";

// 定义接口，约束对象类型
interface IAddress {
  id: number;
  address: string;
  distance: string;
}
interface IProduct {
  id: string;
  title: string;
  price: number;
}

export default defineComponent({
  name: "App",
  setup() {
    // 点击位置
    const { x, y } = useMousePosition();

    // 发送请求
    // const { loading, data, errorMsg } = useRequest<IAddress>("/address.json"); // 获取对象数据
    const { loading, data, errorMsg } = useRequest<IProduct[]>("/products.json"); // 获取数组数据

    // 附加问题 - 监视 data
    watch(data, () => {
      if (data.value) {
        console.log(data.value.length);
      }
    });

    return {
      x,
      y,
      loading,
      data,
      errorMsg,
    };
  },
});
</script>