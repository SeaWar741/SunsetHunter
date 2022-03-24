import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  main: { 
    background: "rgba( 255, 255, 255, 0.25 )",
    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
    backdropFilter: "blur( 7.5px )",
    webkitBackdropFilter: "blur( 7.5px )",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
  }
}));

function Header({ classes }) {
  classes = useStyles();

  return (
    <div>
        <div className={classes.main} >
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    SunsetHunter 
                </Grid>
                <Grid item xs={8}>
                    {/* */}
                </Grid>
            </Grid>
        </div>
    </div>
  );
}

export default Header;