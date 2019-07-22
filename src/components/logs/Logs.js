import React, { useState, useEffect } from 'react'

const Logs = () => {
  const [logs, setLogs] = useState([]); // create state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLogs();
    //eslint-disable-next-line
  }, []);

  const getLogs = async () => {
    setLoading(true);
    const res = await fetch('/logs');
    const data = await res.json();

    setLogs(data);
    setLoading(false);
  }

  if(loading){
    return <h3>loading... </h3>
  }

  return (
    <ul className="collection-with-header">
      <li className="collection-header">
        <h4 className="center">System logs</h4>
      </li>
      {!loading && logs.length === 0 ? (<p className="center">No logs to show... </p>) 
      : (logs.map(log => <li>{log.message}</li>))
      }
      
    </ul>
  )
}

export default Logs
