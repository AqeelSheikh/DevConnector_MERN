import React,{useState} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {useNavigate} from 'react-router-dom' 
import { addEducation } from '../../actions/profile';

const AddEducation = ({addEducation}) => {
     const navigate = useNavigate();
    const [formData,setFormData]=useState({
     
            school:'',
            degree:'',
            fieldofstudy:'',
            to:'',
            from:'',
            current:'',
            description:'',
      
    });
    const[toDateDisabled,toggleDisabled]=useState(false);
    const {
        school,
        degree,
        fieldofstudy,
        to,
        from,
        current,
        description
    } =formData;
    const onChange=e=>setFormData({
        ...formData,
        [e.target.name]:e.target.value
    });
 
  
    return (
    <>
    <section className="container">
      <h1 className="large text-primary">
       Add Education
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any Degree or Diplomas
         that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e=>{
        e.preventDefault();
        addEducation(formData,navigate);
      }}>
        <div className="form-group">
          <input type="text" placeholder="* school" name="school" value={school} onChange={e=>onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* degree" name="degree" value={degree} onChange={e=>onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="fieldofstudy" name="fieldofstudy" value={fieldofstudy} onChange={e=>onChange(e)}/>
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={e=>onChange(e)} />
        </div>
         <div className="form-group">
          <p><input type="checkbox" name="current" checked={current} value={current} onChange={e=>{setFormData({...formData,current:!current});
               toggleDisabled(!toDateDisabled);
        }} />{' '} Current School</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={e=>onChange(e)} disabled={toDateDisabled ? 'disabled': ''} />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            value={description}
            onChange={e=>onChange(e)}
            cols="30"
            rows="5"
            placeholder="Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
      </form>
    </section>
    </>
  )
}

AddEducation.propTypes = {
    addEducation:PropTypes.func.isRequired
}

export default connect(null,{addEducation})(AddEducation);