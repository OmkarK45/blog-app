import axios from 'axios'

export async function submitService(creds){
    axios.post('/user/login',creds)
    .then(res=>{
        if(res.data.token){
            localStorage.setItem('x-auth-token', res.data.token)
        }else{
            localStorage.setItem('x-auth-token', null)
        }
        console.log(res);
        return res
    })
    .then(res=>{
        return res.data.user
    })
    .catch(error=>{
        console.log(error);
    })
}

export async function registerService(creds){
    axios.post('/user/register', creds)
    .then(res=>{
        console.log(res);
    })
    .catch(error=>{
        console.log(error);
    })
}