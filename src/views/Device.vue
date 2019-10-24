<template>
  <v-app class="device">
    <div>
      <v-app-bar color="indigo accent" dark>
        <v-toolbar-title>DRONE SIMULATION - Devices</v-toolbar-title>
        <v-spacer></v-spacer>
        <h3 v-if="isConnected">I'm connected !</h3>
        <h3 v-else>I'm not connected</h3>
      </v-app-bar>
    </div>
    <div>
      <v-container>
        <v-row dense>
          <v-col cols="12" :key="device.id" v-for="device in sensors">
            <Sensor :sensor="device" />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>
<script>
import dataDevice from "@/assets/dataDevice.json";
import socket from "@/services/socket.js";
import Sensor from "../components/Sensor";

export default {
  components: {
    Sensor
  },
  data() {
    return {
      dataDevice,
      isConnected: false,
      sensors: {}
    };
  },
  mounted() {
    socket.eventBus.$on("socketConnect", async state => {
      if (state) {
        this.isConnected = true;
        this.$store.dispatch("getFullState").then(res => {
          this.sensors = this.$store.state.sensors;
        });
      } else {
        this.isConnected = true;
      }
    });
  }
};
</script>
<style scoped lang="scss">
</style>