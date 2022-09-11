import { useState } from "react"

interface IState<T> {
    loading: boolean,
    data?: T,
    error?: object
}
type IResult<T = any> = [(data: T) => void, IState<T>]
export default <T = any>(url: string): IResult => {
    const [state, setState] = useState<IState<T>>({
        loading: false,
        data: undefined,
        error: undefined
    });
    const callApi = (data: T) => {
        setState(prev => ({ ...prev, loading: true }));
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json())
            .then(data => setState(prev => ({ ...prev, data })))
            .catch(error => setState(prev => ({ ...prev, error })))
            .finally(() => setState(prev => ({ ...prev, loading: false })));
    }
    return [callApi, { ...state }];
}