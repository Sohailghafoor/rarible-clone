
import './App.css';
import React from 'react';
import Home from './pages/home';
import Page from './pages/page';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import '@rainbow-me/rainbowkit/dist/index.css';
import {
  connectorsForWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {  wallet } from '@rainbow-me/rainbowkit';
import { chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

// const needsInjectedWalletFallback =
//   typeof window !== 'undefined' &&
//   window.ethereum &&
//   !window.ethereum.isMetaMask &&
//   !window.ethereum.isCoinbaseWallet;

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [ wallet.metaMask({ chains })],
  },
  {
    groupName: 'Popular',
    wallets: [

      wallet.coinbase({ chains}),
      wallet.walletConnect({ chains }),
      wallet.injected({ chains }),
      wallet.ledger({ chains })

    ],
  },
  {
    groupName: 'More',
    wallets: [
      wallet.argent({ chains }),
      wallet.rainbow({ chains })
    ],
  },

]);

const wagmiClient = createClient({
  // autoConnect: true,
  connectors,
  provider
})

const App = () => {



  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider  chains={chains}>

     <BrowserRouter>

     <Header/>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/page' element={<Page />} />
      <Route
        exact
        path='*'
        render={() => <Navigate to='/home' replace={true} />}
      />
    </Routes>
          <Footer/>
          </BrowserRouter>
           </RainbowKitProvider>
    </WagmiConfig>

  );
};

export default App;
