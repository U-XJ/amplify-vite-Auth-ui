import React, { useState, useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';

function App() {
  const { signOut } = useAuthenticator();

  // State variables
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Fixed items per page

  // Fetch data on component load
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos'); // Replace with your API
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination handlers
  const handleNextPage = () => {
    if (indexOfLastItem < filteredData.length) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <main style={{ padding: '20px' }}>
      <h1>My Todos</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search todos..."
        value={searchTerm}
        onChange={handleSearch}
        style={{
          marginBottom: '20px',
          padding: '8px',
          width: '100%',
          maxWidth: '400px',
          display: 'block',
        }}
      />

      {/* Responsive Table */}
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            minWidth: '600px',
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: '1px solid black',
                  padding: '8px',
                  background: '#f4f4f4',
                }}
              >
                ID
              </th>
              <th
                style={{
                  border: '1px solid black',
                  padding: '8px',
                  background: '#f4f4f4',
                }}
              >
                Title
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.id}>
                <td
                  style={{
                    border: '1px solid black',
                    padding: '8px',
                    wordWrap: 'break-word',
                  }}
                >
                  {item.id}
                </td>
                <td
                  style={{
                    border: '1px solid black',
                    padding: '8px',
                    wordWrap: 'break-word',
                  }}
                >
                  {item.title}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Buttons */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={indexOfLastItem >= filteredData.length}
          style={{ marginLeft: '10px' }}
        >
          Next
        </button>
      </div>

      {/* Sign Out Button */}
      <button
        onClick={signOut}
        style={{
          marginTop: '20px',
          display: 'block',
          backgroundColor: '#007BFF',
          color: '#fff',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Sign out
      </button>
    </main>
  );
}

export default App;
