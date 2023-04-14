const { tokenize } = require('.')
const $ = require('../../crawler/utils')
const { findOneByPk, findOneByAddress } = require('../../crawler/getContract')

async function get(key = 1) {
    const attrs = ['Id', 'ContractName', 'ContractAddress', 'SourceCode', 'CompilerVersion']
    let data
    if (key.substr(0, 2) === '0x') data = await findOneByAddress(key, attrs)
    else data = await findOneByPk(key, attrs)
    if (data) {
        const type = data.CompilerVersion.includes('vyper') ? 'vyper' : 'solidity'
        const sourceCode = $.multiContracts(data.SourceCode)
        const clearCode = $.clearCode(sourceCode, type)
        const sourceCodeMap = $.getCodeMap(clearCode, type)
        const obj = {}
        for (const i in sourceCodeMap)
            for (const j in sourceCodeMap[i]) obj[`${i}/${j}`] = await tokenize(sourceCodeMap[i][j])
        console.log('Id', data.Id)
        console.log('Name', data.ContractName)
        console.log('Address', data.ContractAddress)
        console.log(obj)
    }
}

if (process.argv[1].includes('tokenizer') && process.argv[2] === 'get') get(process.argv[3])
