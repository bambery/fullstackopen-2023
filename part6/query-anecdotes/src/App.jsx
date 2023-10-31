import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdoteVotes } from './requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
    const queryClient = useQueryClient()

    const updateAnecdoteVotesMutation = useMutation({
        mutationFn: updateAnecdoteVotes,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
        }
    })

    const handleVote = (anecdote) => {
        updateAnecdoteVotesMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    }

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        retry: false
    })
    console.log(JSON.parse(JSON.stringify(result)))

    if( result.isLoading ) {
        return <div>loading data...</div>
    } else if ( result.isError ) {
        return <div>anecdote service is not available due to problems in server</div>
    }

    const anecdotes = result.data

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => handleVote(anecdote)}>vote</button>
                </div>
            </div>
            )}
        </div>
    )
}

export default App
