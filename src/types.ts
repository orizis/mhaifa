export type Position = 'GK' | 'DEF' | 'MID' | 'ATT' | 'MGR';
export type Season = '1990/91' | '1993/94' | '2002/03' | '2009/10' | '2022/23';

export interface Player {
  id: string;
  nameHe: string;
  position: Position;
  seasons: (Season | 'ידני')[];
  imageUrl: string | null;
}

export interface Lineup {
  GK: Player | null;
  DEF: (Player | null)[];
  MID: (Player | null)[];
  ATT: (Player | null)[];
  MGR: Player | null;
}

export interface ActivePicker {
  role: Position;
  index: number;
}
