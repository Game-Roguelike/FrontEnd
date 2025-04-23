export default function userStorageUp(){
    if(!sessionStorage.getItem("username")){
        sessionStorage.setItem("username", "Username");
    }
    if(!sessionStorage.getItem("starterPack")){
        sessionStorage.setItem("starterPack", "starterPack1");
    }
    if(!sessionStorage.getItem("playerRecord")){
        sessionStorage.setItem("playerRecord", "stage1room1");
    }
}