// components/ExampleComponent.tsx
import { useState } from 'react';
import Popup from './Popup';

const ExampleComponent = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = () => {
    console.log('Submit logic here');
    setShowPopup(false);
  };

  return (
    <div>
      <button 
        className="btn btn-primary"
        onClick={() => setShowPopup(true)}
      >
        Open Local Popup
      </button>

      <Popup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        onSubmit={handleSubmit}
        title="Custom Dialog"
        size="lg"
        submitText="Confirm"
        cancelText="Abort"
        headerClassName="bg-primary text-white"
        submitButtonVariant="success"
      >
        <div className="alert alert-info">
          This content is completely customizable!
        </div>
        <p>You can put any React components here:</p>
        <input 
          type="text" 
          className="form-control"
          placeholder="Example input" 
        />
      </Popup>
    </div>
  );
};
