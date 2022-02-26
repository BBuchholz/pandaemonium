// // PREVIOUS IMPLEMENTATION (prior to shift)
// export const keysVirgo = ['8D', '9D', '10D'];
// export const keysTaurus = ['5D', '6D', '7D'];
// export const keysCapricorn = ['2D', '3D', '4D'];

// export const keysGemini = ['8S', '9S', '10S'];
// export const keysAquarius = ['5S', '6S', '7S'];
// export const keysLibra = ['2S', '3S', '4S'];

// export const keysPisces = ['8C', '9C', '10C'];
// export const keysScorpio = ['5C', '6C', '7C'];
// export const keysCancer = ['2C', '3C', '4C'];

// export const keysSagittarius = ['8W', '9W', '10W'];
// export const keysLeo = ['5W', '6W', '7W'];
// export const keysAries = ['2W', '3W', '4W'];

// NEW IMPLEMENTATION (post shift)
export const keysVirgo = ['7D', '8D', '9D'];
export const keysTaurus = ['4D', '5D', '6D'];
export const keysCapricorn = ['1D', '2D', '3D'];

export const keysGemini = ['7S', '8S', '9S'];
export const keysAquarius = ['4S', '5S', '6S'];
export const keysLibra = ['1S', '2S', '3S'];

export const keysPisces = ['7C', '8C', '9C'];
export const keysScorpio = ['4C', '5C', '6C'];
export const keysCancer = ['1C', '2C', '3C'];

export const keysSagittarius = ['7W', '8W', '9W'];
export const keysLeo = ['4W', '5W', '6W'];
export const keysAries = ['1W', '2W', '3W'];

// export const cardImagePath = '/images/';
// //Replace with this for Marseilles images
export const cardImagePath = '/images/cbdt/';


export const keysEarth = 
    [...keysTaurus, ...keysVirgo, ...keysCapricorn];

export const keysFire = 
	[...keysAries, ...keysLeo, ...keysSagittarius];

export const keysWater = 
	[...keysScorpio, ...keysCancer, ...keysPisces];

export const keysAir = 
    [...keysAquarius, ...keysGemini, ...keysLibra];

export const keysElemental =
	[...keysFire, ...keysEarth, ...keysAir, ...keysWater];