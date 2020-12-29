import React, { useState } from "react";
import V1 from "./v1/App";
import V2 from "./v2/App";
import styles from "./App.module.css";

const components = { v1: V1, v2: V2 };

export default function App() {
  const versions = Object.keys(components);
  const defaultVersion = versions[0];
  const [selectedVersion, setSelectedVersion] = useState(defaultVersion);

  const Component = components[selectedVersion || defaultVersion];

  return (
    <>
      <div>
        {versions.map((version) => (
          <button
            style={version === selectedVersion ? styles.tabActive : styles.tab}
            onClick={() => setSelectedVersion(version)}
            version={version}
          >
            {version}
          </button>
        ))}
      </div>
      <Component />
    </>
  );
}
