import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addStats } from "../../actions/profile";

const AddStatistics = ({ addStats }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    team: "",
    season: "",
    goalasisst: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const { team, season, goalasisst, from, to, description, current } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section className="container">
      <h1 className="large text-primary">Add Your Statistics</h1>
      <p className="lead">
        <i className="fas fa-futbol" /> Add your previous seasons stats
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addStats(formData, navigate);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* Team or Academy"
            name="team"
            value={team}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Season"
            name="season"
            value={season}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter your G/A in that season"
            name="goalasisst"
            value={goalasisst}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={onChange} />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={() => setFormData({ ...formData, current: !current })}
            />{" "}
            Current Team or Academy
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={onChange}
            disabled={current}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Season Summary "
            value={description}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  );
};

AddStatistics.propTypes = {
  addStats: PropTypes.func.isRequired,
};

export default connect(null, { addStats })(AddStatistics);
