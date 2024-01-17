import notificationReducer from './notificationReducer'
import deepFreeze from 'deep-freeze'

describe('notificationReducer', () => {
  test('returns new state with action notification/createNotification', () => {
    const state = '';
    const action = {
      type: 'notification/createNotification',
      payload: 'this is a new notification'
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)

    expect(newState).toEqual({ message: action.payload, type: 'info' })
  })

  test('returns new state with action notification/createError', () => {
    const state = '';
    const action = {
      type: 'notification/createError',
      payload: 'this is a new error'
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)

    expect(newState).toEqual({ message: action.payload, type: 'error' })
  })

  test('returns empty state with action notification/clearNotification', () => {
    const state = { message: 'this is an existing notification', type: 'info' };
    const action = {
      type: 'notification/clearNotification'
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)

    expect(newState).toEqual('')
  })
})
