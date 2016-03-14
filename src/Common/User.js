import API from '../Common/API';
import {sha256} from 'js-sha256';

let Data = {
    
}

const User = {
    load() {
        return API.getJSON(API.Dev.config)
        .then((data) => {
            Data.email = data.email;
            Data.nickname = data.nickname;
            Data.name = data.name;
            Data.alias = data.alias;
            return new Promise((resolve, reject) => {
                resolve();
            })
        })
    },
    getConfig() {
        return Data;
    },
    patchConfig(json) {
        json.password = sha256(json.password || "");
        return API.patchJSON(API.Dev.config, json)
        .then((data) => {
            if (data.success) {
                Data.email = data.email;
                Data.nickname = data.nickname;
                Data.name = data.name;
                Data.alias = data.alias;
            }
            return new Promise((resolve, reject) => {
                resolve(data);
            })
        })
    }
}

export default User;