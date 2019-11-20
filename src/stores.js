import {writable} from "svelte/store";

export const toastQ = writable([]);
export const pushToastQ = (message) => {
  toastQ.update(messages => [...messages, message])
}

export const popToastQ = () => {
  toastQ.update(messages => messages.slice(1))
}
