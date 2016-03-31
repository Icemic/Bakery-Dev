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
    },
    
    getUpdate(gameid, updateid) {
        return API.getJSON(API.Dev.update, {gameid: gameid, updateid: updateid})
        .then((json) => {
            return new Promise((resolve, reject) => {
                if (json.success)
                    resolve(json);
                else
                    reject(json.msg)
            })
        })
    },
    
    /**
     * 添加新的更新
     * 需要 gameid
     */
    postUpdate(json) {
        return API.postJSON(API.Dev.update, json)
        .then((json) => {
            return new Promise((resolve, reject) => {
                if (json.success)
                    resolve(json);
                else
                    reject(json.msg)
            })
        })
    },
    
    /**
     * 修改更新设置和启用/禁用更新
     * 需要 gameid 和 updateid
     */
    patchUpdate(json) {
        return API.patchJSON(API.Dev.update, json)
        .then((json) => {
            return new Promise((resolve, reject) => {
                if (json.success)
                    resolve(json);
                else
                    reject(json.msg)
            })
        })
    },
    
    /**
     * 证书签名相关
     */
    postSign(gameid) {
        return API.postJSON(API.Dev.sign, {gameid: gameid})
        .then((json) => {
            return new Promise((resolve, reject) => {
                if (json.success)
                    resolve(json);
                else
                    reject(json.msg);
            })
        })
    },
    postDebugSign(gameid) {
        return API.postJSON(API.Dev.debugsign, {gameid: gameid})
        .then((json) => {
            return new Promise((resolve, reject) => {
                if (json.success)
                    resolve(json);
                else
                    reject(json.msg);
            })
        })
    }
}

export default Dev;