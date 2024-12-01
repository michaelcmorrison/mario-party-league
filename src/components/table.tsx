import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import defaultData from "../content/data.json";
import { useState } from "react";

type Game = {
  gameId: number;
  firstPlace: string;
  secondPlace: string;
  thirdPlace: string;
};

const columnHelper = createColumnHelper<Game>();

const columns = [
  columnHelper.accessor("gameId", {
    header: "Game ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("firstPlace", {
    header: "First Place",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("secondPlace", {
    header: "Second Place",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("thirdPlace", {
    header: "Third Place",
    cell: (info) => info.getValue(),
  }),
];

export default function Table() {
  const [data, setData] = useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table className="border border-collapse w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="border" key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
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
