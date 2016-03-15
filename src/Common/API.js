
const baseUrl = 'http://127.0.0.1:3000/';
const API = {
    Login: 'auth/login',
    Logout: 'auth/logout',
    Check: 'auth/check',
    
    Dev: {
        config: 'dev/config',
        games: 'dev/games'
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
        return fetch(baseUrl + url, {
            method: 'GET',
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

export default API;