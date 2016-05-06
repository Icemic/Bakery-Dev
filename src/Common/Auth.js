import API from '../Common/API';

let Props ={
    userid: null
};


const Auth = {
    login(username, password) {
        return API.postJSON(API.Login, {
            username: username,
            password: password
        })
        .then((data) => {
            if (data.success && data.userid)
            {
                Props.authed = true;
                Props.userid = data.userid;
                return new Promise((resolve, reject) => {
                    resolve(data.msg)
                })
            }
            else
                return new Promise((resolve, reject) => {
                    reject(data.msg)
                })
        })
    },
    logout() {
        return API.getJSON(API.Logout)
        .then((data) => {
            return new Promise((resolve, reject) => {
                if (data.success)
                    resolve();
                else
                    reject();
            })
        })
    },
    check() {
        return API.getJSON(API.Check)
        .then((data) => {
            Props.userid = data.userid;
            return new Promise((resolve, reject) => {
                if (!data.success)
                    reject();
                else
                    resolve(data.userid);
            })
        })
    },
    checkAdmin() {
        return API.getJSON(API.CheckAdmin)
        .then((json) => {
            return new Promise((resolve, reject) => {
                if (json.success && json.isAdmin)
                    resolve();
                else
                    reject();
            })
        })
    },
    
    
    isAuthed() {
        return !!Props.userid;
    }
}

export default Auth;