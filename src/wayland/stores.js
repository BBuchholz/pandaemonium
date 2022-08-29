// // /////////////////////////////////
// // // ALEX STORES
// // /////////////////////////////////

import { writable, derived } from 'svelte/store';
// import KnechtController from './myriad/KnechtController.js';

// const magisterLudi = KnechtController();

export const bookName = writable('');
export const benchName = writable('');

export const toDos = writable([]);

export const workBenchList = writable([]);
export const currentWorkBenchText = writable('');
export const prevItemIndex = writable(-1);
export const editMode = writable(false);
