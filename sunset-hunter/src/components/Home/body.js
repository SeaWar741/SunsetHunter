import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  main: { 
    background: "rgba( 255, 255, 255, 0.25 )",
    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
    backdropFilter: "blur( 7.5px )",
    webkitBackdropFilter: "blur( 7.5px )",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  place: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
}));

function Header({ classes }) {
  classes = useStyles();

  return (
    <div>
        <div className={classes.main} >
              <Grid container spacing={3}>
                  <Grid item xs={12}>
                      <Paper className={classes.place}>Monterrey</Paper>
                  </Grid>
                  <Grid item xs={2} sm={1}>
                      <Paper className={classes.paper}><Button>Back</Button></Paper>
                  </Grid>
                  <Grid item xs={10} sm={5}>
                      <Paper className={classes.paper}></Paper>
                  </Grid>
                  <Grid item xs={10} sm={5}>
                      <Paper className={classes.paper}></Paper>
                  </Grid>
                  <Grid item xs={2} sm={1}>
                      <Paper className={classes.paper}><Button>Next</Button></Paper>
                  </Grid>
              </Grid>
        </div>
    </div>
  );
}

export default Header;