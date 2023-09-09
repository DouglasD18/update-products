import Papaparse from "papaparse";

export function Dropzone() {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(Papaparse.parse(file));
  }

  return (
    <div>
      <h1>Upload dos Arquivos CSV</h1>
      <input type="file" accept=".csv" onChange={ handleFileChange } />
    </div>
  )
}
