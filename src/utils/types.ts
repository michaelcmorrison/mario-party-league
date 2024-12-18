export type Game = {
  datePlayed: string;
  board: string;
};

export type GameStats = {
  player: {
    name: string;
  };
  place: number;
  stars: number;
  coins: number;
  minigame_wins: number;
  lucky_blocks: number;
  ally_minigame_wins: number;
  shops_visited: number;
  items_used: number;
  spaces_travelled: number;
  reactions_used: number;
  blue_spaces: number;
  red_spaces: number;
  luck_spaces: number;
  bad_luck_spaces: number;
  item_spaces: number;
  bowser_spaces: number;
  event_spaces: number;
  swap_spaces: number;
  vs_spaces: number;
};

export type PlayerStats = {
  player: string;
  games_played: number;
  points: number;
};

export type TeamStats = {
  team: string;
  games_played: number;
  points: number;
};

export type Achievement = {
  achievement: string;
  player: string;
  amount: number;
};
