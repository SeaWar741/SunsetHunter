import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Header from "./header";
import Body from "./body";

const useStyles = makeStyles((theme) => ({
    parent: {
        display: "grid",
        gridTemplateColumns: "repeat(8, 1fr)",
        gridTemplateRows: "repeat(9, 1fr)",
        gridColumnGap: "0px",
        gridRowGap: "0px",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
    },
    header: {
        gridArea: "1 / 1 / 2 / 9", 
    },
    searchBar: {
        gridArea: "2 / 1 / 3 / 5", 
    },
    searchBar2: {
        gridArea: "2 / 5 / 3 / 9", 
    },
    main: {
        gridArea: "3 / 1 / 10 / 9", 
    }
}));

const Home =({classes}) =>{
    classes = useStyles();

    return (
        <>
            <div className={classes.parent}>
                <div className={classes.header}>
                    <Header />
                </div>  
                <div className={classes.searchBar}>
                    Search
                </div>  
                <div className={classes.searchBar2}>
                    
                </div> 
                <div className={classes.main}>
                    <Body />
                </div>  
            </div>
        </>
  );
};
export default Home;