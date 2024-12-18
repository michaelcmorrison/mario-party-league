import Table from "./table";

import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import PlayerStatsTable from "./PlayerStatsTable";
import TeamStatsTable from "./TeamStatsTable";
import type { Achievement } from "../utils/types";

export default function Tables() {
  const [gameData, setGameData] = useState<any>(() => []);
  const [playerData, setPlayerData] = useState<any>(() => []);
  const [teamData, setTeamData] = useState<any>(() => []);
  const [achievements, setAchievements] = useState<any>(() => []);

  useEffect(() => {
    const fetchGameData = async () => {
      const { data: games, error } = await supabase
        .from("games")
        .select(
          `
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
          `
        )
        .order("place", { referencedTable: "game_stats", ascending: true });

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

      setPlayerData(data);
    };

    const fetchTeamData = async () => {
      const { data, error } = await supabase.rpc("get_team_stats");

      setTeamData(data);
    };

    const fetchAchievements = async () => {
      const { data, error } = await supabase.rpc("get_achievements");

      console.log(data);

      setAchievements(data);
    };

    fetchTeamData();
    fetchPlayerData();
    fetchGameData();
    fetchAchievements();
  }, []);

  return (
    <div>
      {teamData && (
        <div className="my-8">
          <TeamStatsTable key={"teamstats"} data={teamData}></TeamStatsTable>
        </div>
      )}
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
      {achievements &&
        achievements.map((achievement: Achievement) => (
          <>
            <div>
              <b>{achievement.achievement}</b>: {achievement.player} (
              {achievement.amount})
            </div>
          </>
        ))}
    </div>
  );
}
