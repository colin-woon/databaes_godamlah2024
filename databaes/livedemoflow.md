```sh
-----Tech Stack-----
Backend Node Js, Fabric Network, SSS encryption, MongoDB
Frontend Next.js, Tailwind

Steps to run
backend API - nodemon index.js in /databaesAPI/api (Specifically NODE V16)
frontend client - pnpm dev in databaes_godamlah2024
	- need to run 3 instances

walkthrough login for three users

Need 3 users
- En Fakhrul (A)
mrfakhrul
ilovedatasonic

- Pn Safia (B)
pnsafia
ilovedatasonic2

- Not Pn Safia (C)
notpnsafia
ilovenasikandar


Upload passport (A)
Grant access (A) > (B & C)

Revoke access (A) > (C)
Download passport (B)

Explain other unimplemented features
- updating the file, which will change the version number
- downloading specific versions of the same file
- transfer ownership of the file
- delete the file (must explain since blockchain is supposed to be immutable)


Possible QnA
- How to deploy hyperledger fabric live
	-- Setup and define network for organizations
	-- Setting up Ordering Service, Channels, Peer Nodes, Chaincode, Policies
	-- Setup IPFS
	-- Integrate Chaincode with IPFS, Storing the content ID(CID/file id) on blockchain, with relevant access permissions
- Explain more about the smart contract and chaincode
	-- In Hyperledger Fabric, smart contracts are implemented as chaincode.
- Explain how its free, no gas fees?
	-- Hyperledger Fabric is a permissioned blockchain network, operational costs are associated with maintaining the infrastructure, such as hosting and computational resources.
- Explain the role of IPFS in this scenario
	-- IPFS is used to store the actual file data, while the blockchain stores metadata and access permissions.
- Explain the role of MongoDB used here, what is it storing
```
