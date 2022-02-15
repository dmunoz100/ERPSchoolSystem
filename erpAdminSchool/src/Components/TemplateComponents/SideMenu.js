import {Link,Route} from 'react-router-dom'
import {Scholarship} from '../../Pages/Scholarship'
import {Student} from '../../Pages/Student'
import {SchoolSubject} from '../../Pages/SchoolSubject'

export const SideMenu =() => {

    return (
        <div className="wrapper">
    

    <nav id="sidebar-app">
        <div className="sidebar-header">
        <h3><img src={ "https://previews.123rf.com/images/butenkow/butenkow1612/butenkow161204103/67428234-dise%C3%B1o-del-modelo-de-la-escuela-logotipo-ilustraci%C3%B3n-del-vector-del-icono.jpg" } alt="Smiley face" style={{width:"100%"}}></img></h3>
          
        </div>      
        <ul className="list-unstyled sidemenu">
              <div >          
                <li className="nav-item" >                 
                  <Link to={`/`}><i className="i-home"></i>Home</Link>     
                  <Link to={`/Student`}><i className="i-home"></i>Student</Link>    
                  <Link to={`/Scholarship`}><i className="i-home"></i>Scholarship</Link>          
                  <Link to={`/SchoolSubject`}><i className="i-home"></i>School Subject</Link>              
                </li>         
              </div>
        </ul>
      </nav>

        <div id="content-app" >
          <div className="container-fluid body-content">
              <Route exact path={"/Student"} component={Student}></Route>   
              <Route exact path={"/Scholarship"} component={Scholarship}></Route>   
              <Route exact path={"/SchoolSubject"} component={SchoolSubject}></Route>   
          </div>
        </div>  
        </div>  
    );
}