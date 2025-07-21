import portfinder from 'portfinder';

export async function findFreePort(){
    portfinder.basePort = 56000;

    return portfinder.getPortPromise();
}

