# SOLSCAN  
### Download Solidity smart contracts from Etherscan **or** Immunefi bounty scopes
## Features
- zero friction
- Retrieve verified Solidity contract source code from **Etherscan**  
- Retrieve bounty scope JSON from **Immunefi**  
- Well-structured extraction and saving  
- 99% accuracy in extraction  
- Auto-detects whether input is an Immunefi URL or Ethereum contract address  
- `--help` option to view usage instructions  
- API required ❌  
- dependencies required ❌ 

---

## Installation
```bash
npm i solscan
```

## Examples

```bash
# Fetch Immunefi bounty scope
solscan https://immunefi.com/bug-bounty/scroll/

# Fetch verified Ethereum contract
solscan 0xDaB5dc22350f9a6Aff03Cf3D9341aAD0ba42d2a6

# Show help
solscan --help
```

Replace `<contract_address>` with the Ethereum contract address you want to fetch.


## Dependencies
No dependencies needed.

## Author

[radhe098](https://www.github.com/radhe098)