
import { useState } from 'react';
import './App.css'
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const [userData, setUserData] = useState(null);
  const [bgColor, setBgColor] = useState('white');
 
  const fetchRandomUser = async () => {
   try {
     const response = await axios.get('https://dummyjson.com/users');
     // Assuming the response.data is an array of users, choose a random user
     const randomUser = response.data.users[Math.floor(Math.random() * response.data.users.length)];
     setUserData(randomUser);
   } catch (error) {
     console.error('Error fetching user data:', error);
   }
 };
 
  const generateRandomColor = () => {
     const letters = '0123456789ABCDEF';
     let color = '#';
     for (let i = 0; i < 6; i++) {
       color += letters[Math.floor(Math.random() * 16)];
     }
     setBgColor(color);
  };
 
  useEffect(() => {
     fetchRandomUser();
     generateRandomColor();
  }, []);
 
  const handleRefresh = () => {
     fetchRandomUser();
     generateRandomColor();
  };

  return (
    <>
      <div  className='main'>
        <div style={{ backgroundColor: bgColor,width:'100%',height:'100vh'}} className='d-flex justify-content-center align-items-center'>
          {userData ? (
            <div style={{width:'600px',height:'600px',background:'pink'}}>
            <div className='row'>
            <div  className='col-lg-6'>
              <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
              <img className='rounded' style={{width:'150px'}} src={userData.image} alt="" />
              <h4>{userData.firstName} {userData.lastName}</h4>
              <span>{userData.gender}</span>
              </div>
              <div className='d-flex justify-content-between mt-5 ms-5'>
              <div>
                <h5>Birth Date</h5>
                <span>{userData.birthDate}</span>
              </div>
              <div>
                <h5>Age</h5>
                <span>{userData.age}</span>
              </div>
              </div>
              <div className='d-flex justify-content-between mt-5 ms-5' >
              <div>
                <h5>Weight</h5>
                <span>{userData.weight}</span>
              </div>
              <div>
              <h5>Height</h5>
                <span>{userData.height}</span>
              </div>
              </div>
              <div className='d-flex justify-content-center align-items-center mt-5'>
                <button onClick={handleRefresh}  className='btn btn-info'>Refresh</button>
              </div>
            </div>
            <div className="col-lg-6">
              <ul className=''>
                <li className='mt-5 ms-5  list-unstyled '>Home Address</li>
                <li className=' ms-5 list-unstyled '>{userData.address.address}</li>
                <li className='mt-5 ms-5 list-unstyled '>Mobile Phone</li>
                <li className=' ms-5 list-unstyled '>{userData.phone}</li>
                <li className='mt-5 ms-5 list-unstyled'  >Company</li>
                <li className=' ms-5 list-unstyled '>{userData.company.name}</li>
                <li className='mt-5 ms-5 list-unstyled '>Job Title</li>
                <li className=' ms-5 list-unstyled '>{userData.company.title}</li>
                <li className='mt-5 ms-5 list-unstyled '>Email</li>
                <li className=' ms-5 list-unstyled '>{userData.email}</li>
              </ul>
            </div>
            </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
       </div>
</div>
    </>
  )
}

export default App
