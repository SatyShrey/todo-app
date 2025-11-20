import './global.css';
import { Provider } from 'components/Contexts';
import Header from 'components/Header';
import Addtodo from 'components/Addtodo';
import Todos from 'components/Todos';

export default function App() {
  return (
    <Provider>
        <Header />
        <Addtodo />
        <Todos/>
    </Provider>
  );
}
