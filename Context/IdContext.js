import React, {createContext,useContext} from 'react';
export const IdContext = createContext();
export const IdProvider = (props) => {
    const [UserId, setUserId] = useState('');
    return <IdContext.Provider value={[UserId, setUserId]}>{props.children}</IdContext.Provider>;
}
