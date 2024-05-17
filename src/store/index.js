import { createStore } from 'redux';
import usuarioReducer from './usuarioReducer';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Configuração do persist
const persistConfig = {
    key: 'siteeventos',
    storage,
};

// Criação do reducer persistido
const persistedReducer = persistReducer(persistConfig, usuarioReducer);

// Criação da store com o reducer persistido
const store = createStore(persistedReducer);

// Criação do persistor
const persistor = persistStore(store);

export { store, persistor };