import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from './cropUtils';

const ImageCropper = ({ imageSrc, onCropComplete, onCancel, aspect = 1 }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [flip, setFlip] = useState({ horizontal: false, vertical: false });
  const [currentAspect, setCurrentAspect] = useState(aspect);
  const [customAspectWidth, setCustomAspectWidth] = useState('');
  const [customAspectHeight, setCustomAspectHeight] = useState('');

  const onCropCompleteCallback = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation,
        flip
      );
      onCropComplete(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, flip, imageSrc, onCropComplete]);

  const handleRotateLeft = () => {
    setRotation(prev => prev - 90);
  };

  const handleRotateRight = () => {
    setRotation(prev => prev + 90);
  };

  const handleFlipHorizontal = () => {
    setFlip(prev => ({ ...prev, horizontal: !prev.horizontal }));
  };

  const handleFlipVertical = () => {
    setFlip(prev => ({ ...prev, vertical: !prev.vertical }));
  };

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setRotation(0);
    setZoom(1);
    setFlip({ horizontal: false, vertical: false });
  };

  const handleAspectChange = (newAspect) => {
    setCurrentAspect(newAspect);
  };

  const handleCustomAspectChange = () => {
    const width = parseFloat(customAspectWidth);
    const height = parseFloat(customAspectHeight);
    if (width > 0 && height > 0) {
      setCurrentAspect(width / height);
    }
  };

  const aspectRatios = [
    { label: '1:1 (Square)', value: 1 },
    { label: '4:3', value: 4/3 },
    { label: '16:9 (Landscape)', value: 16/9 },
    { label: '3:2', value: 3/2 },
    { label: '2:1', value: 2/1 },
    { label: 'Free Form', value: undefined }
  ];

  return (
    <div className="image-cropper-modal">
      <div className="cropper-container">
        <h3>Crop & Edit Image</h3>
        <div className="cropper-toolbar">
          <button onClick={handleRotateLeft} title="Rotate Left">
            ↺ Rotate Left
          </button>
          <button onClick={handleRotateRight} title="Rotate Right">
            ↻ Rotate Right
          </button>
          <button onClick={handleFlipHorizontal} title="Flip Horizontal">
            ⇄ Flip H
          </button>
          <button onClick={handleFlipVertical} title="Flip Vertical">
            ⇅ Flip V
          </button>
          <button onClick={handleReset} title="Reset">
            ⟲ Reset
          </button>
        </div>
        <div className="aspect-ratio-selector">
          <label>Aspect Ratio:</label>
          <div className="aspect-buttons">
            {aspectRatios.map((ratio) => (
              <button
                key={ratio.label}
                className={`aspect-btn ${currentAspect === ratio.value ? 'active' : ''}`}
                onClick={() => handleAspectChange(ratio.value)}
              >
                {ratio.label}
              </button>
            ))}
          </div>
          <div className="custom-aspect">
            <input
              type="number"
              placeholder="Width"
              value={customAspectWidth}
              onChange={(e) => setCustomAspectWidth(e.target.value)}
              min="1"
              step="0.1"
            />
            <span>:</span>
            <input
              type="number"
              placeholder="Height"
              value={customAspectHeight}
              onChange={(e) => setCustomAspectHeight(e.target.value)}
              min="1"
              step="0.1"
            />
            <button onClick={handleCustomAspectChange}>Set Custom</button>
          </div>
        </div>
        <div className="cropper-content">
          <div className="cropper-wrapper">
            <Cropper
              image={imageSrc}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={currentAspect}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropCompleteCallback}
              onZoomChange={setZoom}
              cropShape="rect"
              showGrid={true}
              restrictPosition={false}
              minZoom={0.5}
              maxZoom={3}
              zoomSpeed={0.1}
              style={{
                containerStyle: {
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  background: '#f8f9fa',
                },
                mediaStyle: {
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                },
                cropAreaStyle: {
                  border: '2px solid #ff6600',
                  borderRadius: '4px',
                  boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
                },
              }}
            />
          </div>
          <div className="cropper-controls">
            <div className="control-group">
              <label>Zoom: {zoom.toFixed(1)}x</label>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="zoom-slider"
              />
            </div>
          </div>
        </div>
        <div className="cropper-actions">
          <button className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleCrop}>
            Apply Crop
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
