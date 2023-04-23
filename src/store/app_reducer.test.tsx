import { appReducer, setAppError, setAppStatus, AppStateType } from "./app_reducer";

let startState: AppStateType

beforeEach(() => {

    startState = {
        status: 'idle',
        error: 'some error',
        isInitialized: true
    }
})

test('correct error message should be set', () => {

    const endState = appReducer(startState, setAppError('some error'))

    expect(endState.error).toBe('some error');     
  
});

test('correct request status should be set', () => {

    const endState = appReducer(startState, setAppStatus('loading'))

    expect(endState.status).toBe('loading');     
  
});