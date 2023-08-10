import { useSelector, useDispatch } from 'react-redux'
import NewAnecdote from './components/NewAnecdote'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
    return (
        <div>
            <AnecdoteList />
            <NewAnecdote />
        </div>
    )
}

export default App
