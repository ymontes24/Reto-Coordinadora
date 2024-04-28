import * as exceljs from "exceljs";
import { requiredColumns } from "./columnsNames";

export const xlsToJson = async (file: Buffer) => {
  const workbook = new exceljs.Workbook();
  await workbook.xlsx.load(file);

  const worksheet = workbook.worksheets[0];

  const rows = worksheet.getSheetValues();

  const getColumnNames = rows[1] as [];

  const Columns: Array<{
    position: number;
    name: string;
  }> = getColumnNames
    .map((column: string, index: number) => {
      return {
        position: index,
        name: column,
      };
    })
    .filter((column) => {
      return requiredColumns.includes(column.name);
    });

  if (Columns.length !== requiredColumns.length) {
    throw new Error("Invalid columns");
  }

  const events = rows.map((row: any) => {
    return {
      title:
        row[
          Columns.find((column) => column.name === "title")?.position ?? -1
        ] || null,
      description:
        row[
          Columns.find((column) => column.name === "description")?.position ??
            -1
        ] || null,
      address:
        row[
          Columns.find((column) => column.name === "address")?.position ?? -1
        ] || null,
      event_date:
        new Date(
          row[
            Columns.find((column) => column.name === "event_date")?.position ??
              -1
          ]
        ) || null,
      max_capacity:
        row[
          Columns.find((column) => column.name === "max_capacity")?.position ??
            -1
        ] || null,
    };
  });

  return events;
};
