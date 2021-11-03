import React from "react";
import "./Reports.css";
import { connect } from "react-redux";
const mapStateToProps = (state) => ({
  tickets: state.ticketAdminOnly.tickets,
  searchQuery: state.searchValue.searchQuery,
  currentUser: state.currentUser,
  sortKeys: state.sortingKey,
});
const Reports = () => {
  return (
    <div className="reports">
      <div className="chart">
        {/*  <h3 className="chartTitle">{title}</h3>
        <ResponsiveContainer width="100%" aspect={4 / 1}>
          <LineChart tickets={tickets}>
            <XAxis dataKey="createdAt" stroke="#5550bd" />
            <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
            <Tooltip />
            {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
          </LineChart>
        </ResponsiveContainer> */}
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Reports);
