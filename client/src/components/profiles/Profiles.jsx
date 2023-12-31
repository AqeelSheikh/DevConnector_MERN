import React, {  useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layouts/Spinner'
import ProfilesItem from './ProfilesItem'
import { getAllProfiles } from '../../actions/profile'


const Profiles = ({
    getAllProfiles,
    profile:{profiles,loading}
}) => {

    useEffect(()=>{
        getAllProfiles();
    },[]);
  return (
    <>
    {loading ? <Spinner/> :<>
    <h1 className='large text-primary'>Developers</h1>
    <p className='lead'>
        <i className='fab fa-connectdevelop'></i>
        Browse and connect with Developers
    </p>
    <div className='profiles'>
        {
        profiles.length > 0 ? (
            profiles.map(profile=>(
                <ProfilesItem key={profile._id} profile={profile}/>
            ))
        ) : <h4> No profile found </h4>
        }
    </div>
   
    </>
    }
    </>
  )
}

Profiles.propTypes = {
    getAllProfiles:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired
}
const mapStateToProps=state=>({
    profile:state.profile

})

export default connect(mapStateToProps,{getAllProfiles})(Profiles)