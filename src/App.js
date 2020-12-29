import React, { useState } from "react";
import V1 from "./v1/App";
import V2 from "./v2/App";

const components = { v1: V1, v2: V2 };

export default function App() {
  const versions = Object.keys(components);
  const defaultVersion = versions[0];
  const [version, setVersion] = useState(defaultVersion);

  const Component = components[version || defaultVersion];

  return (
    <>
      <div>
        {versions.map((version) => (
          <button onClick={() => setVersion(version)} version={version}>
            {version}
          </button>
        ))}
      </div>
      <Component />
    </>
  );
}
