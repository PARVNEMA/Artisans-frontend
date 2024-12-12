/*import React, { useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { SketchPicker } from "react-color";
import * as THREE from "three";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import { saveAs } from "file-saver"; // for exporting designs



const Model = ({ color, patterns }) => {
  const { scene } = useThree();
  const textureRef = useRef(null);



  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    const mtlLoader = new MTLLoader();
    const objLoader = new OBJLoader();
    
    if(selectedTexture){
      textureLoader.load(
        selecetedTexture,
        (texture)=>{
          textureRef.current=texture;
        }
      )
    }
/*
    textureLoader.load(
      "../../../../texture.jpg",
      "public/texture2.jpg" ,
      "public/TCom_LacedKnit4_header.jpg",
      "public/TCom_debris_leaves_dead_header.jpg",// Replace with your actual texture path
      (texture) => {
        textureRef.current = texture;

        mtlLoader.load(
          "../../../../k.mtl",
          (materials) => {
            materials.preload();
            objLoader.setMaterials(materials);

            objLoader.load(
              "../../../../k.obj",
              (object) => {
                object.traverse((child) => {
                  if (child.isMesh) {
                    const material = new THREE.MeshStandardMaterial({
                      map: textureRef.current,
                      color: new THREE.Color(color),
                      side: THREE.DoubleSide,
                    });
                    child.material = material;
                    child.material.needsUpdate = true;
                  }
                });

                object.scale.set(0.2, 0.2, 0.2);
              
                scene.add(object);
              },
              (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
              },
              (error) => {
                console.error("Error loading OBJ model:", error);
              }
            );
          },
          (error) => {
            console.error("Error loading MTL materials:", error);
          }
        );
      },
      undefined,
      (error) => {
        console.error("Error loading texture:", error);
      }
    );
  }, [scene, color,selecetedTexture]);

  return (
    <>
      {patterns.map((pattern, index) => (
        <Draggable key={index}>
          <Resizable
            size={{ width: pattern.width, height: pattern.height }}
            minWidth={50}
            minHeight={50}
            style={{
              position: "absolute",
              top: pattern.top,
              left: pattern.left,
              zIndex: pattern.layer,
              transform: `rotate(${pattern.rotation}deg)`,
            }}
            onResizeStop={(e, direction, ref, delta) => {
              pattern.width = ref.offsetWidth;
              pattern.height = ref.offsetHeight;
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${pattern.image})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                opacity: pattern.opacity,
                backgroundColor: pattern.tintColor,
                transition: pattern.animation ? "all 0.5s ease" : "none",
              }}
            ></div>
            {/* Display text overlay here }
            {pattern.text && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontFamily: pattern.fontFamily,
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: pattern.textColor || "black",
                  whiteSpace: "nowrap",
                }}
              >
                {pattern.text}
              </div>
            )}
          </Resizable>
        </Draggable>
      ))}
    </>
  );
};

const ModelLoader = () => {
  const [color, setColor] = useState("slate");
  const [overlayImage, setOverlayImage] = useState(null);
  const [patterns, setPatterns] = useState([]);
  const [text, setText] = useState("");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [textColor, setTextColor] = useState("black");
  const [backgroundColor, setBackgroundColor] = useState("#fff");
  const [gridVisible, setGridVisible] = useState(true);
  const [patternTint, setPatternTint] = useState("#ffffff");
  const [animationEnabled, setAnimationEnabled] = useState(false);

  const handleOverlayImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setOverlayImage(url);
      setPatterns((prev) => [
        ...prev,
        {
          image: url,
          top: 50,
          left: 50,
          width: 150,
          height: 150,
          opacity: 1,
          rotation: 0,
          layer: prev.length, // Add layers in sequence
        },
      ]);
    }
  };

  const handleRemovePattern = (index) => {
    setPatterns((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddText = () => {
    setPatterns((prev) => [
      ...prev,
      {
        image: null,
        top: 100,
        left: 100,
        width: 150,
        height: 50,
        opacity: 1,
        rotation: 0,
        text: text,
        fontFamily: fontFamily,
        textColor: textColor,
      },
    ]);
  };

  const handleTextChange = (e) => setText(e.target.value);

  const handleFontFamilyChange = (e) => setFontFamily(e.target.value);

  const toggleGrid = () => setGridVisible(!gridVisible);

  const handleSaveDesign = () => {
    const modelData = { patterns, color, backgroundColor };
    const blob = new Blob([JSON.stringify(modelData)], {
      type: "application/json",
    });
    saveAs(blob, "design.json");
  };

  return (
    <>
      <div className="flex">
        <div className="w-20">
          <SketchPicker
            color={color}
            onChangeComplete={(c) => setColor(c.hex)}
            className="mt-4"
          />
        </div>
        <div className="h-full w-full absolute left-[17rem]" style={{ backgroundColor }}>
          <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
            <ambientLight intensity={1.0} />
            <pointLight position={[10, 10, 10]} intensity={1.0} />
            <OrbitControls />
            <Model color={color} patterns={patterns} />
            {gridVisible && (
              <gridHelper args={[100, 100]} position={[0, 0, 0]} />
            )}
          </Canvas>
        </div>
      </div>
      <div className="mt-4">
        <input type="file" accept="image/*" onChange={handleOverlayImageChange} />
        <p className="text-wrap w-[5.5rem]">Upload an image to move, resize, and place over the object.</p>
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Add custom text"
          value={text}
          onChange={handleTextChange}
        />
        <button onClick={handleAddText}>Add Text</button>
      </div>

      <div className="mt-4">
        <label>Font Family</label>
        <select value={fontFamily} onChange={handleFontFamilyChange}>
          <option value="Arial">Arial</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
        </select>
      </div>

      <div className="mt-4">
        <label>Text Color</label>
        <input
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label>Background Color</label>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label>Pattern Tint Color</label>
        <input
          type="color"
          value={patternTint}
          onChange={(e) => setPatternTint(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label>Enable Animations</label>
        <input
          type="checkbox"
          checked={animationEnabled}
          onChange={(e) => setAnimationEnabled(e.target.checked)}
        />
      </div>

      <div className="mt-4">
        <label>Grid Snapping</label>
        <input
          type="checkbox"
          checked={gridVisible}
          onChange={toggleGrid}
        />
      </div>

      <div className="mt-4">
        <button onClick={handleSaveDesign}>Save Design</button>
      </div>

      {patterns.length > 0 &&
        patterns.map((pattern, index) => (
          <div key={index} className="mt-4">
            {pattern.text && (
              <button
                onClick={() => handleRemovePattern(index)}
                style={{ background: "red", color: "white" }}
              >
                Remove Pattern
              </button>
            )}
          </div>
        ))}
    </>
  );
};

export default ModelLoader;*/

import React, { useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { SketchPicker } from "react-color";
import * as THREE from "three";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import { saveAs } from "file-saver"; // for exporting designs

const Model = ({ color, patterns, selectedTexture }) => {
  const { scene } = useThree();
  const textureRef = useRef(null);

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    const mtlLoader = new MTLLoader();
    const objLoader = new OBJLoader();

    if (selectedTexture) {
      textureLoader.load(
        selectedTexture, // Load the currently selected texture
        (texture) => {
          textureRef.current = texture;

          mtlLoader.load(
            "../../../../k.mtl",
            (materials) => {
              materials.preload();
              objLoader.setMaterials(materials);

              objLoader.load(
                "../../../../k.obj",
                (object) => {
                  object.traverse((child) => {
                    if (child.isMesh) {
                      const material = new THREE.MeshStandardMaterial({
                        map: textureRef.current,
                        color: new THREE.Color(color),
                        side: THREE.DoubleSide,
                      });
                      child.material = material;
                      child.material.needsUpdate = true;
                    }
                  });

                  object.scale.set(0.2, 0.2, 0.2);

                  scene.add(object);
                },
                (xhr) => {
                  console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
                },
                (error) => {
                  console.error("Error loading OBJ model:", error);
                }
              );
            },
            (error) => {
              console.error("Error loading MTL materials:", error);
            }
          );
        },
        undefined,
        (error) => {
          console.error("Error loading texture:", error);
        }
      );
    }
  }, [scene, color, selectedTexture]);

  return (
    <>
      {patterns.map((pattern, index) => (
        <Draggable key={index}>
          <Resizable
            size={{ width: pattern.width, height: pattern.height }}
            minWidth={50}
            minHeight={50}
            style={{
              position: "absolute",
              top: pattern.top,
              left: pattern.left,
              zIndex: pattern.layer,
              transform: `rotate(${pattern.rotation}deg)`,
            }}
            onResizeStop={(e, direction, ref, delta) => {
              pattern.width = ref.offsetWidth;
              pattern.height = ref.offsetHeight;
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${pattern.image})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                opacity: pattern.opacity,
                backgroundColor: pattern.tintColor,
                transition: pattern.animation ? "all 0.5s ease" : "none",
              }}
            ></div>
            {/* Display text overlay here */}
            {pattern.text && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontFamily: pattern.fontFamily,
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: pattern.textColor || "black",
                  whiteSpace: "nowrap",
                }}
              >
                {pattern.text}
              </div>
            )}
          </Resizable>
        </Draggable>
      ))}
    </>
  );
};

const ModelLoader = () => {
  const [color, setColor] = useState("slate");
  const [selectedTexture, setSelectedTexture] = useState(
    "../../../../texture.jpg"
  ); 
  const [overlayImage, setOverlayImage] = useState(null);
  const [patterns, setPatterns] = useState([]);
  const [text, setText] = useState("");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [textColor, setTextColor] = useState("black");
  const [backgroundColor, setBackgroundColor] = useState("#fff");
  const [gridVisible, setGridVisible] = useState(true);
  const [patternTint, setPatternTint] = useState("#ffffff");
  const [animationEnabled, setAnimationEnabled] = useState(false);
  const[uploadedTexture,setUploadedTexture]=useState(null);

  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const texture = new TextureLoader().load(url); // Load the texture dynamically
      setUploadedTexture(texture); // Update the texture
    }
  };
  const handleOverlayImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setOverlayImage(url);
      setPatterns((prev) => [
        ...prev,
        {
          image: url,
          top: 50,
          left: 50,
          width: 150,
          height: 150,
          opacity: 1,
          rotation: 0,
          layer: prev.length, // Add layers in sequence
        },
      ]);
    }
  };

  const handleRemovePattern = (index) => {
    setPatterns((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddText = () => {
    setPatterns((prev) => [
      ...prev,
      {
        image: null,
        top: 100,
        left: 100,
        width: 150,
        height: 50,
        opacity: 1,
        rotation: 0,
        text: text,
        fontFamily: fontFamily,
        textColor: textColor,
      },
    ]);
  };

  const handleTextChange = (e) => setText(e.target.value);

  const handleFontFamilyChange = (e) => setFontFamily(e.target.value);

  const toggleGrid = () => setGridVisible(!gridVisible);

  const handleSaveDesign = () => {
    const modelData = { patterns, color, backgroundColor };
    const blob = new Blob([JSON.stringify(modelData)], {
      type: "application/json",
    });
    saveAs(blob, "design.json");
  };
  
  const textureOptions = [
    "../../../../texture.jpg",
    "../../../../texture2.jpg",
    "../../../../TCom_LacedKnit4_header.jpg",
    "../../../../TCom_debris_leaves_dead_header.jpg",
  ];
  

  return (
    <>
      <div className="flex">
        <div className="w-20">
          <SketchPicker
            color={color}
            onChangeComplete={(c) => setColor(c.hex)}
            className="mt-4"
          />
        </div>
        <div
          className="h-full w-full absolute left-[17rem]"
          style={{ backgroundColor: "#fff" }}
        >
          <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
            <ambientLight intensity={1.0} />
            <pointLight position={[10, 10, 10]} intensity={1.0} />
            <OrbitControls />
            <Model
              color={color}
              patterns={patterns}
              selectedTexture={selectedTexture}
            />
            <gridHelper args={[100, 100]} position={[0, 0, 0]} />
          </Canvas>
        </div>
      </div>
      <div className="mt-4">
        <label>Select Texture:</label>
        <select
          value={selectedTexture}
          onChange={(e) => setSelectedTexture(e.target.value)}
        >
          {textureOptions.map((texture, index) => (
            <option key={index} value={texture}>
              Texture {index + 1}
            </option>
          ))}
        </select>
      </div>
    
    
      <div className="flex">
        
       
        
      </div>
      <div className="mt-4">
        <input type="file" accept="image/*" onChange={ handleImageUpload} />
        <p className="text-wrap w-[5.5rem]">Upload an image to move, resize, and place over the object.</p>
      </div>
      
    
      <div className="mt-4">
        <input
          type="text"
          placeholder="Add custom text"
          value={text}
          onChange={handleTextChange}
        />
        <button onClick={handleAddText}>Add Text</button>
      </div>

      <div className="mt-4">
        <label>Font Family</label>
        <select value={fontFamily} onChange={handleFontFamilyChange}>
          <option value="Arial">Arial</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
        </select>
      </div>

      <div className="mt-4">
        <label>Text Color</label>
        <input
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label>Background Color</label>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label>Pattern Tint Color</label>
        <input
          type="color"
          value={patternTint}
          onChange={(e) => setPatternTint(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label>Enable Animations</label>
        <input
          type="checkbox"
          checked={animationEnabled}
          onChange={(e) => setAnimationEnabled(e.target.checked)}
        />
      </div>

      <div className="mt-4">
        <label>Grid Snapping</label>
        <input
          type="checkbox"
          checked={gridVisible}
          onChange={toggleGrid}
        />
      </div>

      <div className="mt-4">
        <button onClick={handleSaveDesign}>Save Design</button>
      </div>

      {patterns.length > 0 &&
        patterns.map((pattern, index) => (
          <div key={index} className="mt-4">
            {pattern.text && (
              <button
                onClick={() => handleRemovePattern(index)}
                style={{ background: "red", color: "white" }}
              >
                Remove Pattern
              </button>
            )}
          </div>
 ))}
    </>
  );
};

export default ModelLoader;
