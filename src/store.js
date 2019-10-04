import Vue from 'vue'
import Vuex from 'vuex'
import httpClient from '@/services/http-client.js'
import socket from '@/services/socket.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        devEui: "",
        deviceId: "",
        apiKey: "",
        device: {},
        isConnected: false,
        fullState: {},
        sensors: {},
    },
    mutations: {
        setState(state, { key, value }) {
            //if(state.form[key]){
            state[key] = value;
            //}
        }
    },
    actions: {
        login({ state, commit, dispatch }) {
            return httpClient.post('/Devices/authenticate', {
                    deviceId: state.deviceId,
                    apiKey: state.apiKey
                })
                .then(function(response) {
                    const device = response.device;
                    commit("setState", { key: "device", value: device });
                    commit("setState", { key: "devEui", value: device.devEui });
                    commit("setState", { key: "isConnected", value: true });
                    dispatch('initSocket');
                })
                .catch(function(error) {
                    console.log(error);
                })
        },
        getFullState({ state, commit }) {
            return httpClient.get(`/Devices/get-full-state/${state.deviceId}`, {
                    headers: {
                        devEui: state.devEui,
                        apiKey: state.apiKey
                    }
                })
                .then(function(response) {
                    const fullState = response;
                    commit("setState", { key: "fullState", value: fullState });
                    commit("setState", { key: "sensors", value: fullState.sensors });
                })
                .catch(function(error) {
                    console.log(error);
                })
        },
        initSocket() {
            socket.initSocket();
        },
        /**
         * Sync router for auth
         */
        syncRouter({ state, dispatch }, router) {
            router.beforeEach((to, from, next) => {
                if (to.matched.some(record => record.meta.requiresAuth)) {
                    if (to.name === "device") {
                        if (state.isConnected) {
                            next();
                        } else {
                            next({
                                name: 'home'
                            });
                        }
                    }
                } else {
                    next();
                }
            });
        }
    }
});