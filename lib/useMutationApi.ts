import { useState } from "react"

interface IState<T> {
    loading: boolean,
    data: T,
    error?: string
}
export interface IStateData {
    ok: boolean
}
type IResult<T, S> = [(receivedData?: S, method?: 'PATCH' | 'DELETE' | 'POST') => void, IState<T>]
export default <T extends IStateData, S>(url: string): IResult<T, S> => {
    const [state, setState] = useState<IState<T>>({
        loading: false,
        data: {
            ok: false
        } as T,
        error: undefined
    });
    const callApi = (receivedData?: S, method = 'POST') => {
        setState(prev => ({ ...prev, loading: true }));
        fetch(url, {
            method,
            body: JSON.stringify(receivedData),
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json())
            .then(data => setState(prev => ({ ...prev, data })))
            .catch(error => setState(prev => ({ ...prev, error })))
            .finally(() => setState(prev => ({ ...prev, loading: false })));
    }
    return [callApi, { ...state }];
}