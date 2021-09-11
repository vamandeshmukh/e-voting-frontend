import React from "react";
import EoService from "../../service/EoService";
import "../Home.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { TableFooter, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { Select, MenuItem } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { TablePagination } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import Header from "../common/Header";

class ViewAllVotersEo extends React.Component {
  service = new EoService();

  constructor() {
    super();
    this.state = {
      voters: [],
      selectvalue: "",
      textvalue: "",
      page: 0,
      rowsPerPage: 5,
    };
  }

  componentDidMount() {
    this.service
      .getAllVoters()
      .then((result) => {
        this.setState({ voters: result.data });
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }

  showData() {
    const lowerCasetextvalue = this.state.textvalue.toLowerCase();
    return this.state.textvalue && this.state.selectvalue != ""
      ? this.state.voters.filter((x) =>
        JSON.stringify(x[this.state.selectvalue])
          .toLowerCase()
          .includes(lowerCasetextvalue)
      )
      : this.state.voters;
  }

  render() {
    const lowerCasetextvalue = this.state.textvalue.toLowerCase();

    const classes = makeStyles({
      root: {
        width: "100%",
      },
      container: {
        maxHeight: 440,
      },
    });

    return (
      <>
        <Header user="eo" />
        <div className="container scrollable">
          <Toolbar>
            <TextField
              variant="standard"
              color="primary"
              type="text"
              label={<SearchIcon />}
              style={{
                padding: "15px 5px",
                margin: "0px",
              }}
              onChange={(e) => {
                this.setState({ textvalue: e.target.value });
              }}
            />

            <FormControl
              variant="outlined"
              style={{ margin: "8px", width: "130px" }}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Search
              </InputLabel>
              <Select
                color="primary"
                label="Search"
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={this.state.selectvalue}
                onChange={(e) => {
                  this.setState({ selectvalue: e.target.value });
                }}
              >
                <MenuItem value="aadhaarId">AAdhaar Id</MenuItem>
                <MenuItem value="epic">Epic</MenuItem>
                <MenuItem value="voterFirstName">First Name</MenuItem>
                <MenuItem value="voterMiddleName">Middle Name</MenuItem>
                <MenuItem value="voterLastName">Last Name</MenuItem>
                <MenuItem value="dob">DOB</MenuItem>
                <MenuItem value="gender">Gender</MenuItem>
                <MenuItem value="state">State</MenuItem>
                <MenuItem value="pincode">Pincode</MenuItem>
                <MenuItem value="mobile">Mobile No</MenuItem>
                <MenuItem value="voterEmail">Voter Email</MenuItem>
                <MenuItem value="status">Status</MenuItem>
                <MenuItem value="constituencyId">Constituency Id</MenuItem>
              </Select>
            </FormControl>
          </Toolbar>

          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell><b>Aadhaar Id</b></TableCell>
                    <TableCell align="right"><b>Epic</b></TableCell>
                    <TableCell align="right"><b>Status</b></TableCell>
                    <TableCell align="right"><b>First Name</b></TableCell>
                    <TableCell align="right"><b>Last Name</b></TableCell>
                    <TableCell align="right"><b>DOB</b></TableCell>
                    <TableCell align="right"><b>State</b></TableCell>
                    <TableCell align="right"><b>Pincode</b></TableCell>
                    <TableCell align="right"><b>Mobile No</b></TableCell>
                    <TableCell align="right"><b>Constituency Id</b></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {this.showData()
                    .slice(
                      this.state.page * this.state.rowsPerPage,
                      this.state.page * this.state.rowsPerPage +
                      this.state.rowsPerPage
                    )
                    .map((voter) => (
                      <TableRow
                        key={voter.aadhaarId}
                        onClick={() =>
                          this.props.history.push(
                            `/viewVoter/${voter.aadhaarId}`
                          )
                        }
                        hover={true}
                      >
                        <TableCell component="th" scope="voter">
                          {voter.aadhaarId}
                        </TableCell>
                        <TableCell align="right">{voter.epic}</TableCell>
                        <TableCell align="right">{voter.status}</TableCell>
                        <TableCell align="right">
                          {voter.voterFirstName}
                        </TableCell>
                        <TableCell align="right">
                          {voter.voterLastName}
                        </TableCell>
                        <TableCell align="right">{voter.dob}</TableCell>
                        <TableCell align="right">{voter.state}</TableCell>
                        <TableCell align="right">{voter.pincode}</TableCell>
                        <TableCell align="right">{voter.mobile}</TableCell>
                       
                       
                        <TableCell align="right">
                          {voter.constituencyId}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>

                <TableFooter>
                  <TableRow>
                    <TablePagination
                      colSpan={4}
                      rowsPerPageOptions={[10, 5, 1]}
                      count={this.state.voters.length}
                      rowsPerPage={this.state.rowsPerPage}
                      page={this.state.page}
                      onPageChange={(e, newpage) =>
                        this.setState({ page: newpage })
                      }
                      onRowsPerPageChange={(e) => {
                        this.setState({ rowsPerPage: +e.target.value });
                        this.setState({ page: 0 });
                      }}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </>
    );
  }
}

export default ViewAllVotersEo;
