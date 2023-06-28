function destroyToken(){
    if(localStorage.blogUserToken){
        localStorage.removeItem('blogUserToken');
        localStorage.removeItem('userLoggedIn');
    }
}

export default destroyToken;