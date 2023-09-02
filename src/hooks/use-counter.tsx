import { $, useComputed$, useSignal } from "@builder.io/qwik";


export const useCounter = (intialValue: number = 1) => {

  const counter = useSignal(intialValue);

  const increaseCounter = $(() => {
    counter.value++
  })

  const decreaseCounter = $(() => {
    counter.value--
  })
  return {
    counter: useComputed$(() => counter.value),
    increase: increaseCounter,
    decrease: decreaseCounter
  };
}
