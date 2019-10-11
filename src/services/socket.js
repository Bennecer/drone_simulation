import mqtt from 'mqtt';
import Vue from 'vue';

const Storage = window.sessionStorage;

const brokerUrl = "ws://10.28.72.2:3000";
const baseOptions = {
    //  keepalive: 60,
    // reschedulePings: true,
    protocolId: 'MQTT',
    protocolVersion: 4,
    reconnectPeriod: 3000,
    connectTimeout: 30 * 1000,
    clean: true,
    clientId: "01bddba130a3d4f5de5cb6bef0bf9a28",
    username: "5d8cebda40334e40a2b8ceb6",
    password: "76c8803153e6eeb6edae61d182460f6de8486d8c",
};

const socket = {};


socket.eventBus = new Vue();

const setSocketId = socketId => {
    if (Storage) {
        Storage.setItem('socket-id', socketId);
    }
};

const delSocketId = () => {
    if (Storage) {
        Storage.removeItem('socket-id');
    }
};

const getSocketId = () => {
    const socketId = Storage && Storage.getItem('socket-id');
    return socketId;
};

socket.setToken = token => {
    try {
        logger.publish(3, 'socket', 'setToken:req', token);
        socket.token = token;
        const options = {
            ...baseOptions,
            clientId: `${token.userId.toString()}-${Math.random()
        .toString(16)
        .substr(2, 8)}`,
            username: token.userId.toString(),
            password: token.id.toString(),
        };

        socket.initSocket(options);
    } catch (error) {
        logger.publish(3, 'socket', 'setToken:err', error);
    }
};

socket.removeToken = () => {
    try {
        logger.publish(3, 'socket', 'removeToken:req', socket.token);
        delSocketId();
        delete socket.token;
        if (socket.client) {
            PubSub.removeListeners(socket.client);
            socket.client.end();
        }
        logger.publish(3, 'socket', 'removeToken:res', 'success');
        // return;
    } catch (error) {
        logger.publish(3, 'socket', 'removeToken:err', error);
        // throw error;
    }
};

socket.initSocket = () => {
    try {
        // logger.publish(3, 'socket', 'initSocket:req', options);

        let socketId = getSocketId();
        if (socketId && socketId !== null && socket.client) {
            return socket;
        }
        // socket.client = mqtt.connect(brokerUrl, baseOptions);
        // // logger.publish(3, 'socket', 'onConnect', 'success');

        socket.client = mqtt.connect(brokerUrl, baseOptions);
        socket.client.on('connect', state => {
            // logger.publish(3, 'socket', 'onConnect', state);
            console.log("Is connected", state);
            setSocketId(baseOptions.clientId);
            socket.subscribe();
            socket.publish();
            socket.eventBus.$emit('socketConnect', true);
        });
        console.log(baseOptions)
        setSocketId(baseOptions.clientId);
        // await PubSub.setListeners(socket.client, socket.token);

        socket.client.on('offline', () => {
            // logger.publish(3, 'socket', 'onDisconnect', '');
            console.log("Is offline");
            delSocketId();
            socket.eventBus.$emit('socketConnect', false);
        });


        function onMessage(message) {
            console.log(message);
        }
        socket.client.on('message', onMessage);

        return socket;
    } catch (error) {
        // logger.publish(3, 'socket', 'initSocket:err', error);
        throw error;
    }
};

socket.subscribe = () => {
    if (socket.client) {
        socket.client.subscribe(`${baseOptions.clientId}-in/#`, (error) => {
            if (error) {
                console.log(error);
            }
        })
    }
};

socket.publish = () => {
    if (socket.client) {
        socket.client.publish(`${baseOptions.clientId}-out/0/3336/0/1/5514`, 'locationSensor')
        socket.client.publish(`${baseOptions.clientId}-out/0/3342/0/2/5500`, 'switchSensor')
    }
}

export default socket;