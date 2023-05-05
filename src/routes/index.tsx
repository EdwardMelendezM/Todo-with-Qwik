import { component$ } from '@builder.io/qwik';
import CounterP from '~/components/CounterP';


export default component$(() => {
  return (
    <div>
        Hello word
        <CounterP/>
    </div>
  );
});
