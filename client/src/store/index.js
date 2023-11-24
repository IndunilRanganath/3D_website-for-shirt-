import { proxy } from "valtio";

const store = proxy({
    intro : true,
    color : '#00AAFF',
    isLogoTexture : true,
    isFullTexture : false,
    logoDecal : './threejs.png',
    fullDecal : './threejs.png',
});

export default store;
