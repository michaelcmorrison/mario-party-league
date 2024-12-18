import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
} from "@tanstack/react-table";

import type { Game, GameStats } from "../utils/types";

const columnHelper = createColumnHelper<GameStats>();

const columns = [
  columnHelper.accessor("player.name", {
    id: "player",
    header: "Player",
  }),
  columnHelper.accessor("place", {
    id: "place",
    header: "Place",
  }),
  columnHelper.accessor("stars", {
    id: "stars",
    header: "Stars",
  }),
  columnHelper.accessor("coins", {
    id: "coins",
    header: "Coins",
  }),
  columnHelper.accessor("minigame_wins", {
    id: "minigames",
    header: "Minigames",
  }),
  columnHelper.accessor("lucky_blocks", {
    id: "lucky_blocks",
    header: "Lucky Blocks",
  }),
  columnHelper.accessor("ally_minigame_wins", {
    id: "ally-minigames",
    header: "Ally Minigames",
  }),
  columnHelper.accessor("shops_visited", {
    id: "shops-visited",
    header: "Shops Visited",
  }),
  columnHelper.accessor("items_used", {
    id: "items-used",
    header: "Items Used",
  }),
  columnHelper.accessor("spaces_travelled", {
    id: "spaces-travelled",
    header: "Spaces Travelled",
  }),
  columnHelper.accessor("reactions_used", {
    id: "reactions-used",
    header: "Reactions",
  }),
  columnHelper.accessor("blue_spaces", {
    id: "blue-spaces",
    header: "Blue Spaces",
  }),
  columnHelper.accessor("red_spaces", {
    id: "red-spaces",
    header: "Red Spaces",
  }),
  columnHelper.accessor("luck_spaces", {
    id: "luck-spaces",
    header: "Luck Spaces",
  }),
  columnHelper.accessor("bad_luck_spaces", {
    id: "bad-luck-spaces",
    header: "Bad Luck Spaces",
  }),
  columnHelper.accessor("item_spaces", {
    id: "item-spaces",
    header: "Item Spaces",
  }),
  columnHelper.accessor("bowser_spaces", {
    id: "bowser-spaces",
    header: "Bowser Spaces",
  }),
  columnHelper.accessor("event_spaces", {
    id: "event-spaces",
    header: "Event Spaces",
  }),
  columnHelper.accessor("swap_spaces", {
    id: "swap-spaces",
    header: "Swap Spaces",
  }),
  columnHelper.accessor("vs_spaces", {
    id: "vs-spaces",
    header: "VS. Spaces",
  }),
];

export default function Table({ data }: { data: GameStats[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className={
                    header.column.getCanSort()
                      ? "cursor-pointer select-none"
                      : ""
                  }
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted() as string] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
