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
  Legend,
  ResponsiveContainer,
} from "recharts";

const RevenuePrediction = () => {
  const [predictions, setPredictions] = useState([]);
  const [existingData, setExistingData] = useState([]);
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
    const response = await fetch('/data.csv');
    const csvContent = await response.text();
    console.log("CSV Content:", csvContent); // Log the raw CSV content
    const parsedData = parseCSV(csvContent);
    console.log("Parsed Data:", parsedData); // Log the parsed data
    setExistingData(parsedData);
  };

  const trainAndPredict = async (data, year) => {
    // Load and preprocess data
    const loadData = (data) => {
      const points = [];
      const labels = [];

      data.forEach((row) => {
        if (row.Month !== undefined && row.Year !== undefined && row.Revenue !== undefined) {
          points.push([row.Month, row.Year]);
          labels.push(row.Revenue);
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
      const ys = tf.tensor1d(labels).div(tf.scalar(10000)); // Assuming the revenue range, normalize it

      console.log("xs (normalized):", xs.arraySync());
      console.log("ys (normalized):", ys.arraySync());

      return { xs, ys };
    };

    // Create the model
    const createModel = () => {
      const model = tf.sequential();

      model.add(
        tf.layers.dense({
          units: 8,
          activation: "relu",
          inputShape: [2],
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

    // Predict the revenue for each month
    const predictRevenueForYear = (model, year) => {
      const predictions = [];
      for (let month = 1; month <= 12; month++) {
        // Normalize input for prediction
        const normalizedInput = tf.tensor2d([[month / 12, year / 10000]]);
        console.log("Normalized Input:", normalizedInput.arraySync());

        const prediction = model.predict(normalizedInput);
        const predictionArray = prediction.arraySync();
        console.log(`Prediction for ${month}/${year} (raw):`, predictionArray);

        // Convert the normalized prediction back to original scale
        const predictionValue = prediction.mul(tf.scalar(10000)).arraySync()[0];
        console.log(
          `Prediction Value for ${month}/${year} (original scale):`,
          predictionValue
        );

        // Store the prediction
        predictions.push({ month, year, revenue: Number(predictionValue) }); // Ensure revenue is a number

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

    const yearPredictions = predictRevenueForYear(model, year);
    console.log("Yearly Predictions:", yearPredictions);
    return yearPredictions;
  };

  useEffect(() => {
    loadCSVFromPublicFolder();
  }, []);

  useEffect(() => {
    if (existingData) {
      const fetchPredictions = async () => {
        const result = await trainAndPredict(existingData, 2025); // Predict revenue for each month of 2025
        setPredictions(result);
      };
      fetchPredictions();
    }
  }, [existingData]);

  const existingDataFormatted = existingData.map((item) => ({
    name: `Month ${item.Month}-${item.Year}`,
    actualRevenue: item.Revenue,
  }));

  const predictedDataFormatted = predictions.map((item) => ({
    name: `Month ${item.month}-2025`,
    predictedRevenue: item.revenue,
  }));

  const combinedData = existingDataFormatted.map((existing, index) => ({
    ...existing,
    ...(predictedDataFormatted[index] || {}),
  }));

  console.log("Combined Data:", combinedData); // Log combined data for debugging

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Revenue Prediction for 2025
        </h1>
        {predictions.length > 0 ? (
          <div>
            <h2 className="text-2xl font-semibold text-center mb-4">
              Actual vs Predicted Revenue
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={combinedData}>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {/* Line for actual revenue */}
                <Line
                  type="monotone"
                  dataKey="actualRevenue"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={false}
                />
                {/* Line for predicted revenue */}
                <Line
                  type="monotone"
                  dataKey="predictedRevenue"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-center">Loading predictions...</p>
        )}
      </div>
    </div>
  );
};

export default RevenuePrediction;
