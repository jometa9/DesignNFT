import React, { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

function WagmiWalletButton() {
  const [isModalOpen, setModalOpen] = useState(false);
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  const toggleModal = () => setModalOpen(!isModalOpen);

  const closeModalOnClickOutside = (e: { target: { id: string } }) => {
    if (e.target.id === "modal-overlay") {
      setModalOpen(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleModal}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {account.status === "connected" ? "Manage Wallet" : "Connect Wallet"}
      </button>
      {isModalOpen && (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          style={{ margin: "0" }}
          onClick={closeModalOnClickOutside}
        >
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={toggleModal}
            >
              ×
            </button>
            {account.status === "connected" ? (
              <div>
                <h2 className="text-xl font-bold mb-4">Account</h2>
                <div className="mb-4">
                  <p>
                    <strong>Status:</strong>{" "}
                    {account.status.toLocaleUpperCase()}
                  </p>
                  <p>
                    <strong>Addresses:</strong> {account.addresses[0]}
                  </p>
                  <p>
                    <strong>Chain ID:</strong> {account.chainId}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    disconnect();
                    toggleModal();
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-bold mb-4">Connect</h2>
                {connectors.map((connector) => (
                  <button
                    key={connector.uid}
                    onClick={() => connect({ connector })}
                    type="button"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mb-2 w-full"
                  >
                    {connector.name}
                  </button>
                ))}
                <div className="mt-4 text-sm text-gray-700">
                  Status: {status}
                </div>
                {error && (
                  <div className="mt-2 text-sm text-red-500">
                    {error.message}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default WagmiWalletButton;
