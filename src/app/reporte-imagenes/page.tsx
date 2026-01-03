export default async function ImageReportPage() {
  interface Driver {
    driverId: string;
    givenName: string;
    familyName: string;
  }

  interface Constructor {
    constructorId: string;
    name: string;
  }

  let drivers: Driver[] = [];
  let constructors: Constructor[] = [];

  try {
    // Fetch para pilotos
    const driversRes = await fetch('http://api.jolpi.ca/ergast/f1/2025/drivers.json?limit=100', { next: { revalidate: 3600 } });
    if (!driversRes.ok) {
      console.error('Error fetching drivers:', driversRes.statusText);
    } else {
      const driversData = await driversRes.json();
      drivers = driversData.MRData.DriverTable.Drivers || [];
    }

    // Fetch para constructores
    const constructorsRes = await fetch('http://api.jolpi.ca/ergast/f1/2025/constructors.json?limit=100', { next: { revalidate: 3600 } });
    if (!constructorsRes.ok) {
      console.error('Error fetching constructors:', constructorsRes.statusText);
    } else {
      const constructorsData = await constructorsRes.json();
      constructors = constructorsData.MRData.ConstructorTable.Constructors || [];
    }
  } catch (error) {
    console.error("Error fetching data for image report:", error);
    // drivers y constructors permanecerán como arrays vacíos
  }

  const mappedDrivers = drivers.map(driver => ({
    name: `${driver.givenName} ${driver.familyName}`,
    id: driver.driverId,
    expectedPath: `/imagenes/pilotos/${driver.driverId}.png`,
  }));

  const mappedConstructors = constructors.map(constructor => ({
    name: constructor.name,
    id: constructor.constructorId,
    expectedPath: `/imagenes/escuderias/${constructor.constructorId}.png`,
  }));

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', backgroundColor: '#f5f5f5', color: '#333' }}>
      <h1 style={{ color: '#000', marginBottom: '20px' }}>Reporte de Nombres de Archivos de Imagen (Direct API)</h1>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#000', marginBottom: '15px' }}>Pilotos</h2>
        <p style={{ marginBottom: '10px', fontSize: '0.9em' }}>Total encontrados: {mappedDrivers.length}</p>
        {mappedDrivers.length === 0 ? (
          <p>No se encontraron pilotos.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <thead style={{ backgroundColor: '#eee' }}>
              <tr>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Nombre</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>ID de API</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Ruta de Imagen Esperada</th>
              </tr>
            </thead>
            <tbody>
              {mappedDrivers.map((item) => (
                <tr key={item.id}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.name}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.id}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.expectedPath}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div>
        <h2 style={{ color: '#000', marginBottom: '15px' }}>Escuderías</h2>
        <p style={{ marginBottom: '10px', fontSize: '0.9em' }}>Total encontrados: {mappedConstructors.length}</p>
        {mappedConstructors.length === 0 ? (
          <p>No se encontraron escuderías.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <thead style={{ backgroundColor: '#eee' }}>
              <tr>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Nombre</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>ID de API</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Ruta de Imagen Esperada</th>
              </tr>
            </thead>
            <tbody>
              {mappedConstructors.map((item) => (
                <tr key={item.id}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.name}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.id}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.expectedPath}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
