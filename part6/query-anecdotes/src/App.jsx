import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useReducer, useEffect, useState } from 'react'

import { getAnecdotes, updateAnecdoteVotes } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import NotificationContext from './NotificationContext'

const notificationReducer = (state, action) => {
    switch(action.type) {
        case 'INCREMENT_VOTE':
            return `Vote added for "${action.payload}".`
        case 'NEW_ANECDOTE':
            return `New anecdote added: "${action.payload}".`
        case 'ERROR_LENGTH':
            return 'Error: Anecdotes must be at least 5 characters long.'
        default:
            return state
    }
}

const App = () => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)
    const [showNotification, setShowNotification] = useState(false)
    const queryClient = useQueryClient()

    useEffect(() => {
        setShowNotification(true)
        setTimeout(() => {
            setShowNotification(false)
        }, 5000)
    }, [notification])

    const updateAnecdoteVotesMutation = useMutation({
        mutationFn: updateAnecdoteVotes,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
        }
    })

    const handleVote = (anecdote) => {
        updateAnecdoteVotesMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
        notificationDispatch({ type: 'INCREMENT_VOTE', payload: anecdote.content })
    }

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        retry: false
    })

    if( result.isLoading ) {
        return <div>loading data...</div>
    } else if ( result.isError ) {
        return <div>anecdote service is not available due to problems in server</div>
    }

    const anecdotes = result.data

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            <div>
                <h3>Anecdote app</h3>

                {showNotification && <Notification />}
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
        </NotificationContext.Provider>
    )
}

export default App
