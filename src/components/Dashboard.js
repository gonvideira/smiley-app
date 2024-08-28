import React, { useEffect, useState, useCallback } from 'react';

const Dashboard = () => {
  const [points, setPoints] = useState(0);
  const [date, setDate] = useState('');

  const getPreviousDayPoints = useCallback(() => {
    const baseId = process.env.REACT_APP_BASE_ID;
    const tableName = 'Daily tasks';
    const viewName = "Grid view";
    const apiKey = process.env.REACT_APP_AIRTABLE_API;

    if (!apiKey) {
      console.error('API key is missing!');
      return;
    }

    const previousDay = new Date();
    previousDay.setDate(previousDay.getDate() - 1);
    setDate(previousDay.toISOString().split('T')[0]);

    
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
        console.log('Previous day:', date);

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
    <div className="center-align section">
      <h5>ℹ️ a tua pontuação ontem foi {points} ℹ️</h5>
    </div>
  );
};

export default Dashboard;
