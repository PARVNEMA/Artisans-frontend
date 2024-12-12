import React, { useContext, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import { CurrencyContext } from "../../../useContext/CurrencyContext";
import {
  LineChart,
  Line,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

const SalesPrediction = () => {
  const [predictions, setPredictions] = useState([]);
  const [fileData, setFileData] = useState(null);
  const { currency } = useContext(CurrencyContext);

  // Parse CSV content into an array of objects
  const parseCSV = (csvContent) => {
    const lines = csvContent.split("\n").map((line) => line.trim());
    const headers = lines[0].split(",");
    const rows = lines.slice(1);

    const parsedData = rows.map((row) => {
      const values = row.split(",");
      const result = {};
      headers.forEach((header, index) => {
        result[header.trim()] = parseFloat(values[index].trim());
      });
      return result;
    });

    return parsedData;
  };

  // Load the CSV file from the public folder
  const loadCSVFromPublicFolder = async () => {
    const response = await fetch('/data2.csv');
    const csvContent = await response.text();
    console.log("CSV Content:", csvContent); // Log the raw CSV content
    const parsedData = parseCSV(csvContent);
    console.log("Parsed Data:", parsedData); // Log the parsed data
    setFileData(parsedData);
  };

  const trainAndPredict = async (data) => {
    // Load and preprocess data
    const loadData = (data) => {
      const points = [];
      const labels = [];

      data.forEach((row) => {
        if (row.Month !== undefined && row.Sales !== undefined) {
          points.push([row.Month]);
          labels.push(row.Sales);
        }
      });

      console.log("Points:", points);
      console.log("Labels:", labels);

      if (points.length === 0 || labels.length === 0) {
        console.error("Failed to load data. Points or labels array is empty.");
        return { xs: null, ys: null };
      }

      // Normalize data (scaling values between 0 and 1)
      const xs = tf.tensor2d(points).div(tf.scalar(12)); // Month range is 1-12, normalize it
      const ys = tf.tensor1d(labels); // Sales values are already in the required range

      console.log("xs (normalized):", xs.arraySync());
      console.log("ys:", ys.arraySync());

      return { xs, ys };
    };

    // Create the model
    const createModel = () => {
      const model = tf.sequential();

      model.add(
        tf.layers.dense({
          units: 8,
          activation: "relu",
          inputShape: [1],
          kernelInitializer: tf.initializers.randomNormal({ seed: 42 }),
        })
      );
      model.add(
        tf.layers.dense({
          units: 16,
          activation: "relu",
          kernelInitializer: tf.initializers.randomNormal({ seed: 42 }),
        })
      );
      model.add(
        tf.layers.dense({
          units: 1,
          kernelInitializer: tf.initializers.randomNormal({ seed: 42 }),
        })
      );

      model.compile({
        optimizer: tf.train.adam(),
        loss: "meanSquaredError",
        metrics: ["mse"],
      });

      return model;
    };

    // Predict the sales for each month
    const predictSalesForYear = (model) => {
      const predictions = [];
      for (let month = 1; month <= 12; month++) {
        // Normalize input for prediction
        const normalizedInput = tf.tensor2d([[month / 12]]);
        console.log("Normalized Input:", normalizedInput.arraySync());

        const prediction = model.predict(normalizedInput);
        const predictionArray = prediction.arraySync();
        console.log(`Prediction for Month ${month} (raw):`, predictionArray);

        // Store the prediction
        predictions.push({ month, sales: Number(predictionArray[0]) }); // Ensure sales is a number

        // Dispose tensors
        normalizedInput.dispose();
        prediction.dispose();
      }
      return predictions;
    };

    const { xs, ys } = loadData(data);
    if (!xs || !ys) {
      console.error("Failed to load and preprocess data.");
      return [];
    }

    const model = createModel();

    tfvis.show.modelSummary({ name: "Model Architecture" }, model);

    await model.fit(xs, ys, {
      epochs: 100,
      validationSplit: 0.2,
      callbacks: tfvis.show.fitCallbacks(
        { name: "Training Performance" },
        ["loss", "mse"],
        { height: 200, callbacks: ["onEpochEnd"] }
      ),
    });

    const predictions = predictSalesForYear(model);
    console.log("Monthly Predictions:", predictions);
    return predictions;
  };

  useEffect(() => {
    loadCSVFromPublicFolder();
  }, []);

  useEffect(() => {
    if (fileData) {
      const fetchPredictions = async () => {
        const result = await trainAndPredict(fileData); // Predict sales for each month
        setPredictions(result);
      };
      fetchPredictions();
    }
  }, [fileData]);

  const data2 = predictions?.map((prod) => ({
    name: `Month ${prod.month}`, // Adjust the naming convention as needed
    sales: prod.sales,
  }));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {predictions.length > 0 ? (
        <div>
          <h2 className="text-2xl font-semibold">
            Predicted Sales for Each Month:
          </h2>
          {/* <ul className="mt-4">
            {predictions.map((pred) => (
              <li key={pred.month} className="mb-2">
                Month {pred.month}: {typeof pred.sales === "number" ? pred.sales.toFixed(2) : "N/A"}
              </li>
            ))}
          </ul> */}
        </div>
      ) : (
        <p>Loading predictions...</p>
      )}
      <LineChart
        width={600}
        height={400}
        data={data2}
      >
        <Line type="monotone" dataKey="sales" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default SalesPrediction;
