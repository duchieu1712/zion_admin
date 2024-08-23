import { DataGrid, GridColDef } from "@mui/x-data-grid";

export default function ProductView2({ data }: { data: any[] }) {
  const cols = ["id", "cover", "name", "price", "priceSale", "colors", "status"];
  const columns: GridColDef[] = cols.map((e) => {
    if (e === "name") {
      return { field: e, headerName: e.toUpperCase(), width: 200, editable: true };
    }
    return { field: e, headerName: e.toUpperCase(), editable: true };
  });

  return (
    <div className="w-full h-[300px]">
      <DataGrid rows={data} columns={columns} editMode="row" />
    </div>
  );
}
