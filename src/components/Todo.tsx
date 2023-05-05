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
  const data = useStore({state:'',list:[...listTodo]})
  const formValue = useSignal("");
  const isEdit = useSignal(false)

  const setIsEdit = $(() => {
    isEdit.value = !isEdit.value
    console.log("Edit", isEdit.value);
  })

  const setDataList = $((newData:any)=>{
    data.list=[...newData]
  })

  const deleteOne = $((id:string)=>{
    if(!id) return null
    const temp = [...data.list]
    const newData = temp.filter(item=>item.id!==id)
    setDataList([...newData])
    console.log("DELETE ONE");
    
  })
  
  const addOne = $((text: string) => {
    const newElement = {
      id: crypto.randomUUID(),
      text
    }
    data.list.unshift(newElement)
    console.log("Nuevo elemento creado")
  })

  const edit = $(()=>{
    return
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
      {data.list.map((item) => (
        <div key={item.id} class={style.containerItem}>
          <div>{item.text}</div>
          {
            isEdit
              ?
              <button
                class={style.button}
                onClick$={setIsEdit}
                >
                  Edit
              </button>
              :
              <button
                class={style.button}
                onClick$={setIsEdit}
                >
                  Confirm
              </button>
          }
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
