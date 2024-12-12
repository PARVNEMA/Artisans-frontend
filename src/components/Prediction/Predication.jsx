import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";

const RevenuePrediction = () => {
  const [predictions, setPredictions] = useState([]);
  const [fileData, setFileData] = useState(null);

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

  // Read the CSV file selected by the user
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const csvContent = reader.result;
        console.log("CSV Content:", csvContent); // Log the raw CSV content
        const parsedData = parseCSV(csvContent);
        console.log("Parsed Data:", parsedData); // Log the parsed data
        setFileData(parsedData);
      };
      reader.readAsText(file);
    }
  };

  const trainAndPredict = async (data, year) => {
    // Load and preprocess data
    const loadData = (data) => {
      const points = [];
      const labels = [];

      data.forEach((row) => {
        if (
          row.Month !== undefined &&
          row.Year !== undefined &&
          row.Revenue !== undefined
        ) {
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
    if (fileData) {
      const fetchPredictions = async () => {
        const result = await trainAndPredict(fileData, 2025); // Predict revenue for each month of 2025
        setPredictions(result);
      };
      fetchPredictions();
    }
  }, [fileData]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">
        TensorFlow.js Revenue Prediction
      </h1>

      {/* File upload input */}
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-4 p-2 border rounded"
      />

      {predictions.length > 0 ? (
        <div>
          <h2 className="text-2xl font-semibold">
            Predicted Revenue for Each Month in 2025:
          </h2>
          <ul className="mt-4">
            {predictions.map((pred) => (
              <li key={pred.month} className="mb-2">
                Month {pred.month}: $
                {typeof pred.revenue === "number"
                  ? pred.revenue.toFixed(2)
                  : "N/A"}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading predictions...</p>
      )}
    </div>
  );
};

export default RevenuePrediction;
