
const baseUrl = require('../../setting').api;
const API = {
    Login: 'auth/login',
    Logout: 'auth/logout',
    Check: 'auth/check',
    
    Dev: {
        config: 'dev/config',
        games: 'dev/games',
        game: 'dev/game',
        updates: 'dev/game/updates',
        update: 'dev/game/update'
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