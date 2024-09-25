import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPdfs, uploadFile } from '../components/Actions/PDF.action';
import './dossiers.css';

const App = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [projet, setProjet] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { files, error } = useSelector((state) => state.pdfs);

  useEffect(() => {
    dispatch(fetchPdfs());
  }, [dispatch]);

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    await dispatch(uploadFile(selectedFiles, projet));
    setSelectedFiles([]); // Clear selected files after upload
    setShowForm(false); // Hide form after successful upload
    dispatch(fetchPdfs()); // Fetch updated files after upload
  };

  const handlePdfClick = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
  };

  // Filter files based on search term
  const filteredFiles = files.filter(file =>
    file.projet && file.projet.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div>
        <input type="text" placeholder="Rechercher un projet" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button onClick={() => setShowForm(true)}>Ajouter</button>
      </div>
      <div>
        {filteredFiles.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Nom de votre fichiers </th>
                <th>Fichier</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((file, index) => (
                <tr key={index}>
                  <td>{file.projet}</td>
                  <td>
                    <a href={file.pdf} onClick={() => handlePdfClick(file.pdf)}>
                      Voir PDF
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Aucun projet trouvé pour "{searchTerm}"</p>
        )}
      </div>
      {showForm && (
        <form onSubmit={handleUpload} encType="multipart/form-data">
          <input type="file" onChange={handleFileChange} name="files" multiple />
          <input type="text" name="projet" value={projet} onChange={(e) => setProjet(e.target.value)} />
          <button type="submit">Ajouter</button>
          <button onClick={() => setShowForm(false)}>Annuler</button>
        </form>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default App;
