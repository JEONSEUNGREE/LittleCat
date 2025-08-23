import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';

const MEME_TEMPLATES = [
  { id: 1, name: 'Drake', url: 'https://i.imgflip.com/30b1gx.jpg' },
  { id: 2, name: 'Distracted Boyfriend', url: 'https://i.imgflip.com/1ur9b0.jpg' },
  { id: 3, name: 'Two Buttons', url: 'https://i.imgflip.com/1g8my4.jpg' },
  { id: 4, name: 'Expanding Brain', url: 'https://i.imgflip.com/1jwhww.jpg' },
  { id: 5, name: 'Change My Mind', url: 'https://i.imgflip.com/24y43o.jpg' },
  { id: 6, name: 'Surprised Pikachu', url: 'https://i.imgflip.com/2kbn1e.jpg' },
  { id: 7, name: 'Batman Slapping Robin', url: 'https://i.imgflip.com/9ehk.jpg' },
  { id: 8, name: 'Is This a Pigeon?', url: 'https://i.imgflip.com/1o00in.jpg' },
  { id: 9, name: 'Mocking SpongeBob', url: 'https://i.imgflip.com/1otk96.jpg' },
  { id: 10, name: 'One Does Not Simply', url: 'https://i.imgflip.com/1bij.jpg' },
];

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(MEME_TEMPLATES[0]);
  const [topText, setTopText] = useState('TOP TEXT');
  const [bottomText, setBottomText] = useState('BOTTOM TEXT');
  const [customImage, setCustomImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const memeRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setCustomImage(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomImage(event.target.result);
        setSelectedTemplate(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateMeme = async () => {
    if (!memeRef.current) return;
    
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(memeRef.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
      });
      
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'meme.png';
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      });
    } catch (error) {
      console.error('Error generating meme:', error);
      alert('Error generating meme. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const shareMeme = async () => {
    if (!memeRef.current) return;
    
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(memeRef.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
      });
      
      canvas.toBlob(async (blob) => {
        if (navigator.share && blob) {
          const file = new File([blob], 'meme.png', { type: 'image/png' });
          try {
            await navigator.share({
              title: 'Check out my meme!',
              text: 'Created with Instant Meme Maker',
              files: [file],
            });
          } catch (error) {
            console.log('Share cancelled or not supported');
          }
        } else {
          alert('Sharing is not supported on this device. Download the meme instead!');
        }
      });
    } catch (error) {
      console.error('Error sharing meme:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const resetMeme = () => {
    setTopText('TOP TEXT');
    setBottomText('BOTTOM TEXT');
    setSelectedTemplate(MEME_TEMPLATES[0]);
    setCustomImage(null);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🎭 Instant Meme Maker</h1>
        <p>Create viral memes in seconds!</p>
      </header>

      <div className="meme-container">
        <div className="template-gallery">
          {MEME_TEMPLATES.map((template) => (
            <div
              key={template.id}
              className={`template-item ${selectedTemplate?.id === template.id ? 'active' : ''}`}
              onClick={() => handleTemplateSelect(template)}
            >
              <img src={template.url} alt={template.name} />
            </div>
          ))}
        </div>

        <div className="canvas-wrapper" ref={memeRef}>
          {(selectedTemplate || customImage) && (
            <>
              <img
                src={customImage || selectedTemplate.url}
                alt="Meme template"
                crossOrigin="anonymous"
              />
              <Draggable bounds="parent">
                <div className="meme-text top">{topText}</div>
              </Draggable>
              <Draggable bounds="parent">
                <div className="meme-text bottom">{bottomText}</div>
              </Draggable>
            </>
          )}
          {!selectedTemplate && !customImage && (
            <p style={{ color: '#999' }}>Select a template or upload an image</p>
          )}
        </div>

        <div className="text-controls">
          <div className="input-group">
            <label htmlFor="topText">Top Text</label>
            <input
              id="topText"
              type="text"
              value={topText}
              onChange={(e) => setTopText(e.target.value.toUpperCase())}
              placeholder="Enter top text"
            />
          </div>
          <div className="input-group">
            <label htmlFor="bottomText">Bottom Text</label>
            <input
              id="bottomText"
              type="text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value.toUpperCase())}
              placeholder="Enter bottom text"
            />
          </div>
        </div>

        <div className="button-group">
          <button
            className="btn upload-btn"
            onClick={() => fileInputRef.current?.click()}
          >
            📷 Upload Image
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </button>
          <button
            className="btn btn-primary"
            onClick={generateMeme}
            disabled={isGenerating || (!selectedTemplate && !customImage)}
          >
            {isGenerating ? '⏳ Generating...' : '💾 Download'}
          </button>
          <button
            className="btn btn-share"
            onClick={shareMeme}
            disabled={isGenerating || (!selectedTemplate && !customImage)}
          >
            📤 Share
          </button>
          <button
            className="btn btn-secondary"
            onClick={resetMeme}
          >
            🔄 Reset
          </button>
        </div>
      </div>

      <div style={{ textAlign: 'center', color: 'white', marginTop: '20px', opacity: 0.8 }}>
        <p>💡 Tip: Drag the text to position it perfectly!</p>
      </div>
    </div>
  );
}

export default App;