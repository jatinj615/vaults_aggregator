import { PaletteMode } from '@mui/material';
import { action, createTypedHooks } from 'easy-peasy';
import { StoreModel } from './model';

// TODO: store needs comments
const globalStore: StoreModel = {
  theme: { mode: 'dark' },

  shouldUpdate: false,
  network: '',

  // actions
  setTheme: action((state, payload: PaletteMode) => {
    state.theme.mode = payload;
  }),

  setShouldUpdate: action((state, payload: boolean) => {
    state.shouldUpdate = payload;
  }),

  setNetwork: action((state, payload: string) => {
    state.network = payload;
  })
};

export default globalStore;

const { useStoreActions, useStoreState } = createTypedHooks<StoreModel>();
export { useStoreActions, useStoreState };
