
const baseUrl = require('../../setting').api;
const API = {
    Login: 'auth/login',
    Logout: 'auth/logout',
    Check: 'auth/check',
    CheckAdmin: 'auth/checkAdmin',
    Auth: {
        sendmail: 'auth/sendmail',
        register: 'auth/register'
    },
    
    
    Dev: {
        config: 'dev/config',
        games: 'dev/games',
        game: 'dev/game',
        updates: 'dev/game/updates',
        update: 'dev/game/update',
        sign: 'dev/game/sign',
        debugsign: 'dev/game/debugsign',
        Admin: {
            signlist: 'dev/admin/signs',
            sign_confirm: 'dev/admin/sign/confirm',
            sign_reject: 'dev/admin/sign/reject',
            sign_reset: 'dev/admin/sign/reset',
        },
        Package: {
            icon: 'dev/game/package/icon',
            arc: 'dev/game/package/arc',
            info: 'dev/game/package/info',
            build: 'dev/game/package/build',
            download: 'dev/game/package/download'
        }
    },
    
    
    json: function (method, url, json) {
        method = method.toUpperCase();
        return fetch(baseUrl + url + ((method==='GET' && json)?jsonToQuery(json):''), {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'include',
            body: (method==='GET')?null:JSON.stringify(json)
        })
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            if (json.success)
                return json;
            else
                throw json.msg;
        })
    },
    formData: function (method, url, data, json=true) {
        method = method.toUpperCase();
        if (method==='GET')
            throw '不支持通过GET方式发送FormData！';

        return fetch((url.startsWith('http')?'':baseUrl) + url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                // 'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'cors',
            credentials: 'include',
            body: data
        })
        .then((res) => {
            if (json)
                return res.json()
                .then((json) => {
                    if (json.success)
                        return json;
                    else
                        throw json.msg;
                })
            else
                return res.text()
        })

    },
    postJSON: function (url, json) {
        return fetch(baseUrl + url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(json)
        })
        .then((res) => {
            return res.json();
        })
    },
    getJSON: function (url, json) {
        return fetch(baseUrl + url + (json?jsonToQuery(json):''), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'include'
        })
        .then((res) => {
            return res.json();
        })
    },
    patchJSON: function (url, json) {
        return fetch(baseUrl + url, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(json)
        })
        .then((res) => {
            return res.json();
        })
    },
    putJSON: function (url, json) {
        return fetch(baseUrl + url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(json)
        })
        .then((res) => {
            return res.json();
        })
    },
    deleteJSON: function (url, json) {
        return fetch(baseUrl + url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(json)
        })
        .then((res) => {
            return res.json();
        })
    }
}


function jsonToQuery(json) {
    let queryArray = [];
    let keys = Object.keys(json);
    for (let key of keys) {
        queryArray.push(`${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`);
    }
    return `?${queryArray.join('&')}`;
}

export default API;