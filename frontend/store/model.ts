import { PaletteMode } from '@mui/material';
import { Action } from 'easy-peasy';

// TODO store needs comments
export interface StoreModel {
  // * theme store
  theme: { mode: PaletteMode };

  // * app specific items
  shouldUpdate: boolean;
  network: string;

  // actions
  setTheme: Action<StoreModel, PaletteMode>;
  setShouldUpdate: Action<StoreModel, boolean>;
  setNetwork: Action<StoreModel, string>;
}
