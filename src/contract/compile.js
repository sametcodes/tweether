import path from 'path';
import fs from 'fs';
import solc from 'solc';

const contract_path = path.resolve("src", "contract", "Tweether.sol");
const contract_content = fs.readFileSync(contract_path, "utf8");

var input = {
    language: 'Solidity',
    sources: { 'Tweether.sol': { content: contract_content } },
    settings: { outputSelection: { '*': { '*': ['*'] } } }
};

const compiled_contract = JSON.parse(solc.compile(JSON.stringify(input)));
const contract_abi = compiled_contract.contracts['Tweether.sol']['Tweether'].abi;

fs.writeFileSync('./src/contract/Tweether.json', JSON.stringify(contract_abi, null, 4));
console.log("Contract compiled successfully");