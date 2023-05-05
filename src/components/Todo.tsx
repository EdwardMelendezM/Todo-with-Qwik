import type { QwikSubmitEvent } from "@builder.io/qwik";
import { $, component$, useSignal } from "@builder.io/qwik";

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
  const formValue = useSignal("");
  const setFormValue = $(function (this: HTMLElement, value: string) {
    formValue.value = value;
    console.log(formValue.value);
  });
  const handleChangeInput = $((e: any) => {
    console.log(e);
    setFormValue(e.target.value);
  });
  const handleSubmitForm = $((e: QwikSubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    console.log("Enviando");
  });
  return (
    <div>
      <h2>Todo</h2>
      <form onSubmit$={handleSubmitForm}>
        <input value={formValue.value} onChange$={handleChangeInput} />
      </form>
      {listTodo.map((item) => (
        <div key={item.id}>{item.text}</div>
      ))}
    </div>
  );
});
