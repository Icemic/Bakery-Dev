import API from '../Common/API';

let Data = {
    
};

const Admin = {
    getSignList() {
        return API.getJSON(API.Dev.Admin.signlist)
        .then((json) => {
            return new Promise((resolve, reject) => {
                if (json.success)
                    resolve(json);
                else
                    reject(json.msg);
            })
        })
    },
    postSignConfirm(gameid) {
        return API.postJSON(API.Dev.Admin.sign_confirm, {gameid: gameid})
        .then((json) => {
            return new Promise((resolve, reject) => {
                if (json.success)
                    resolve(json);
                else
                    reject(json.msg);
            })
        })
    },
    postSignReject(gameid) {
        return API.postJSON(API.Dev.Admin.sign_reject, {gameid: gameid})
        .then((json) => {
            return new Promise((resolve, reject) => {
                if (json.success)
                    resolve(json);
                else
                    reject(json.msg);
            })
        })
    },
    postSignReset(gameid) {
        return API.postJSON(API.Dev.Admin.sign_reset, {gameid: gameid})
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

export default Admin;