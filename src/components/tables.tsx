import Table from "./table";

import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import PlayerStatsTable from "./PlayerStatsTable";

export default function Tables() {
  const [gameData, setGameData] = useState<any>(() => []);
  const [playerData, setPlayerData] = useState<any>(() => []);

  useEffect(() => {
    const fetchGameData = async () => {
      const { data: games, error } = await supabase.from("games").select(`
            date_played,
            boards (
              name
            ),
            game_stats (
              players (
                name
              ), 
              *
            )
          `);

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        const transformedGames = games.map((game) => ({
          datePlayed: game.date_played,
          board: game.boards,
          game_stats: game.game_stats.map(({ players, ...rest }) => ({
            ...rest,
            player: players,
          })),
        }));

        setGameData(transformedGames);
      }
    };

    const fetchPlayerData = async () => {
      const { data, error } = await supabase.rpc("get_player_stats");

      console.log(data);

      setPlayerData(data);
    };
    fetchPlayerData();
    fetchGameData();
  }, []);

  return (
    <div>
      {playerData && (
        <div className="my-8">
          <PlayerStatsTable
            key={"playerstats"}
            data={playerData}
          ></PlayerStatsTable>
        </div>
      )}
      {gameData &&
        gameData.map((data: any, i: number) => (
          <div className="my-8">
            {data.board.name && (
              <h1 className="mb-4">
                {data.board.name} - {data.datePlayed}
              </h1>
            )}
            <Table key={i} data={data["game_stats"]}></Table>
          </div>
        ))}
    </div>
  );
}
