import API from '../Common/API';

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
        })
    },
    getConfig() {
        return Data;
    },
    patchConfig(json) {
        return API.patchJSON(API.Dev.config, json)
        .then((data) => {
            if (data.success) {
                Data.email = data.email;
                Data.nickname = data.nickname;
                Data.name = data.name;
                Data.alias = data.alias;
            }
            return data
        })
    }
}

export default User;