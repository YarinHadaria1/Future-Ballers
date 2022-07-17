import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileStats = ({ stats: { team, current, to, from, goalasisst } }) => (
  <div>
    <h3 className="text-dark">{team}</h3>
    <p>
      <Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
      {!to ? " Now" : <Moment format="DD/MM/YYYY">{to}</Moment>}
    </p>

    <p>
      <strong>G/A: </strong> {goalasisst}
    </p>
  </div>
);

ProfileStats.propTypes = {
  stats: PropTypes.object.isRequired,
};

export default ProfileStats;
