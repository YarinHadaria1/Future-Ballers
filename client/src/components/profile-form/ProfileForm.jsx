import React, { Fragment, useState, useEffect } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

/*
  NOTE: declare initialState outside of component
  so that it doesn't trigger a useEffect
  we can then safely use this to construct our profileData
 */
const initialState = {
  team: "",
  video: "",
  country: "",
  age: "",
  status: "",
  skills: "",
  bio: "",
  twitter: "",
  facebook: "",
  linkedin: "",
  youtube: "",
  instagram: "",
};

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
}) => {
  const [formData, setFormData] = useState(initialState);

  const creatingProfile = useMatch("/create-profile");

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) getCurrentProfile();

    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }

      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(", ");

      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    team,
    video,
    country,
    age,
    status,
    skills,
    bio,
    twitter,
    facebook,
    youtube,
    instagram,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, navigate, profile ? true : false);
  };

  return (
    <section className="container">
      <h1 className="large text-primary">
        {creatingProfile ? "Create Your Profile" : "Edit Your Profile"}
      </h1>
      <p className="lead">
        <i className="fas fa-user" />
        {creatingProfile
          ? ` Let's get some information to make your football profile`
          : " Add some changes to your profile"}
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <select name="status" value={status} onChange={onChange}>
            <option>* Select Your Position</option>
            <option value="GK">GK</option>
            <option value="Right-Back">Right-Back</option>
            <option value="Left-Back">Left-Back</option>
            <option value="Central Defender">Central Defender</option>
            <option value="Central Defensive Midfielder">
              Central Defensive Midfielder
            </option>
            <option value="Central Midfielder">Central Midfielder</option>
            <option value="Central Attacking Midfielder">
              Central Attacking Midfielder
            </option>
            <option value="Left-Wing">Left-Wing</option>
            <option value="Right-Wing">Right-Wing</option>
            <option value="Striker">Striker</option>
          </select>
          <small className="form-text">Your current or favorite position</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Team/Academy"
            name="team"
            value={team}
            onChange={onChange}
          />
          <small className="form-text">Your current team or academy</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Age"
            name="age"
            value={age}
            onChange={onChange}
          />
          <small className="form-text">Your age</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Highlights Video"
            name="video"
            value={video}
            onChange={onChange}
          />
          <small className="form-text">
            Share a video with your highlights
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={country}
            onChange={onChange}
          />
          <small className="form-text">Country</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={onChange}
          />
          <small className="form-text">
            Share your skills and special abilities. Please use comma separated
            values (eg. Cut down the middle, Deadly Finisher, Aggressive Tackler
            )
          </small>
        </div>

        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={onChange}
          />
          <small className="form-text">
            Tell us about you as a person and teammate
          </small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x" />
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x" />
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x" />
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x" />
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={onChange}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);
