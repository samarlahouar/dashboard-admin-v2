
// import { useState } from "react";
import { Menu, Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faArchive } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { faSuitcase, faUsers, faCalendarAlt, faBriefcase, faUserClock, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import logo2 from '../../assets/images/logo2.png';
import './Sidenavbar.css';



function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  const Employer = (
    <FontAwesomeIcon icon={faUser} size="lg" color={color} />
  );
  const archiveemployer = (
    <FontAwesomeIcon icon={faArchive} size="lg" color={color} />
  );

  const Tache = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M9 2C8.44772 2 8 2.44772 8 3C8 3.55228 8.44772 4 9 4H11C11.5523 4 12 3.55228 12 3C12 2.44772 11.5523 2 11 2H9Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 5C4 3.89543 4.89543 3 6 3C6 4.65685 7.34315 6 9 6H11C12.6569 6 14 4.65685 14 3C15.1046 3 16 3.89543 16 5V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V5ZM7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H7.01C7.56228 11 8.01 10.5523 8.01 10C8.01 9.44772 7.56228 9 7.01 9H7ZM10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H10ZM7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15H7.01C7.56228 15 8.01 14.5523 8.01 14C8.01 13.4477 7.56228 13 7.01 13H7ZM10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15H13C13.5523 15 14 14.5523 14 14C14 13.4477 13.5523 13 13 13H10Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const Département = (
    <FontAwesomeIcon icon={faBuilding} size="lg" color={color} />
  );
  const projet = (
    <FontAwesomeIcon icon={faTasks} size="lg" color={color} />
  );

  const Conger = (
    <FontAwesomeIcon icon={faBriefcase} size="lg" color={color} />
  );
  
  const Reunion = (
    <FontAwesomeIcon icon={faUsers} size="lg" color={color} />
  );
  
  const Evenement = (
    <FontAwesomeIcon icon={faCalendarAlt} size="lg" color={color} />
  );
  
  const Reclamation = (
    <FontAwesomeIcon icon={faFileAlt} size="lg" color={color} />
  );
  
  const Archive = (
    <FontAwesomeIcon icon={faSuitcase} size="lg" color={color} />
  );
  
  const Demandedecompte = (
    <FontAwesomeIcon icon={faUserClock} size="lg" color={color} />
  );
  
  
  
  const DemandeAR = (
    <FontAwesomeIcon icon={faUserClock} size="lg" color={color} />
  );

  const CongerAR = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 2C3.44772 2 3 2.44772 3 3V17C3 17.5523 3.44772 18 4 18H16C16.5523 18 17 17.5523 17 17V3C17 2.44772 16.5523 2 16 2H4ZM5 4H15V16H5V4Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 6C6 5.44772 6.44772 5 7 5H9C9.55228 5 10 5.44772 10 6V10C10 10.5523 9.55228 11 9 11H7C6.44772 11 6 10.5523 6 10V6ZM8 7H8.33333V9H8V7ZM11 5H13C13.5523 5 14 5.44772 14 6V12C14 12.5523 13.5523 13 13 13H11C10.4477 13 10 12.5523 10 12V6C10 5.44772 10.4477 5 11 5ZM12 7H11.6667V11H12V7Z"
        fill={color}
      />
    </svg>
  );

  const Dashboard = (
    <FontAwesomeIcon icon={faTachometerAlt} size="lg" color={color} />
  );
  
  const profile = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM10 4C8.34315 4 7 5.34315 7 7C7 8.65685 8.34315 10 10 10C11.6569 10 13 8.65685 13 7C13 5.34315 11.6569 4 10 4ZM16 16C17.1046 16 18 15.1046 18 14C18 11.8579 14.6415 10 10 10C5.35852 10 2 11.8579 2 14C2 15.1046 2.89543 16 4 16H16Z"
        fill={color}
      />
    </svg>
  );

  const signin = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 2C5.44772 2 5 2.44772 5 3V4H4C2.89543 4 2 4.89543 2 6V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V6C18 4.89543 17.1046 4 16 4H15V3C15 2.44772 14.5523 2 14 2C13.4477 2 13 2.44772 13 3V4H7V3C7 2.44772 6.55228 2 6 2ZM6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H14C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7H6Z"
        fill={color}
      ></path>
    </svg>,
  ];
  const Dossiers = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 2C3.44772 2 3 2.44772 3 3V17C3 17.5523 3.44772 18 4 18H16C16.5523 18 17 17.5523 17 17V3C17 2.44772 16.5523 2 16 2H4ZM5 4H15V16H5V4Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 6C6 5.44772 6.44772 5 7 5H9C9.55228 5 10 5.44772 10 6V10C10 10.5523 9.55228 11 9 11H7C6.44772 11 6 10.5523 6 10V6ZM8 7H8.33333V9H8V7ZM11 5H13C13.5523 5 14 5.44772 14 6V12C14 12.5523 13.5523 13 13 13H11C10.4477 13 10 12.5523 10 12V6C10 5.44772 10.4477 5 11 5ZM12 7H11.6667V11H12V7Z"
        fill={color}
      />
    </svg>
  );

  const signup = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      key={0}
    >
      <path
        d="M0,2A2,2,0,0,1,2,0H8a2,2,0,0,1,2,2V8a2,2,0,0,1-2,2H2A2,2,0,0,1,0,8Z"
        transform="translate(4 4)"
        fill={color}
      />
      <path
        d="M2,0A2,2,0,0,0,0,2V8a2,2,0,0,0,2,2V4A2,2,0,0,1,4,2h6A2,2,0,0,0,8,0Z"
        fill={color}
      />
    </svg>,
  ];

  return (
    <>
      <div className="brand">
      <img width={'190px'} height={'60px'} src={logo2} alt="logo" />  
      
      <span class="text-color"  >Admin Page</span>

      </div>
      <hr />
      <Menu theme="light" mode="inline">
     
        <Menu.Item key="1">
          <NavLink to="/Dashboard">
            <span
              className="icon"
              style={{
                background: page === "Dashboard" ? color : "",
              }}
            >
              {Dashboard}
            </span>
            <span className="label">Dashboard</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="4">
          <NavLink to="/Employer">
            <span
              className="icon"
              style={{
                background: page === "Employer" ? color : "",
              }}
            >
              {Employer}
            </span>
            <span className="label">Employée</span>
          </NavLink>
        </Menu.Item>
       
        
        <Menu.Item key="2">
          <NavLink to="/Tache">
            <span
              className="icon"
              style={{
                background: page === "Tache" ? color : "",
              }}
            >
              {Tache}
            </span>
            <span className="label"> Tâche</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/Département">
            <span
              className="icon"
              style={{
                background: page === "Dépatement" ? color : "",
              }}
            >
              {Département}
            </span>
            <span className="label">Département</span>
          </NavLink>
        </Menu.Item>
        
        <Menu.Item key="5">
          <NavLink to="/projet">
            <span
              className="icon"
              style={{
                background: page === "projet" ? color : "",
              }}
            >
              {projet}
            </span>
            <span className="label">Projet</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="6">
          <NavLink to="/Conger">
            <span
              className="icon"
              style={{
                background: page === "Conger" ? color : "",
              }}
            >
              {Conger}
            </span>
            <span className="label">Conger</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="6">
          <NavLink to="/Reunion">
            <span
              className="icon"
              style={{
                background: page === "Reunion" ? color : "",
              }}
            >
              {Reunion}
            </span>
            <span className="label">Réunion</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="6">
          <NavLink to="/Evenement">
            <span
              className="icon"
              style={{
                background: page === "Evenement" ? color : "",
              }}
            >
              {Evenement}
            </span>
            <span className="label">Evènement</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="6">
          <NavLink to="/Reclamation">
            <span
              className="icon"
              style={{
                background: page === "Reclamation" ? color : "",
              }}
            >
              {Reclamation}
            </span>
            <span className="label">Réclamation</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="6">
          <NavLink to="/Demandedecompte">
            <span
              className="icon"
              style={{
                background: page === "Demandedecompte" ? color : "",
              }}
            >
              {Demandedecompte}
            </span>
            <span className="label">Demande de compte </span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="7">
          <NavLink to="/DemandeAR">
            <span
              className="icon"
              style={{
                background: page === "DemandeAR" ? color : "",
              }}
            >
              {DemandeAR}
            </span>
            <span className="label">Demandes Archiver</span>
          </NavLink>
        </Menu.Item>
      
        <Menu.Item key="7">
          <NavLink to="/CongerAR">
            <span
              className="icon"
              style={{
                background: page === "CongerAR" ? color : "",
              }}
            >
              {CongerAR}
            </span>
            <span className="label">Congés Archiver</span>
          </NavLink>
        </Menu.Item>
        
       
        <Menu.Item key="4">
          <NavLink to="/archiveemployer">
            <span
              className="icon"
              style={{
                background: page === "archiveemployer" ? color : "",
              }}
            >
              {archiveemployer}
            </span>
            <span className="label"> Les Employés Archiver</span>
          </NavLink>
          </Menu.Item>

        <Menu.Item key="6">
          <NavLink to="/Archive">
            <span
              className="icon"
              style={{
                background: page === "Archive" ? color : "",
              }}
            >
              {Archive}
            </span>
            <span className="label"> Réclamation Archiver </span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="6">
          <NavLink to="/Dossiers">
            <span
              className="icon"
              style={{
                background: page === "Dossiers" ? color : "",
              }}
            >
              {Dossiers}
            </span>
            <span className="label"> Dossiers </span>
          </NavLink>
        </Menu.Item>
       


       

        <Menu.Item className="menu-item-header" key="5">
          Account Pages
        </Menu.Item>
        <Menu.Item key="6">
          <NavLink to="/profile">
            <span
              className="icon"
              style={{
                background: page === "profile" ? color : "",
              }}
            >
              {profile}
            </span>
            <span className="label">Profile</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="7">
          <NavLink to="/sign-in">
            <span className="icon">{signin}</span>
            <span className="label">Sign up</span>
          </NavLink>
        </Menu.Item>
       
      </Menu>
     
    </>
  );
}

export default Sidenav;
