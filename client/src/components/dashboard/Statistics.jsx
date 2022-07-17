import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteStats } from "../../actions/profile";

const Statistics = ({ stats, deleteStats }) => {
  const statss = stats.map((sta) => (
    <tr key={sta._id}>
      <td>{sta.team}</td>
      <td className="hide-sm">{sta.season}</td>
      <td>{sta.goalasisst}</td>
      <td>
        <button onClick={() => deleteStats(sta._id)} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <>
      <h2 className="my2">Statistics</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Team/Academy</th>
            <th className="hide-sm">Seasons</th>
            <th className="hide-sm">G/A</th>
            <th />
          </tr>
        </thead>
        <tbody>{statss}</tbody>
      </table>
    </>
  );
};

Statistics.propTypes = {
  stats: PropTypes.array.isRequired,
  deleteStats: PropTypes.func.isRequired,
};

export default connect(null, { deleteStats })(Statistics);
