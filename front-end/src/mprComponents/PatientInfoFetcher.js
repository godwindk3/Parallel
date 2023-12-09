import React, { useState, useEffect } from 'react';
import './PatientInfoFetcher.css'
const PatientInfoFetcher = () => {
  const [patientInfo, setPatientInfo] = useState(null);

  useEffect(() => {
    // Fetch patient information from the API
    fetchPatientInfo();
  }, []);

  const fetchPatientInfo = async () => {
    try {
      const response = await fetch('/get_info'); // Replace with your API endpoint
      if (response.ok) {
        const data = await response.json();
        setPatientInfo(data);
      } else {
        console.error('Failed to fetch patient information:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='patient-infor' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Patient Information</h2>
      {patientInfo ? (
        <table style={{ margin: 'auto' }} >
          <tbody>
            <tr>
              <td>Patient Name:</td>
              <td>{patientInfo.PatientName}</td>
            </tr>
            <tr>
              <td>Patient ID:</td>
              <td>{patientInfo.PatientID}</td>
            </tr>
            <tr>
              <td>Modality:</td>
              <td>{patientInfo.Modality}</td>
            </tr>
            <tr>
              <td>Image Size :</td>
              <td>{patientInfo.Rows} x {patientInfo.Columns}</td>
            </tr>
            <tr>
              <td>Pixel Spacing:</td>
              <td>{patientInfo.PixelSpacing.join(', ')}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading patient information...</p>
      )}
    </div>
  );
};

export default PatientInfoFetcher;
