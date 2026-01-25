const CatLoader = ({ isWakingUp }) => {
  return (
    <div
      className="flex flex-col items-center justify-center w-full relative"
      style={{
        minHeight: 'calc(100vh - var(--navbar-height))',
        paddingTop: 'var(--navbar-height)',
        paddingBottom: '80px'
      }}
    >
      <div className={`cat-wrapper ${isWakingUp ? 'waking' : 'sleeping'}`}>
        {/* Ears behind */}
        <div className="ear left" />
        <div className="ear right" />

        {/* Main body */}
        <div className="cat-body">
          <div className="cat-face">
            <div className="eyes">
              <div className="eye left" />
              <div className="eye right" />
            </div>
            <div className="nose" />
          </div>
        </div>

        {/* Tail */}
        <div className="cat-tail" />

        {!isWakingUp && (
          <div className="status-indicator zzzs">
            <span className="z-1">z</span>
            <span className="z-2">Z</span>
            <span className="z-3">z</span>
            <span className="z-4">Z</span>
          </div>
        )}
      </div>

      <style>{`
        .cat-wrapper {
          position: relative;
          width: 120px;
          height: 120px;
          transition: transform 0.5s ease;
        }

        /* Ears - simple triangular shapes */
        .ear {
          position: absolute;
          top: 8px;
          width: 24px;
          height: 30px;
          background: var(--text-primary);
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          transition: background 0.6s ease;
          z-index: 1;
        }
        
        .cat-wrapper.waking .ear {
          background: #4F46E5;
        }
        
        .ear.left { 
          left: 18px;
          transform: rotate(-15deg);
        }
        .ear.right { 
          right: 18px;
          transform: rotate(15deg);
        }

        /* Main round body */
        .cat-body {
          position: absolute;
          top: 20px;
          left: 10px;
          width: 100px;
          height: 100px;
          background: var(--text-primary);
          border-radius: 50%;
          transition: background 0.6s ease, transform 0.5s ease, box-shadow 0.6s ease;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          z-index: 2;
        }

        .cat-wrapper.sleeping .cat-body {
          animation: breathe 3s infinite ease-in-out;
        }

        .cat-wrapper.waking .cat-body {
          background: var(--gradient-primary);
          box-shadow: 0 12px 32px rgba(124, 58, 237, 0.4);
        }
        
        .cat-wrapper.waking {
          animation: gentle-bounce 0.6s infinite alternate ease-in-out;
        }

        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }

        @keyframes gentle-bounce {
          from { transform: translateY(0); }
          to { transform: translateY(-15px); }
        }

        /* Tail - simple curved line */
        .cat-tail {
          position: absolute;
          bottom: 28px;
          right: 5px;
          width: 35px;
          height: 35px;
          border: 5px solid var(--text-primary);
          border-radius: 50%;
          border-top-color: transparent;
          border-left-color: transparent;
          transform: rotate(50deg);
          transition: border-color 0.6s ease;
          z-index: 1;
        }

        .cat-wrapper.waking .cat-tail {
          border-bottom-color: #7C3AED;
          border-right-color: #7C3AED;
        }

        /* Face */
        .cat-face {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 3;
        }
        
        .eyes {
          display: flex;
          gap: 32px;
          margin-bottom: 8px;
        }

        .eye {
          width: 14px;
          height: 4px;
          background: var(--bg-primary);
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .cat-wrapper.waking .eye {
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: white;
        }

        .nose {
          width: 12px;
          height: 8px;
          background: pink;
          border-radius: 0 0 10px 10px;
          opacity: 0.9;
        }

        /* ZZZs */
        .status-indicator {
          position: absolute;
          top: -50px;
          right: -40px;
          width: 60px;
          height: 60px;
          z-index: 4;
        }
        
        .status-indicator span {
          position: absolute;
          font-family: 'Comic Sans MS', sans-serif;
          font-weight: 900;
          color: var(--text-secondary);
          opacity: 0;
          animation: float-z 2.5s infinite linear;
        }
        
        .z-1 { font-size: 20px; right: 20px; animation-delay: 0s; }
        .z-2 { font-size: 16px; right: 0px; top: 10px; animation-delay: 0.8s; }
        .z-3 { font-size: 24px; right: 30px; top: -10px; animation-delay: 1.6s; }
        .z-4 { font-size: 14px; right: 10px; top: 20px; animation-delay: 2.2s; }

        @keyframes float-z {
          0% { transform: translateY(0) translateX(0) scale(0.5); opacity: 0; }
          20% { opacity: 0.8; }
          100% { transform: translateY(-40px) translateX(15px) scale(1.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default CatLoader;
