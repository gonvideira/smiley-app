import React, { useEffect, useState, useCallback } from 'react';

const Dashboard = () => {
  const [previousDayPoints, setPreviousDayPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const baseId = process.env.REACT_APP_BASE_ID;
  const apiKey = process.env.REACT_APP_AIRTABLE_API;

  const getPreviousDayPoints = useCallback((baseId, apiKey) => {
    const tableName = 'Daily tasks';
    const viewName = "Grid view";

    if (!apiKey) {
      console.error('API key is missing!');
      return;
    }

    const filterFormula = `IS_SAME({Date}, DATEADD(TODAY(), -1, 'days'))`;
    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?view=${encodeURIComponent(viewName)}&filterByFormula=${encodeURIComponent(filterFormula)}`;

    const options = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      }
    };

    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        const totalPoints = data.records.reduce((sum, record) =>
          sum + (record.fields['Points net'] || 0), 0
        );

        setPreviousDayPoints(totalPoints);
      })
      .catch(error => console.error('Error fetching points:', error));
  }, []);

  const getTotalPoints = useCallback((baseId, apiKey) => {
    const tableName = 'Members';

    if (!apiKey) {
      console.error('API key is missing!');
      return;
    }

    // const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?view=${encodeURIComponent(viewName)}`;
    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}/recySVLTrN1isEdbE`;

    const options = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      }
    };

    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        const totalPoints = data.fields['Total Points net'];

        setTotalPoints(totalPoints);
      })
      .catch(error => console.error('Error fetching points:', error));
  }, []);

  useEffect(() => {
    getPreviousDayPoints(baseId, apiKey);
    getTotalPoints(baseId, apiKey);
  }, [getPreviousDayPoints, getTotalPoints, baseId, apiKey]);

  return (
    <div className="container center">
      <div className="col s12 m6 l2">
        <div className="card-panel teal">
          <div className="row">
            <span className="white-text"><h5>Olá<br/>Maria!</h5></span>
          </div>
          <div className="divider" />
          <div className="row section">
            <div className="col s12 m6">
              <span className="white-text">
                <i className="medium material-icons">account_balance_wallet</i>
                <h6>ONTEM: {previousDayPoints} pontos</h6>
              </span>
            </div>
            <div className="col s12 m6">
              <span className="white-text">
                <i className="medium material-icons">account_balance</i>
                <h6>TOTAL: {totalPoints} pontos</h6>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
