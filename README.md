# ⚔️ Cutthroat - Decentralized Donation Platform

<div align="center">

![Cutthroat Logo](https://img.shields.io/badge/Cutthroat-⚔️-blue?style=for-the-badge&logo=cardano)

**A transparent and secure donation platform built on Cardano blockchain**

[![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Mesh SDK](https://img.shields.io/badge/Mesh%20SDK-1.9.0--beta.74-purple?style=flat-square)](https://meshjs.dev/)
[![Cardano](https://img.shields.io/badge/Cardano-Blockchain-blue?style=flat-square&logo=cardano)](https://cardano.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

[🚀 Live Demo](#-live-project-link) • [📖 Documentation](#-features) • [🤝 Contributing](#-contributing) • [📄 LICENSE](#-license)

</div>

---

## 📋 Project Information

### 🎯 Project Description
Cutthroat is a revolutionary decentralized donation platform that leverages the power of Cardano blockchain to create transparent, secure, and verifiable donation experiences. Built with Next.js and Mesh SDK, it provides a seamless interface for donors to support causes they care about while ensuring complete transparency through blockchain technology.

### 🚨 Problem We're Solving
Traditional donation platforms suffer from several critical issues:
- **Lack of Transparency**: Donors can't verify where their money goes
- **High Fees**: Centralized platforms charge significant transaction fees
- **Trust Issues**: No way to verify campaign authenticity
- **Limited Accountability**: No proof of donation or impact
- **Geographic Restrictions**: Many platforms limit global access

### 💡 Our Solution
Cutthroat addresses these problems by:
- **🔒 Blockchain Transparency**: All donations recorded on Cardano blockchain
- **🛡️ Smart Contract Security**: Automated, tamper-proof transactions
- **💎 NFT Proof**: Unique NFTs as verifiable donation certificates
- **🌐 Global Access**: Decentralized platform accessible worldwide
- **📊 Real-time Tracking**: Live campaign progress and fund utilization

### 🌟 Why Cutthroat?

- **🔒 Transparent**: All donations are recorded on the Cardano blockchain
- **🛡️ Secure**: Powered by Cardano's robust security model
- **💎 NFT Rewards**: Donors receive unique NFTs as proof of contribution
- **🌐 Decentralized**: No central authority controls the platform
- **📱 Modern UI**: Beautiful, responsive interface built with Tailwind CSS

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A Cardano wallet (Yoroi, Nami, or Eternl)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ysathyasai/Cutthroat.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd Cutthroat
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   # Blockfrost API Configuration
   NEXT_PUBLIC_BLOCKFROST_API_KEY=your_blockfrost_api_key_here
   NEXT_PUBLIC_NETWORK=testnet
   
   # IPFS Configuration
   NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.io/ipfs/
   NEXT_PUBLIC_IPFS_API_URL=https://ipfs.infura.io:5001
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running!

---

## 🏗️ Project Structure

```
Cutthroat/
├── 📁 public/                 # Static assets
│   ├── favicon.ico
│   └── *.svg files
├── 📁 src/
│   ├── 📁 components/         # React components
│   │   ├── ConnectWallet.tsx  # Wallet connection component
│   │   ├── Dashboard.tsx      # Wallet dashboard
│   │   ├── Navigation.tsx     # App navigation
│   │   ├── Campaigns.tsx      # Campaign listing
│   │   ├── DonateForm.tsx    # Donation form
│   │   └── Updates.tsx        # Campaign updates
│   ├── 📁 pages/              # Next.js pages
│   │   ├── _app.tsx          # App wrapper with MeshProvider
│   │   ├── index.tsx         # Home page
│   │   ├── dashboard.tsx     # Dashboard page
│   │   ├── campaigns.tsx     # Campaigns page
│   │   ├── updates.tsx       # Updates page
│   │   └── 📁 api/           # API endpoints
│   │       ├── hello.ts      # Health check
│   │       └── donation-metadata.ts # IPFS upload
│   ├── 📁 styles/            # Global styles
│   │   └── globals.css
│   └── 📁 utils/             # Utility functions
│       ├── blockfrost.ts     # Blockchain provider
│       ├── ipfs.ts          # IPFS integration
│       └── nft.ts           # NFT utilities
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 next.config.ts
└── 📄 README.md
```

---

## ✨ Features

### 🔗 Wallet Integration
- **Multi-wallet Support**: Connect with Yoroi, Nami, Eternl, and more
- **Real-time Status**: Live wallet connection status
- **Asset Management**: View and manage your Cardano assets

### 🎯 Campaign Management
- **Campaign Discovery**: Browse active donation campaigns
- **Progress Tracking**: Visual progress bars and funding status
- **Campaign Details**: Comprehensive campaign information
- **Deadline Management**: Time-sensitive campaign tracking

### 💝 Donation System
- **Secure Transactions**: Blockchain-powered donations
- **Multiple Amounts**: Quick donation buttons and custom amounts
- **Transaction History**: Complete donation tracking
- **Message Support**: Add personal messages to donations

### 🏆 NFT Rewards
- **Donation NFTs**: Unique NFTs for each donation
- **Metadata Storage**: IPFS-based metadata storage
- **Ownership Verification**: Blockchain-verified NFT ownership
- **Collection Management**: View and manage your NFT collection

### 📢 Updates & Communication
- **Campaign Updates**: Real-time campaign progress updates
- **Notification System**: Stay informed about your supported campaigns
- **Social Features**: Like, comment, and share updates

### 🌐 Decentralized Architecture
- **IPFS Integration**: Decentralized metadata storage
- **Blockchain Transparency**: All transactions recorded on Cardano
- **No Central Authority**: Truly decentralized platform

---

## 🛠️ Tech Stack Used

### Frontend Technologies
- **Next.js 15.5.3** - React framework with Server-Side Rendering
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework for styling
- **React Hooks** - Modern React patterns and state management

### Blockchain Technologies
- **Mesh SDK** - Cardano blockchain integration and wallet management
- **Cardano** - Proof-of-stake blockchain platform
- **Blockfrost** - Cardano API provider for blockchain data
- **Smart Contracts** - Automated donation processing

### Storage & Infrastructure
- **IPFS** - Decentralized file storage for metadata
- **JSON Metadata** - Structured data format for NFTs
- **Vercel** - Deployment and hosting platform

### Development Tools
- **ESLint** - Code linting and quality assurance
- **Prettier** - Code formatting and consistency
- **Git** - Version control and collaboration
- **Node.js** - JavaScript runtime environment

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Blockfrost API Configuration
NEXT_PUBLIC_BLOCKFROST_API_KEY=your_blockfrost_api_key_here
NEXT_PUBLIC_NETWORK=testnet

# IPFS Configuration
NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.io/ipfs/
NEXT_PUBLIC_IPFS_API_URL=https://ipfs.infura.io:5001
NEXT_PUBLIC_IPFS_AUTH=

# Wallet Configuration (for development/testing)
MNEMONIC=your_wallet_mnemonic_here

# Application Configuration
NEXT_PUBLIC_APP_NAME=Cutthroat
NEXT_PUBLIC_APP_DESCRIPTION=A decentralized platform for transparent donations on Cardano
```

### Getting API Keys

1. **Blockfrost API Key**:
   - Visit [Blockfrost](https://blockfrost.io/)
   - Sign up for a free account
   - Create a new project
   - Copy your API key

2. **IPFS Configuration**:
   - Use public IPFS gateways (no key required)
   - Or set up your own IPFS node
   - Configure Infura IPFS for production

---

## 📱 Usage Guide

### 1. Connect Your Wallet
- Click the "Connect Wallet" button
- Select your preferred Cardano wallet
- Approve the connection request

### 2. Browse Campaigns
- Navigate to the Campaigns page
- View active donation campaigns
- Read campaign descriptions and progress

### 3. Make a Donation
- Select a campaign to support
- Choose donation amount or enter custom amount
- Add an optional message
- Confirm the transaction in your wallet

### 4. Track Your Donations
- View your donation history in the Dashboard
- Check your NFT collection
- Monitor campaign updates

### 5. Stay Updated
- Subscribe to campaign updates
- Receive notifications about progress
- Share updates on social media

---

## 📸 Project Demo

### 🖼️ Screenshots
Project screenshots are available in the [`Screenshots/`](./Screenshots/) folder:

- **Home Page**: Main landing page with wallet connection
- **Dashboard**: Wallet dashboard showing assets and balance
- **Campaigns**: Campaign listing and browsing interface
- **Donation Form**: Secure donation processing interface
- **Updates**: Campaign updates and progress tracking
- **Mobile View**: Responsive design on mobile devices

---

## 🌐 Live Project Link

**🚀 Deployed Application**: [Cutthroat Project Deploy](https://project1569013.netlify.app)

---

## 📊 Presentation

### 📋 Project Presentation (PPT)
**📄 PPT Link**: [Cutthroat Project Presentation](https://prezi.com/view/9rLFQ3t3Ls5KdubWekrX/?referral_token=h9CEuLlnB3FN)

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

### Other Platforms

- **Netlify**: Connect GitHub repo and deploy
- **Railway**: Deploy with one-click
- **DigitalOcean**: Use App Platform
- **AWS**: Deploy with Amplify

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Bug Reports
- Use GitHub Issues to report bugs
- Include steps to reproduce
- Provide error messages and logs

### 💡 Feature Requests
- Submit feature ideas via GitHub Issues
- Describe the use case and benefits
- Consider implementation complexity

### 🔧 Code Contributions
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### 📝 Documentation
- Improve existing documentation
- Add code comments
- Create tutorials and guides

---

## 📊 Roadmap

### Phase 1: Core Features ✅
- [x] Wallet integration
- [x] Basic donation system
- [x] Campaign management
- [x] NFT rewards

### Phase 2: Enhanced Features 🚧
- [ ] Advanced campaign analytics
- [ ] Multi-token support
- [ ] Mobile app development
- [ ] Social media integration

### Phase 3: Advanced Features 📋
- [ ] Smart contract integration
- [ ] Governance system
- [ ] Cross-chain support
- [ ] Enterprise features

---

## 🐛 Troubleshooting

### Common Issues

**Wallet Connection Issues**
```bash
# Clear browser cache and cookies
# Ensure wallet extension is updated
# Check network connection
```

**Transaction Failures**
```bash
# Verify sufficient ADA balance
# Check network congestion
# Ensure correct network (testnet/mainnet)
```

**Build Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Environment Variables**
```bash
# Ensure all required variables are set
# Check .env.local file exists
# Verify API key validity
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Contributors

We're grateful to our amazing team of contributors who made Cutthroat possible:

- **Sathya Sai** - Blockchain Integration Specialist
- **Adithya** - Project Architect
- **Surya Guttapalli** - Frontend Developer & UI/UX Designer
- **Sai Charan Koganti** - Smart Contract Developer
- **Saketh Mantol** - Infrastructure Manager
- **Varshith** - Resource Finder

---

## 🙏 Acknowledgments

- **Cardano Foundation** - For the amazing blockchain technology
- **Mesh SDK Team** - For the excellent development tools
- **Next.js Team** - For the powerful React framework
- **Tailwind CSS** - For the beautiful styling system
- **IPFS Community** - For decentralized storage solutions

---

## 📞 Support

- **GitHub Issues**: [Report bugs and request features](https://github.com/ysathyasai/Cutthroat/issues)
- **Discord**: Join our community server
- **Email**: support@cutthroat.app
- **Twitter**: [@CutthroatApp](https://twitter.com/CutthroatApp)

---

<div align="center">

**Made with ❤️ by the Cutthroat Team**

[![GitHub stars](https://img.shields.io/github/stars/ysathyasai/Cutthroat?style=social)](https://github.com/ysathyasai/Cutthroat/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/ysathyasai/Cutthroat?style=social)](https://github.com/ysathyasai/Cutthroat/network)
[![GitHub watchers](https://img.shields.io/github/watchers/ysathyasai/Cutthroat?style=social)](https://github.com/ysathyasai/Cutthroat/watchers)

</div>
