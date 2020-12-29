import React, { useState } from "react";

const components = { v1: "", v2: "" };

export default function App() {
  const versions = Object.keys(components);
  const [version, setVersion] = useState(versions[0]);

  return (
    <>
      {versions.map((version) => (
        <button onClick={() => setVersion(version)} version={version}>
          {version}
        </button>
      ))}
    </>
  );
}
