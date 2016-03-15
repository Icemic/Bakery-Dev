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
    }
}

export default Dev;