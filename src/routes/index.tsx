import { component$ } from '@builder.io/qwik';
import CounterP from '~/components/CounterP';
import Todo from '~/components/Todo';


export default component$(() => {
  return (
    <div>
      <Todo/>
      <hr />
      Hello word  
      <CounterP/>
      <hr />

    </div>
  );
});
