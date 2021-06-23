import React,{useState, useEffect} from "react"
import axios from "axios"
import {Card,Container,Row,Col,Button,Spinner,Dropdown } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
const TotalCloud=()=>{
    const [data, setData] = useState([])
    const [userInfo,setUserInfo] = useState([])
    const [flag,setFlag] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    useEffect(()=>{
        setIsLoading(true)
        getAllData()
    },[])
    const getAllData=()=>{
        axios.get("https://reqres.in/api/users?delay=3")
        .then((response)=>{
            let allData = response.data
            setData(allData.data)
            setIsLoading(false)
        })
        .catch((error)=>{
            console.log(error)
            setIsLoading(false)
        })
    }
    const getUserInfo=(id)=>{
        axios.get(`https://reqres.in/api/users/${id}`)
        .then((response)=>{
            let allData = response.data
            setUserInfo(allData.data)
            setFlag(true)
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    const handleBack=()=>{
        getAllData()
        setFlag(false)
    }
    const spinnerComponent=()=>{
        return (
            <div style={{marginTop:"20%",marginLeft:"50%"}}>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div >
          );
    }
    const renderData=()=>{
       let result = data.map((item,index)=>{
           return(
            
                    <Col xs="12" md="4" lg="4" className="mt-10" style={{padding:"30px"}}>
                    <Card onClick={()=>{getUserInfo(item.id)}}>
                        <Card.Img variant="top" src={item.avatar} width="200px" />
                        <Card.Body>
                        <Card.Title>{item.first_name} {item.last_name}</Card.Title>
                        
                        </Card.Body>
                    </Card>
                    </Col>
              
           )
       }) 
       return result
    }
    const renderUsers=()=>{
        return(
            <Container fluid>
                <Row  className="justify-content-md-center d-flex">
                    <Col xs="12" md="12" lg="12"  className="justify-content-md-center d-flex " style={{marginTop:"20px"}}>
                    <Card style={{ width: '30rem' }} >
                    <Card.Title  className="justify-content-md-center d-flex" >{userInfo.first_name} {userInfo.last_name}</Card.Title>
                        <Card.Img variant="top" src={userInfo.avatar} />
                        <Card.Body>
                        
                        <Card.Text  className="justify-content-md-center d-flex">
                        {userInfo.email}
                        </Card.Text>
                        <Button variant="primary" onClick={()=>handleBack()}>Back</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            
          </Container>
        )
    }
    const handleSorting=(type)=>{
        let array = [...data]
        if(type === "first_name"){
            array.sort((a, b) => {
                let fa = a.first_name.toLowerCase(),
                    fb = b.first_name.toLowerCase();
            
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            });
        }else if(type === "last_name"){
            array.sort((a, b) => {
                let fa = a.last_name.toLowerCase(),
                    fb = b.last_name.toLowerCase();
            
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            });
        }else{
            array.sort((a, b) => {
                return a.id - b.id;
            })
        }
        setData(array)
    }
    return (
        <div class="container" style={{marginTop:"20px"}}>
            {isLoading && spinnerComponent()}
            {!flag && (
            <div>  
                <Container fluid style={{marginLeft:"89.5%"}}>
                    <div className="d-flex">
                    <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Sort By
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=>handleSorting("none")} >None</Dropdown.Item>
                        <Dropdown.Item onClick={()=>handleSorting("first_name")}>First Name</Dropdown.Item>
                        <Dropdown.Item onClick={()=>handleSorting("last_name")} >Last Name</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                    </div>
                   
                   </Container >  
            <Container fluid>
            <Row  className="d-flex" style={{marginTop:"20px"}}>
                {renderData()}
            </Row>
            </Container>
            </div> )   
                }
            {flag && renderUsers()}
         </div>
    )
}
export default TotalCloud;