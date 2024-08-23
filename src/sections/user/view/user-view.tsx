import { Avatar, Box, Checkbox, Grid, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
// import { applyFilter, getComparator } from "../utils";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Iconify from "../../../components/iconify/iconify";
import ActionModal from "@/components/modals/modal";

import Stack from "@mui/material/Stack";

import Typography from "@mui/material/Typography";

import UserTableToolbar from "../user-table-toolbar";
import { useState } from "react";
import { users } from "../../../_mock/user";
import Label from "@/components/label/label";
import { DataGrid } from "@mui/x-data-grid";

// ----------------------------------------------------------------------

const userFields = [
  { id: "name", label: "Name" },
  { id: "company", label: "Company" },
  { id: "role", label: "Role" },
  { id: "isVerified", label: "Verified", align: "center" },
  { id: "status", label: "Status" },
];

export default function UserPage() {
  // const [page, setPage] = useState(0);

  // const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState<any[]>([]);

  // const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  // const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openModal, setOpenModal] = useState(false);

  const [isCreate, setIsCreate] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  // const handleSort = (id: string, event?: any) => {
  //   const isAsc = orderBy === id && order === "asc";
  //   if (id !== "") {
  //     setOrder(isAsc ? "desc" : "asc");
  //     setOrderBy(id);
  //   }
  // };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name: string) => {
    const selectedIndex = selected.indexOf(name as never);
    let newSelected: any[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  // const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event: any) => {
  //   setPage(0);
  //   setRowsPerPage(parseInt(event.target.value, 10));
  // };

  const handleFilterByName = (event: any) => {
    // setPage(0);
    setFilterName(event.target.value);
  };

  // const dataFiltered = applyFilter({
  //   inputData: users,
  //   comparator: getComparator(order, orderBy),
  //   filterName,
  // });

  // const notFound = !dataFiltered.length && !!filterName;
  // const [rowSeleted, setRowSelected] = useState<any>(null);

  // const rows2 = users.map((e) => ({
  //   id: e.id,
  //   name: `${e.name}|${e.avatarUrl}`,
  //   isVerified: e.isVerified,
  //   company: e.company,
  //   status: e.status,
  //   role: e.role,
  // }));
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => {
            setIsCreate(true);
            setOpenModal(true);
          }}
        >
          New User
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <DataGrid
          sx={{ minWidth: 800, maxHeight: 400 }}
          rows={users}
          columns={[
            {
              field: "",
              pinnable: true,
              renderCell(params) {
                return (
                  <Checkbox
                    disableRipple
                    checked={selected.indexOf(params.row.name) !== -1}
                    onChange={() => handleClick(params.row.name)}
                  />
                );
              },
              renderHeader: () => (
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < users.length}
                  checked={users.length > 0 && selected.length === users.length}
                  onChange={handleSelectAllClick}
                />
              ),
            },
            {
              field: "name",
              headerName: "Name",
              width: 200,
              editable: true,
              renderCell(params) {
                return (
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ height: "100%" }}>
                    <Avatar alt={params.value} src={params.row.avatarUrl} />
                    <Typography variant="subtitle2" noWrap>
                      {params.value}
                    </Typography>
                  </Stack>
                );
              },
            },
            { field: "company", headerName: "Company", editable: true },
            { field: "role", headerName: "Role", editable: true },
            {
              field: "isVerified",
              headerName: "Verified",
              align: "center",
              editable: true,
              renderCell(params) {
                return <Label>{params.value ? "Yes" : "No"}</Label>;
              },
            },
            {
              field: "status",
              headerName: "Status",
              editable: true,
              renderCell(params) {
                return (
                  <Label color={(params.value === "banned" && "error") || "success"}>
                    {params.value}
                  </Label>
                );
              },
            },
            {
              field: "actions",
              headerName: "Actions",
              pinnable: true,
              renderCell() {
                return (
                  <Box
                    sx={{ display: "flex", justifyContent: "center", gap: "8px", width: "100%" }}
                  >
                    <Button
                      sx={{
                        color: "error.main",
                        background: "red",
                        padding: "8px",
                        borderRadius: "6px",
                      }}
                    >
                      <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                      Delete
                    </Button>
                    <Button
                      // onClick={() => setRowSelected(params.row)}
                      sx={{
                        color: "error.main",
                        background: "blue",
                        padding: "8px",
                        borderRadius: "6px",
                      }}
                      role="alert"
                    >
                      <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                      Edit
                    </Button>
                  </Box>
                );
              },
            },
          ]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          editMode="row"
          pageSizeOptions={[5, 10, 25, 50, 100]}
          rowSelection={false}
          showCellVerticalBorder
        />
        {/* <Scrollbar>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={userFields}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any) => (
                    <UserTableRow
                      key={row.id}
                      name={row.name}
                      role={row.role}
                      status={row.status}
                      company={row.company}
                      avatarUrl={row.avatarUrl}
                      isVerified={row.isVerified}
                      selected={selected.indexOf(row.name as never) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      handleUpdate={() => {
                        setIsCreate(false)
                        setOpenModal(true)
                      }}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Card>

      <ActionModal
        titleHeader={isCreate ? "Add new user" : "Update user"}
        openModal={openModal}
        closeModal={() => closeModal()}
      >
        <Formik
          initialValues={{
            name: "",
            company: "",
            role: "",
            isVerified: "",
            status: "",
          }}
          onSubmit={(values) => console.log(values)}
        >
          <Form>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              {userFields.map((item: any, index: number) => (
                <Grid item xs={6} key={index}>
                  <Field name={item.id} as={TextField} label={item.label} size="small" fullWidth />
                </Grid>
              ))}
            </Grid>
            <Stack spacing={1} direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
              <Button variant="contained" type="submit">
                {isCreate ? "Add" : "Update"}
              </Button>
              <Button variant="contained" color="error">
                Cancel
              </Button>
            </Stack>
          </Form>
        </Formik>
      </ActionModal>
    </Container>
  );
}
