/* eslint-disable jsx-a11y/alt-text */
import './studentAssignmentLayout.css'
import DatabaseICON from '../../../assets/icons/Database.png';
const ProjectDetails = () => {

    return(
        <div className='ProjectDetailsContents'>
            <div><img src={DatabaseICON}/></div>
            <div className='ProjectDetailsText'>Implement a basic user authentication system using SQL. This includes creating tables for storing user data, writing queries 
                for user registration, login, and password management.
            </div>
        </div>
    )
}

export default ProjectDetails;