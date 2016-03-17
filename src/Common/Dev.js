import API from '../Common/API';

let Data = {
    
};

const Dev = {
    getGames() {
        return API.getJSON(API.Dev.games)
        .then((json) => {
            return new Promise((resolve, reject) => {
                if (json.success)
                    resolve(json.games);
                else
                    reject(json.msg);
            })
        })
    },
    
    getGame(id) {
        return API.getJSON(API.Dev.game, { id: id})
        .then((json) => {
            return new Promise((resolve, reject) => {
                if (json.success)
                    resolve(json.game);
                else
                    reject(json.msg)
            })
        })
    },
    
    postGame(json) {
        return API.postJSON(API.Dev.game, json)
        .then((json) => {
            return new Promise((resolve, reject) => {
                if (json.success)
                    resolve(json);
                else
                    reject(json.msg)
            })
        })
    },
    
    patchGame(json) {
        return API.patchJSON(API.Dev.game, json)
        .then((json) => {
            return new Promise((resolve, reject) => {
                if (json.success)
                    resolve(json);
                else
                    reject(json.msg)
            })
        })
    },
    
    getUpdates(gameid) {
        return API.getJSON(API.Dev.updates, {gameid: gameid})
        .then((json) => {
            return new Promise((resolve, reject) => {
                if (json.success)
                    resolve(json);
                else
                    reject(json.msg)
            })
        })
    }
    
}

export default Dev;