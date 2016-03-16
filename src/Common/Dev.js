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
    
    postGame(json) {
        return API.postJSON(API.Dev.game, json)
        .then((json) => {
            console.log(json)
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