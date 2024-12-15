import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
} from "@tanstack/react-table";

import type { PlayerStats } from "../utils/types";

const columnHelper = createColumnHelper<PlayerStats>();

const columns = [
  columnHelper.accessor("player", {
    id: "name",
    header: "Name",
  }),
  columnHelper.accessor("games_played", {
    id: "gamesPlayed",
    header: "Games Played",
  }),
  columnHelper.accessor("points", {
    id: "points",
    header: "Points",
  }),
];

export default function Table({ data }: { data: PlayerStats[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="text-sm">
      <table className="border border-collapse w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className={
                    header.column.getCanSort()
                      ? "border cursor-pointer select-none"
                      : "border"
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
                <td className="border px-4 py-2" key={cell.id}>
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
