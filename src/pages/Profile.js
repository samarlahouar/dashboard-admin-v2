import { useState } from "react";
import { Row, Col, Card, Button, Descriptions, Avatar, Upload, message, Input, Modal,Table } from "antd";
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import BgProfile from "../assets/images/bg-profile.jpg";
import profilavatar from "../assets/images/face-1.png";
import project1 from "../assets/images/home-decor-1.jpeg";
import project2 from "../assets/images/home-decor-2.jpeg";
import project3 from "../assets/images/home-decor-3.jpeg";
import { useDispatch } from 'react-redux';
import { uploadImage,listImages } from '../components/Actions/image.controller';
import { listerCordonnee, editCordonneeAction} from '../../src/components/Actions/cordonnee.actions';
import {deleteImage}from '../components/Actions/image.controller';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios"; // Importez axios
import { Popconfirm } from 'antd'; // Importer Popconfirm
import './profil.css';
import { Image } from "antd";


function Profile() {
  const dispatch = useDispatch();

  const cordonnees = useSelector(state => state.cordonnee.cordonnee.Cordonneelist || []);
  const [uploadedImages, setUploadedImages] = useState([]); // Utilisez useState pour déclarer la variable d'état pour les images téléchargées
  const [selectedImage, setSelectedImage] = useState(null); // Nouvel état pour stocker l'URL de l'image sélectionnée

  useEffect(() => {
    dispatch(listerCordonnee());
  }, [dispatch]);
  
  
  

  const [profileData, setProfileData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    location: '',
  });
  useEffect(() => {
    if (cordonnees.length > 0) {
      setProfileData({
        fullName: cordonnees[0].fullName || '',
        mobile: cordonnees[0].mobile || '',
        email: cordonnees[0].email || '',
        location: cordonnees[0].location || '',
      });
    }
  }, [cordonnees]);


  const handleUpdateProfile = async () => {
    try {
      const { _id } = cordonnees[0]; // Suppose que vous avez déjà l'ID de la première entrée
      await dispatch(editCordonneeAction(_id, profileData));
      message.success("Profile updated successfully");
      dispatch(listerCordonnee())

    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Failed to update profile");
    }
  };
    // Utilisez useEffect pour récupérer les images du localStorage lors du chargement initial
    useEffect(() => {
      const savedImages = JSON.parse(localStorage.getItem('uploadedImages') || '[]');
      setUploadedImages(savedImages);
    }, []);
  
    // Utilisez useEffect pour mettre à jour le localStorage à chaque modification des images
    useEffect(() => {
      localStorage.setItem('uploadedImages', JSON.stringify(uploadedImages));
    }, [uploadedImages]);
  
     // La fonction handleUpload ouvre simplement la modal pour télécharger une image, pas besoin d'appeler fetchImages ici
  const handleUpload = () => {
    setVisible(true); 
  };


  useEffect(() => {
    console.log( "dddd ",profileData);
  }, [profileData]);

  const [id, setId] = useState(null); // State pour stocker l'identifiant

  

  // Utilisez useEffect pour récupérer l'identifiant à partir de la réponse de votre backend
  useEffect(() => {
      fetchData().then(response => {
          setIdFromResponse(response);
      }).catch(error => {
          console.error("Error fetching data:", error);
      });
  }, []);

// Fonction pour mettre à jour l'identifiant à partir de la réponse du backend
const setIdFromResponse = (response) => {
  // Vérifiez si la réponse contient l'identifiant
  if (response && response.data && response.data.id) {
    setId(response.data.id);
  } else {
    console.error("ID not found in response");
  }
};

 useEffect(() => {
  fetchData().then(response => {
    setIdFromResponse(response);
  }).catch(error => {
    console.error("Error fetching data:", error);
  });
}, []);


const fetchData = async () => {
  try {
    const res = await axios.get("http://localhost:3000/cordonnees/lister");
    if (res.status === 200 && res.data && res.data.cordonneelist && res.data.cordonneelist.length > 0) {
      const firstEntry = res.data.cordonnees[0];
      setProfileData({
        fullName: cordonnees[0].fullName || '',
        mobile: cordonnees[0].mobile || '',
        email: cordonnees[0].email || '',
        location: cordonnees[0].location || '',
      });
      setId(cordonnees[0]._id);
    } else {
      console.error("Aucune donnée de profil trouvée");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des données de profil :", error);
  }
};

useEffect(() => {
  fetchData(); // Assurez-vous que fetchData est appelée en premier
}, []);




const [description, setDescription] = useState('');

  const [visible, setVisible] = useState(false); 
  const [filename, setfilename] = useState(''); 
  const [file, setFile] = useState(null); 

 

  
  const [imageURL, setImageURL] = useState(null);

  

  
// Fonction pour gérer l'annulation du téléchargement d'une nouvelle image
const handleModalCancel = () => {
  setVisible(false); 
  setFile(null); 
  setfilename(''); 
};
  // Fonction pour gérer le changement de fichier lors du téléchargement
  const handleChange = (info) => {
    if (info.file.status === 'done') {
      setFile(info.file.originFileObj); 
    }
  };
 
 
  const handleInputChange = (key, value) => {
    setProfileData({ ...profileData, [key]: value });
  };
  const handleViewImage = (path) => {
    // Charger l'image en tant que données binaires
    fetch(path)
      .then(response => response.blob())
      .then(blob => {
        const imageUrl = URL.createObjectURL(blob);
        // Ouvrir l'image dans une nouvelle fenêtre
        window.open(imageUrl, '_blank');
      })
      .catch(error => {
        console.error('Erreur lors du chargement de l\'image :', error);
      });
  };
  
  
  return (
    <>

      <div className="profile-nav-bg" style={{ backgroundImage: `url(${BgProfile})` }}></div>
      
      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
              <Avatar size={74} shape="square" src={profilavatar} style={{ height: "87px", width: "76px", marginLeft: "-4px" }} />

                <div className="avatar-info">
                  <p>CEO / Co-Founder</p>
                </div>
              </Avatar.Group>
            </Col>
          </Row>
        }
      >
        
      </Card>
        <Row gutter={[24, 0]}>
        <Col span={24} md={8} className="mb-24">
        <Card
            bordered={false}
            title={<h6 className="font-semibold m-0"> Modifer votre Profile Information</h6>}
            className="header-solid h-full card-profile-information"
            extra={        <Button type="primary" onClick={handleUpdateProfile}>Modifier</Button>          }
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
          <Input
          value={profileData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          placeholder="Full Name"
          autoSize={{ minRows: 1, maxRows: 2 }}
        />
        <Input
          value={profileData.mobile}
          onChange={(e) => handleInputChange('mobile', e.target.value)}
          placeholder="Mobile"
        /><br></br>
        <Input
          value={profileData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="Email"
        />
        <Input
          value={profileData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          placeholder="Location"
        />
            <hr className="my-25"/>
            {<h6 className="font-semibold m-0"> Profile Information</h6>}<br></br>
            {cordonnees && cordonnees.length > 0 && (
  <>
    <Descriptions.Item label="Full Name" span={3}>Nom et Prenom : {cordonnees[0].fullName} <br></br></Descriptions.Item><br></br>
    <Descriptions.Item label="mobile" span={3}>Numero de Telephone : {cordonnees[0].mobile} <br></br></Descriptions.Item><br></br>
    <Descriptions.Item label="email" span={3}>Adresse E-Mail : {cordonnees[0].email} <br></br></Descriptions.Item><br></br>
    <Descriptions.Item label="location" span={3}>Localisation : {cordonnees[0].location} <br></br></Descriptions.Item><br></br>
  </>
)}
          </Card>
        </Col>
      </Row>
      
   
    
    </>
  );
}

export default Profile;
