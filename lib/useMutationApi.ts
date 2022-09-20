import { useState } from "react"

interface IState<T> {
    loading: boolean,
    data: T,
    error?: string
}
export interface IStateData {
    ok: boolean
}
type IResult<T, S> = [(receivedData?: S) => void, IState<T>]
export default <T extends IStateData, S>(url: string): IResult<T, S> => {
    const [state, setState] = useState<IState<T>>({
        loading: false,
        data: {
            ok: false
        } as T,
        error: undefined
    });
    const callApi = (receivedData?: S) => {
        setState(prev => ({ ...prev, loading: true }));
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(receivedData),
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json())
            .then(data => setState(prev => ({ ...prev, data })))
            .catch(error => setState(prev => ({ ...prev, error })))
            .finally(() => setState(prev => ({ ...prev, loading: false })));
    }
    return [callApi, { ...state }];
}