import React, { useEffect } from 'react';
import '../styles/BookingModal.css';

const BookingModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    // Load Cal.com script when component mounts if not already loaded
    if (isOpen) {
      if (!window.Cal) {
        (function (C, A, L) { 
          let p = function (a, ar) { a.q.push(ar); }; 
          let d = C.document; 
          C.Cal = C.Cal || function () { 
            let cal = C.Cal; 
            let ar = arguments; 
            if (!cal.loaded) { 
              cal.ns = {}; 
              cal.q = cal.q || []; 
              d.head.appendChild(d.createElement("script")).src = A; 
              cal.loaded = true; 
            } 
            if (ar[0] === L) { 
              const api = function () { p(api, arguments); }; 
              const namespace = ar[1]; 
              api.q = api.q || []; 
              if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); 
              return;
            } 
            p(cal, ar); 
          }; 
        })(window, "https://app.cal.com/embed/embed.js", "init");
        
        window.Cal("init", "30min", {origin:"https://app.cal.com"});
      }

      // Initialize the inline booking widget
      window.Cal.ns["30min"]("inline", {
        elementOrSelector:"#my-cal-inline-30min",
        config: {"layout":"month_view"},
        calLink: "rohan-mahesh/30min",
      });

      window.Cal.ns["30min"]("ui", {"hideEventTypeDetails": false, "layout": "month_view"});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="booking-modal-overlay" onClick={onClose}>
      <div className="booking-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="booking-modal-close" onClick={onClose}>
          ✕
        </button>
        <div className="booking-modal-body">
          <div id="my-cal-inline-30min" className="cal-embed-container"></div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
