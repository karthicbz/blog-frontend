function destroyToken(){
    if(localStorage.blogUserToken){
        localStorage.removeItem('blogUserToken');
    }
}

export default destroyToken;