import React, { useState } from 'react';
import { db, storage } from '../firebaseConfig'; // Adjust path if necessary
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [selectedCertificate, setSelectedCertificate] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [applicantAge, setApplicantAge] = useState('');
  const [applicantAddress, setApplicantAddress] = useState('');
  const [tinNumber, setTinNumber] = useState('');
  const [aadhaarCard, setAadhaarCard] = useState(null); // Aadhaar Card input state
  const [files, setFiles] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCertificateChange = (e) => {
    setSelectedCertificate(e.target.value);
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.id]: e.target.files[0] });
  };

  const handleAadhaarChange = (e) => {
    setAadhaarCard(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!applicantName || !applicantAge || !applicantAddress || !selectedCertificate || !aadhaarCard) {
      setError('Please fill out all required fields, including Aadhaar card.');
      return;
    }

    try {
      // Save text data to Firestore
      const docRef = await addDoc(collection(db, 'applications'), {
        applicantName,
        applicantAge,
        applicantAddress,
        selectedCertificate,
        tinNumber,
      });

      // Save files to Firebase Storage
      const fileUploads = Object.entries(files).map(async ([key, file]) => {
        const fileRef = ref(storage, `files/${docRef.id}/${key}`);
        await uploadBytes(fileRef, file);
      });

      // Upload Aadhaar card file separately
      const aadhaarRef = ref(storage, `files/${docRef.id}/aadhaarCard`);
      await uploadBytes(aadhaarRef, aadhaarCard);

      await Promise.all(fileUploads);

      // Navigate to Thank You page
      navigate('/thankyou');
    } catch (error) {
      console.error("Error submitting application: ", error);
      setError('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="registration-form-container">
      <div className="registration-form">
        <div className="form-group">
          <label htmlFor="certificate">Select Certificate:</label>
          <select
            id="certificate"
            value={selectedCertificate}
            onChange={handleCertificateChange}
          >
            <option value="">Select...</option>
            <option value="income">Income Certificate</option>
            <option value="community">Community Certificate</option>
            <option value="first-graduate">First Graduate Certificate</option>
          </select>
        </div>

        {selectedCertificate && (
          <>
            <div className="form-group">
              <label htmlFor="applicantName">Applicant Name:</label>
              <input
                type="text"
                id="applicantName"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="applicantAge">Applicant Age:</label>
              <input
                type="number"
                id="applicantAge"
                value={applicantAge}
                onChange={(e) => setApplicantAge(e.target.value)}
                placeholder="Enter your age"
              />
            </div>
            <div className="form-group">
              <label htmlFor="applicantAddress">Applicant Address:</label>
              <input
                type="text"
                id="applicantAddress"
                value={applicantAddress}
                onChange={(e) => setApplicantAddress(e.target.value)}
                placeholder="Enter your address"
              />
            </div>

            {/* Aadhaar Card Upload - Common for all certificates */}
            <div className="form-group">
              <label htmlFor="aadhaarCard">Aadhaar Card:</label>
              <input type="file" id="aadhaarCard" onChange={handleAadhaarChange} />
            </div>            

            {selectedCertificate === 'income' && (
              <>
                <div className="form-group">
                  <label htmlFor="tinNumber">TIN Number and Trade:</label>
                  <input
                    type="text"
                    id="tinNumber"
                    value={tinNumber}
                    onChange={(e) => setTinNumber(e.target.value)}
                    placeholder="Enter TIN Number and Trade"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="applicantPhoto">Applicant Photo:</label>
                  <input type="file" id="applicantPhoto" onChange={handleFileChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="addressProof">Any Address Proof:</label>
                  <input type="file" id="addressProof" onChange={handleFileChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="landHoldings">Details of Land Holdings:</label>
                  <input type="file" id="landHoldings" onChange={handleFileChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="housesOwned">Details of Houses Owned (Ward Wise):</label>
                  <input type="file" id="housesOwned" onChange={handleFileChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="familyCard">Family or Smart Card:</label>
                  <input type="file" id="familyCard" onChange={handleFileChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="selfDeclaration">Self-Declaration of Applicant:</label>
                  <input type="file" id="selfDeclaration" onChange={handleFileChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="salaryCertificate">Salary Certificate (Latest Copy):</label>
                  <input type="file" id="salaryCertificate" onChange={handleFileChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="panCard">PAN Card:</label>
                  <input type="file" id="panCard" onChange={handleFileChange} />
                </div>
              </>
            )}

            {selectedCertificate === 'community' && (
              <>
                <div className="form-group">
                  <label htmlFor="photo">Photo:</label>
                  <input type="file" id="photo" onChange={handleFileChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="addressProofCommunity">Any Address Proof:</label>
                  <input type="file" id="addressProofCommunity" onChange={handleFileChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="communityCertificate">Community Certificate of Father or Mother or Siblings:</label>
                  <input type="file" id="communityCertificate" onChange={handleFileChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="selfDeclarationCommunity">Self-Declaration of Applicant:</label>
                  <input type="file" id="selfDeclarationCommunity" onChange={handleFileChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="dncCertificate">DNC Certificate (if applicable):</label>
                  <input type="file" id="dncCertificate" onChange={handleFileChange} />
                </div>
              </>
            )}

            {selectedCertificate === 'first-graduate' && (
              <>
                <div className="form-group">
                  <label htmlFor="photoGraduate">Photo:</label>
                  <input type="file" id="photoGraduate" onChange={handleFileChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="addressProofGraduate">Any Address Proof:</label>
                  <input type="file" id="addressProofGraduate" onChange={handleFileChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="transferCertificate">Applicant Transfer Certificate:</label>
                  <input type="file" id="transferCertificate" onChange={handleFileChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="selfDeclarationFather">Self-Declaration of Father:</label>
                  <input type="file" id="selfDeclarationFather" onChange={handleFileChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="selfDeclarationMother">Self-Declaration of Mother:</label>
                  <input type="file" id="selfDeclarationMother" onChange={handleFileChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="fatherTransferCertificate">Father Transfer Certificate:</label>
                  <input type="file" id="fatherTransferCertificate" onChange={handleFileChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="motherTransferCertificate">Mother Transfer Certificate:</label>
                  <input type="file" id="motherTransferCertificate" onChange={handleFileChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="familyCardGraduate">Family or Smart Card:</label>
                  <input type="file" id="familyCardGraduate" onChange={handleFileChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="selfDeclarationGraduate">Self-Declaration of Applicant:</label>
                  <input type="file" id="selfDeclarationGraduate" onChange={handleFileChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="currentYearCertificates">Current Academic Year Certificates:</label>
                  <input type="file" id="currentYearCertificates" onChange={handleFileChange} />
                </div>
              </>
            )}

            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
