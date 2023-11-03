const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname,'build');
fs.removeSync(buildPath);

const contractPath = path.resolve(__dirname,'contracts','healthcare.sol');
const source = fs.readFileSync(contractPath,'utf8');

const config ={
    language: 'Solidity',
    sources: {
        'healthcare.sol': {
            content: source
        },
    },
    settings: {
        outputSelection: { 
            '*': {
                '*': ['*']
            }
        }
    }
};



const output = JSON.parse(solc.compile(JSON.stringify(config))).contracts['healthcare.sol']['HealthCare'];
const abi = output.abi;
const bytecode = output.evm.bytecode.object;


fs.ensureDirSync(buildPath);

fs.outputJSONSync(path.resolve(buildPath, 'Healthcare.json'), {
    abi: abi,
    bytecode: bytecode,
});
  