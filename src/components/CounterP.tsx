import { $, component$, useSignal } from "@builder.io/qwik";

export default component$(()=>{
  const count = useSignal(0)
  const setCount=$((newValue:number)=>{
    count.value=newValue
  })
  return(
    <div>
    <button
      onClick$={()=>setCount(count.value+1)}>+
    </button>
    <div>
        {count.value}
    </div>
    <button
        onClick$={() => setCount(count.value - 1)}>-
    </button>
    </div>
  )
})