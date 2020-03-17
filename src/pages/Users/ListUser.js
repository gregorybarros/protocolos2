import React, {useState} from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Image from 'react-bootstrap/Image'
import useri from '../../img/user.svg'
import UserInfo from './UserInfo'



export default function ListUser(props){

  const [showUser, setShowUser] = useState(false);
  const handleCloseUser = () => setShowUser(false);
  const handleShowUser = () => setShowUser(true);

  const [showUserEdit, setShowUserEdit] = useState(false);
  const handleCloseUserEdit = () => setShowUserEdit(false);
  const handleShowUserEdit = () => setShowUserEdit(true);

  const [showUserPhrase, setShowUserPhrase] = useState(false);
  const handleCloseUserPhrase = () => setShowUserPhrase(false);
  const handleShowUserPhrase = () => setShowUserPhrase(true);

  const [user, setUser] = useState('')
  
  function getUser(id) {

    setUser(id)
    handleShowUser()

  }

    return (
        <>
        <UserInfo showUser={showUser} handleCloseUser={handleCloseUser} 
        showUserEdit={showUserEdit} handleCloseUserEdit={handleCloseUserEdit} handleShowUserEdit={handleShowUserEdit}
        showUserPhrase={showUserPhrase} handleCloseUserPhrase={handleCloseUserPhrase} handleShowUserPhrase={handleShowUserPhrase}
    user={user}/>
      <div name='divnavbar' id='divnavbar' className="form-inline m-2">
              {props.users.map(user =>
               <Jumbotron key={user.id}
               className="p-3 pb-5 pt-4 text-dark mt-3 font-weight-bold" 
               style={{background:'#c9ddc7', height:'250px', 
               width:'200px'}}>
                 <div name='divuser' id='divuser'className="d-flex"
                 onClick={e => getUser(user.id)}
                 style={{cursor:'pointer'}}>
                     <Image style={{boxShadow:'0px 10px 10px #0005'}} className="mx-auto mb-3 border border-secondary" src={useri} alt="User" height="120" roundedCircle/>
                 </div>
               <div className="d-flex"><h1 className='text-dark mx-auto'>{user.name}</h1></div>
               <div className="d-flex"><p className="mx-auto">{user.office}</p></div>
             </Jumbotron>
             )}

      </div>

          </>
    )
}

