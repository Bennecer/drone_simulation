<template>
  <v-card>
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title class="headline">{{ sensor.name }}</v-card-title>
        <v-card-text>
          <div class="text--primary">Type : {{ sensor.type }}</div>
        </v-card-text>
      </div>
      <div class="d-flex flex-column justify-center">
        <v-btn class="ma-2" color="primary">
          <v-icon left>mdi-arrow-up</v-icon>Up
        </v-btn>
        <v-btn class="ma-2" color="error">
          <v-icon left>mdi-arrow-down</v-icon>Down
        </v-btn>
      </div>
      <v-avatar class="ma-3" size="125" tile>
        <v-img>
          <img :src="iconLink" />
        </v-img>
      </v-avatar>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "SensorAltitude",
  props: {
    sensor: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      iconLink: ""
    };
  },
  components: {},
  methods: {},
  mounted() {
    console.log(this.sensor);
    this.iconLink = "https://aloes.io" + this.sensor.icons[0];

    /*this.$store.dispatch("getFullState").then(res => {
        console.log(this.sensor);
      });*/
  }
};
</script>
<style scoped lang="scss">
</style>