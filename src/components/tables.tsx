import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import Table from "./table";

import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function Tables() {
  const [gameData, setGameData] = useState<any>(() => []);

  useEffect(() => {
    const fetchData = async () => {
      const { data: games, error } = await supabase.from("games") // Replace with your table name
        .select(`
            boards (
              name
            ),
            game_stats (
              players (
                name
              ), 
              *
            )
          `); // Adjust columns as needed

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        const transformedGames = games.map((game) => ({
          board: game.boards, // Rename 'boards' to 'board'
          game_stats: game.game_stats.map(({ players, ...rest }) => ({
            ...rest,
            player: players, // Rename 'players' to 'player'
          })),
        }));

        setGameData(transformedGames);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {gameData &&
        gameData.map((data: any, i: number) => (
          <div>
            <h1>{data.board.name}</h1>
            <Table key={i} data={data["game_stats"]}></Table>
          </div>
        ))}
    </div>
  );
}
