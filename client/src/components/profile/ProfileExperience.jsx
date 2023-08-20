import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileExperience = ({
  experience:{
        company,
        title,
        location,
        from,
        to,
        current,
        description
  }
}) => {
  return (
    <>
    <h3 className='text-dark'>{company}</h3>
    <p>
      <Moment format='YYYY/MM//DD'></Moment> -
      {!to ?'Now':<Moment format='YYYY/MM//DD'>{to}</Moment>}
    </p>
    <p>
    <strong>Position</strong><span> </span> {title}
    </p>
    <p>
    <strong>Discription</strong><span> </span> {description}
    </p>

    </>
  )
}

ProfileExperience.propTypes = {
  experience:PropTypes.array.isRequired
}

export default ProfileExperience
