import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
  profile: {
    video,
    status,
    team,
    country,
    social,
    user: { name, avatar },
  },
}) => {
  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={avatar} alt="" />
      <h1 className="large">{name}</h1>
      <p className="lead">
        {status} {team ? <span> at {team}</span> : null}
      </p>
      <p>{country ? <span>{country}</span> : null}</p>
      <div className="icons my-1">
        {video ? (
          <a href={video} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x" />
          </a>
        ) : null}
        {social
          ? Object.entries(social)
              .filter(([_, value]) => value)
              .map(([key, value]) => (
                <a
                  key={key}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`fab fa-${key} fa-2x`}></i>
                </a>
              ))
          : null}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
