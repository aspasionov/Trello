import type { RootState } from '@store/store'
import type { CardT } from './types'
export const selectCards = (state: RootState): CardT[] => state.cards.cards
