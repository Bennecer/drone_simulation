<template>
  <div class="deviceItem">
    <ul>
        <li>Name : {{ sensor.name }}</li>
        <li>Type : {{ sensor.type }}</li>
        <li class="iconLi">
          <img :src="iconLink"/>
        </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'SensorAltitude',
  props: {
    sensor: {
      type: Object,
      require: true
    }
  },
  data(){
    return{
      iconLink: "",
    }
  },
  components: {
  },
  methods: {
  },
  mounted(){
    console.log(this.sensor);
    this.iconLink = "https://aloes.io" + this.sensor.icons[0];
  }
};
</script>
<style scoped lang="scss">
  ul{
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
    li{
      list-style-type: none;
      text-align: left;
    }
    .iconLi{
      text-align: center;
      img{
        max-width: 200px;
        max-height: 200px;
      }
    }
  }
</style>