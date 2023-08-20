import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileEducation = ({
  education:{
    school,
    degree,
    fieldofstudy,
    to,
    from,
    current,
    description
  }
}) => {
  return (
    <>
    <h3 className='text-dark'>{school}</h3>
    <p>
      <Moment format='YYYY/MM//DD'></Moment> -
      {!to ?'Now':<Moment format='YYYY/MM//DD'>{to}</Moment>}
    </p>
    <p>
    <strong>Field of Study</strong><span> </span> {fieldofstudy}
    </p>
    <p>
    <strong>Degree</strong><span> </span> {degree}
    </p>
    <p>
    <strong>Discription</strong><span> </span> {description}
    </p>

    </>
  )
}

ProfileEducation.propTypes = {
  education:PropTypes.array.isRequired
}

export default ProfileEducation
