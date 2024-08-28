import React, { useEffect, useState, useCallback } from 'react';

const Dashboard = () => {
  const [points, setPoints] = useState(0);

  const getPreviousDayPoints = useCallback(() => {
    const baseId = process.env.REACT_APP_BASE_ID;
    const tableName = 'Daily tasks';
    const viewName = "Grid view";
    const apiKey = process.env.REACT_APP_AIRTABLE_API;

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
        console.log('Fetched data:', data);
        const totalPoints = data.records.reduce((sum, record) => 
          sum + (record.fields['Points net'] || 0), 0
        );

        setPoints(totalPoints);
      })
      .catch(error => console.error('Error fetching points:', error));
  }, []);

  useEffect(() => {
    console.log('Fetching points for the previous day');
    getPreviousDayPoints();
  }, [getPreviousDayPoints]);

  return (
    <div class="container center">
      <div class="col s12 m5">
        <div class="card-panel teal">
          <span class="white-text"><h5>Olá Maria!</h5></span>
          <div className="divider" />
          <span class="white-text">
            <h6>ℹ️ a tua pontuação ontem foi {points} pontos ℹ️</h6>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
