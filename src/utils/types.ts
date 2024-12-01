export type Game = {
  datePlayed: string;
  board: string;
};

export type GameStats = {
  player: {
    name: string;
  };
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
