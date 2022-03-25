import React, {useState} from "react";

import HeaderHome from "./header";
import BodyContent from "./body";

import { makeStyles } from "@material-ui/core/styles";

import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;



const useStyles = makeStyles((theme) => ({
    header: {
        backgroundColor:"black",
    },
    content:{
        background: "linear-gradient(232.27deg, #6785F1 11.75%, #F1BA67 94.14%)",
        padding: "3rem",
        minHeight: 'calc(100vh - 50px)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }


}));

const Home =({classes}) =>{
    const [user, setUser] = useState({});
    

    classes = useStyles();



    return (
        <>
            <div>
                <Layout>
                    <Header className={classes.header}>
                        <HeaderHome user={user} setUser={setUser}/>
                    </Header>
                    <Content className={classes.content}>
                        <BodyContent user={user} setUser={setUser}/>
                    </Content>
                </Layout>
            </div>
        </>
  );
};
export default Home;