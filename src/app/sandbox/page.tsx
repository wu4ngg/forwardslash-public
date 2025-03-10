"use client";

import Button from "@/widgets/button";
import Chip from "@/widgets/chip";
import React, { useEffect } from "react";

export default function SandBox() {
  const [jsonValue, setJsonValue] = React.useState({});
  const [arrayValue, setArrayValue] = React.useState<any[]>([]);
  function convertToCSV(objArray: any[]) {
    const array = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    let str = "metrics,value\r\n";

    // Recursive function to flatten the JSON object
    function flattenObject(obj: any, parentKey = "", result: any[] = []) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          const newKey = parentKey ? `${parentKey}.${key}` : key;
          if (typeof obj[key] === "object" && obj[key] !== null) {
            flattenObject(obj[key], newKey, result);
          } else {
            result.push({ key: newKey, value: obj[key] });
          }
        }
      }
      return result;
    }

    // Flatten the JSON object
    const resultArray = flattenObject(array[0]);

    // Extract headers and values
    let currentRoot = "";
    resultArray.forEach(item => {
      const keys = item.key.split(".");
      if (keys[0] !== currentRoot) {
        currentRoot = keys[0];
        str += `${currentRoot}\r\n`;
      }
      keys.forEach((key: any, index: any) => {
        if (index > 0) {
          str += `${key},${index === keys.length - 1 ? item.value : ""}\r\n`;
        }
      });
    });

    return str;
  }

  function downloadCSV(csv: string, filename: string) {
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
  const csv = convertToCSV([jsonValue]);
  // Function to convert the JSON object to an array of key-value pairs with additional metadata
  function convertToArray() {
    // Get all keys of the JSON object
    const keys = Object.keys(jsonValue);

    // Recursive function to flatten the JSON object
    function flattenObject(
      obj: any,
      parentKey = "",
      result: any[] = [],
      level = 0
    ) {
      // Iterate over each key in the object
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          // Create a new key by combining parent key and current key
          const newKey = parentKey ? `${parentKey}.${key}` : key;
          // If the value is an object, recursively flatten it
          if (typeof obj[key] === "object" && obj[key] !== null) {
            flattenObject(obj[key], newKey, result, level + 1);
          } else {
            // Otherwise, push the key-value pair to the result array
            result.push({ key: newKey, value: obj[key], level });
          }
        }
      }
      return result;
    }

    // Flatten the JSON object
    const resultArray = flattenObject(jsonValue);

    // Map the flattened array to a tree view array with additional metadata
    const treeViewArray = resultArray.map((item) => ({
      id: item.key, // Unique identifier for the item
      name: item.key.split(".").pop(), // Name of the item (last part of the key)
      value: item.value, // Value of the item
      level: item.level, // Level of the item in the hierarchy
      parent: item.key.includes(".")
        ? item.key.split(".").slice(0, -1).join(".")
        : null, // Parent key if it exists
    }));

    // Log the tree view array to the console
    console.log(treeViewArray);

    // Return the tree view array
    return treeViewArray;
  }
  useEffect(() => {
    setArrayValue(convertToArray());
  }, [jsonValue]);
  return (
    <div className="">
      <h1>JS Playground xd</h1>
      <textarea
        onChange={(e) => {
          try {
            setJsonValue(JSON.parse(e.target.value));
          } catch (e) {
            const error = e as Error;
            setJsonValue({ error: error.message });
          }
        }}
        className="w-full"
        placeholder="JSON Here..."
      />
      <Button variant="outlined">Export Excel</Button>
      <Button variant="outlined" onClick={() => {downloadCSV(csv, 'csv_test1.csv')}}>Export CSV</Button>
      <h3>CSV</h3>
      <pre>{csv}</pre>
      <h3>CSV Table</h3>
      <table className="p-4 border-4 border-foreground">
        <thead>
          <tr className="">
        {csv.split("\r\n")[0].split(",").map((header, index) => (
          <th key={index} className="border border-foreground">{header}</th>
        ))}
          </tr>
        </thead>
        <tbody>
          {csv.split("\r\n")
        .slice(1)
        .filter(row => row)
        .map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.split(",").map((cell, cellIndex) => (
          <td key={cellIndex} className="border border-foreground">{cell}</td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
      <h3>Json</h3>
      <pre>{JSON.stringify(jsonValue, null, "\t")}</pre>
      <h3>Array</h3>
      <pre>{JSON.stringify(arrayValue, null, "\t")}</pre>
      <h3>Tree</h3>
      {
        // Convert the JSON object to a tree view array and display it as a list
        arrayValue.map((item, index) => {
          const itemCate = item.id.split(".")[0];
          const cateLevelN = item.id.split(".")[item.level - 1];
          const isTopOfCate =
            arrayValue[index - 1]?.id.split(".")[0] !== itemCate;
            const isTopOfLevelN = item.level > 1 && arrayValue[index - 1]?.id.split(".")[item.level - 1] !== cateLevelN;
          return (
            <div
              key={index}
              className=""
              style={{ marginLeft: item.level * 20 }}
            >
              {isTopOfCate && <p>{itemCate}:</p>}
              {isTopOfLevelN && <Chip style={{marginLeft: -(item.level * 20)}} className="w-fit">{cateLevelN}:</Chip>}
              <Chip className="w-fit" key={item.id}>
                <p>
                  {item.name}: {item.value}
                </p>
              </Chip>
            </div>
          );
        })
      }
    </div>
  );
}
