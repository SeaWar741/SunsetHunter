import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Row, Col,Input,Card,Select  } from 'antd';
import { MdLocationOn } from "react-icons/md";
import { Typography } from 'antd';

import {FaSearch, FaRegBookmark} from "react-icons/fa"

//<BookFilled />
const { Title } = Typography;

const { Search } = Input;

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 'auto'
  },
  main: { 
    background: "rgba( 255, 255, 255, 0.25 )",
    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
    backdropFilter: "blur( 7.5px )",
    webkitBackdropFilter: "blur( 7.5px )",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
    borderRadius: "10px",
  },
  submain:{
    padding:"2rem",
    color:"white !important"
  },
  itemContainer: {
    padding: '3rem'
  },
  img :{
    maxWidth: '300px',
    width: '100%'
  },
  inputContainer: {
    background: 'rgba(255,255,255,0.5)',
    padding: '0.5rem 1rem',
    borderRadius: '25px',
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    background: 'none',
    outline: 'none',
    border: 'none'
  },
  icon: {
    marginRight: '1rem'
  },
  select: {
    borderRadius: '25px',
    background: 'none',
    border: 'none',
    width: '100%',
    height: '24px'
  }
}));

function BodyContent({ classes,user,setUser }) {
  const [city, setCity] = useState("Monterrey")
  const [sunrisetime,setSunrisetime] = useState("6:00 am")
  const [sunsettime,setSunsettime] = useState("6:00 pm")
  const [sunriseQuality,setSunrisequality] = useState("100%")
  const [sunsetQuality,setSunsetquality] = useState("100%")
  const [cities,setCities] = useState(["Monterrey","Ciudad de Mexico","Merida","Puebla","Guadalajara"])

  classes = useStyles();

  //default Cities
  const defaultCities = ["Monterrey","Ciudad de Mexico","Merida","Puebla","Guadalajara"]

  //reemplazar por ciudades
  const { Option } = Select;

  function handleChange(value) {
    console.log(`selected ${value}`);
    setCity(value)
    fetchData()
  }

  //variables to feed layout
  
  //get current date in format "dd-mmm-yyyy"
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = dd + '-' + mm + '-' + yyyy;

  //get from api the sunrise and sunset time with axios
  const fetchData = async() =>{
    fetch("http://localhost:8080/api/users/get_site",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"city_name":city})
    }).then((res) => res.json())
    .then((data) => {
      setSunrisetime(data[0].sunrise);
      setSunsettime(data[0].sunset);
      setSunrisequality(data[0].good_sunrise+"%");
      setSunsetquality(data[0].good_sunset+"%");
    })
  }

  //function to extract name from each index of array
  const getName = (index) => {
    return user[index].name;
  }

  //get Sites
  const fetchSites = async() =>{
    if(user !== undefined){
      fetch("http://localhost:8080/api/users/get_sites",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id:user.id})
      }).then((res) => res.json())
      .then((data) => {
        var dataCities = []
        data.forEach(element => {
          dataCities.push(element.name)
        })
        setCities(dataCities)
      }
      )
    }
    else{
      console.log("No user detected")
      setCities(defaultCities)

    }
  }


  //add sites
  const addSite = async() =>{
    if(user !== undefined && cities.indexOf(city) === -1){
      //check if city is not in the list
      var citiesTemp = cities
      citiesTemp.push(city)

      console.log(citiesTemp)

      setCities(citiesTemp)

      fetch("http://localhost:8080/api/users/add_site",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(
          {
            id:user.id,
            name:user.name,
            email:user.email,
            sites:citiesTemp
          }
        )
      }).then((res) => console.log(res))

      console.log("Site added")
    }
    else{
      alert("No user detected")
    }
  }
        



  const searchCity = (e) =>{
    e.preventDefault();
    fetchData();
  }

  useEffect(() => {
      fetchData();
      fetchSites();

  }, [user]);


 return (
    <div className={classes.container}>
      <Row gutter={[48, 8]} style={{padding:"2rem"}}>
        <Col span={12} style={{textAlign:"center"}}>
           <div className={classes.inputContainer}>
                <FaSearch className={classes.icon}/>
                <form onSubmit={(e) => {searchCity(e)}}>
                  <input value={city} className={classes.input} onChange={(e) => {setCity(e.target.value)}} placeholder="Buscar"/>
                </form>
            </div>
        </Col>
            <Col span={12} style={{textAlign:"center"}}>
              <div className={classes.inputContainer}>
                <FaRegBookmark className={classes.icon}/>
                <select name="city" className={classes.select}  onChange={(e) => {handleChange(e.target.value)}}>
                  {cities.map((city,index) => {
                    return(
                      <option value={city}>{city}</option>
                    )
                  }
                  )}
                </select>
              </div>
            </Col>
        </Row>
        <div className={classes.main}>
          <div className={classes.submain}>
              <Row>
                <Col span={12}>
                  <Title level={4} style={{color:"white"}}>
                    <MdLocationOn/>
                    {city}
                  </Title>
                </Col>
                <Col span={12} style={{textAlign:"right"}}>
                  <FaRegBookmark onClick={addSite}/>
                </Col>
              </Row>


              <Row>
                <Col className={classes.itemContainer} span={12} style={{textAlign:"center"}}>
                    <img className={classes.img} src={'/./img/sunrise.png'}/>
                    <br/>
                    {sunriseQuality}
                    <br/>
                    {sunrisetime}
                    <br/>
                    {today}
                </Col>
                <Col className={classes.itemContainer} span={12} style={{textAlign:"center"}}>
                    <img className={classes.img} src={'/./img/sunset.png'}/>
                    <br/>
                    {sunsetQuality}
                    <br/>
                    {sunsettime}
                    <br/>
                    {today}
                </Col>
              </Row>
          </div>
        </div>
    </div>
  );
}

export default BodyContent;