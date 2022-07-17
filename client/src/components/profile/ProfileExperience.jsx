import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({
  experience: { team, position, country, current, to, from, description },
}) => (
  <div>
    <h3 className="text-dark">{team}</h3>
    <p>
      <Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
      {!to ? " Now" : <Moment format="DD/MM/YYYY">{to}</Moment>}
    </p>
    <p>
      <strong>Position: </strong> {position}
    </p>
    <p>
      <strong>Country: </strong> {country}
    </p>
  </div>
);

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
