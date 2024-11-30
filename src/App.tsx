import React, { useEffect, useState } from 'react';
import { MessageList } from './components/MessageList';
import { MessageInput } from './components/MessageInput';
import { generateKeyPair } from './utils/crypto';
import { Shield } from 'lucide-react';

function App() {
  const [keyPair, setKeyPair] = useState<CryptoKeyPair | null>(null);

  useEffect(() => {
    const initializeKeys = async () => {
      const newKeyPair = await generateKeyPair();
      setKeyPair(newKeyPair);
    };
    initializeKeys();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-500" />
            <h1 className="text-xl font-semibold text-gray-800">
              Secure Messenger
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto bg-white shadow-lg my-8 rounded-lg flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">
              {keyPair ? 'Encrypted Connection Active' : 'Establishing Secure Connection...'}
            </span>
          </div>
        </div>
        
        <MessageList />
        <MessageInput recipientPublicKey={keyPair?.publicKey || null} />
      </main>
    </div>
  );
}

export default App;