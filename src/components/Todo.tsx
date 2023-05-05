import { $, component$, useSignal, useStore } from "@builder.io/qwik";
import style from './todo.module.css'

interface TodoI {
  id: string;
  text: string;
}

const listTodo: Array<TodoI> = [
  {
    id: crypto.randomUUID(),
    text: 'Cocinar',
  },
  { 
    id: crypto.randomUUID(),
    text: 'Lavar',
  },
];

export default component$(() => {
  const data = useStore([...listTodo])
  const formValue = useSignal("");

  const deleteOne = $((id:string)=>{
    if(!id) return null
    const temp = [...data]
    temp.filter(item=>item.id!==id)
    data=[...temp]
    console.log("Este es el Id",id);
    return
  })
  
  const addOne = $((text: string) => {
    const newElement = {
      id: crypto.randomUUID(),
      text
    }
    data.push(newElement)
    console.log("Nuevo elemento creado");
    
  })
  const handleChangeInput = $((e: any) => {
    const valor = e.target.value
    if (valor.trim().length < 2)
      return
    formValue.value = e.target.value
    addOne(formValue.value)
    e.target.value=''
  });
  return (
    <div class={style.container}>
      <h2>Todo</h2>
      <input onChange$={handleChangeInput} />
      <input type="submit" value="Send" id="inputValue"/>
      {data.map((item) => (
        <div key={item.id} class={style.containerItem}>
          <div>{item.text}</div>  
          <button class={style.button}>Edit</button>
          <button
            class={style.button}
            onClick$={()=>deleteOne(item.id)}
            >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
});
