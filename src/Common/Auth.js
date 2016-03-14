import API from '../Common/API';
import {sha256} from 'js-sha256';

let Props ={
    userid: null
};


const Auth = {
    login(username, password) {
        password = sha256(password);
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
    
    
    isAuthed() {
        return !!Props.userid;
    }
}

export default Auth;