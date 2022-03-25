import React, {useState,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {GoogleLogin,GoogleLogout } from 'react-google-login';

import { Row, Col,Typography,Button, Radio  } from 'antd';
import { UserOutlined} from '@ant-design/icons';


const { Title } = Typography;


const useStyles = makeStyles((theme) => ({
  main:{
    color:"white",
    height: "50px"
  },
  title: {
    fontWeight: "bold !important",
  },
  login: {
    textAlign: "right",
  }
}));

function HeaderHome({ classes, user, setUser }) {
  classes = useStyles();

  const responseGoogle = (response) => {
    console.log(response);
    
    var userData = {
      id: response.googleId,
      name: response.profileObj.name,
      email: response.profileObj.email
    }

    localStorage.setItem("userData", JSON.stringify(userData));
    setUser(userData);

  }


  const clearUser = () => {
    setUser(undefined);
    localStorage.removeItem("userData");
  }

  //use effect to check if user is in local storage
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      setUser(JSON.parse(localStorage.getItem("userData")));
    }
    else{
      setUser(undefined);
    }
  }, []);

  console.log(user)

  

  return (
    <>
        <div className={classes.main} >
          <Row>
            <Col span={12} className={classes.title}>
              <Title strong style={{color: "white"}}>Sunset Hunter</Title>
            </Col>
            <Col span={12} className={classes.login}>
              <div>
                {(user !== undefined) ?
                (<div>
                  <GoogleLogout
                    clientId="166218651520-di29914j576s0v6fe1a96j7510vo4sra.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={() => clearUser()}
                    render={renderProps => (
                      <Button type="primary" shape="round" icon={<UserOutlined/>} size={"large"} onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        Logout
                      </Button>
                    )}
                  >
                  </GoogleLogout>
                </div>
                ) : 
                (<div>
                  <GoogleLogin
                    clientId={"166218651520-di29914j576s0v6fe1a96j7510vo4sra.apps.googleusercontent.com"}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    icon={false}
                    render={renderProps => (
                      <Button type="primary" shape="round" icon={<UserOutlined/>} size={"large"} onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        Login
                      </Button>
                    )}

                  >
                  </GoogleLogin>
                </div>)
                  
                }
                
              </div>
            </Col>
          </Row>
        </div>
    </>
  );
}

export default HeaderHome;