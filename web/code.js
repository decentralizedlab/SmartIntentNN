const { findOneByPk, findOneByAddress, count, maxId } = require('../crawler/getContract')
const { embed } = require('../tensorflow/modules/embedding')
const $ = require('../crawler/utils')

async function get(req, res, next) {
    try {
        const key = req.query.key
        let data
        const attrs = ['Id', 'ContractName', 'ContractAddress', 'Network', 'SourceCode', 'CompilerVersion', 'ABI']
        if (!key) data = { maxId: await maxId(), count: await count() }
        else if (key.substr(0, 2) === '0x') data = await findOneByAddress(key, attrs)
        else data = await findOneByPk(key, attrs)
        if (!data) res.json(null)
        const type = data.CompilerVersion.includes('vyper') ? 'vyper' : 'solidity'
        const sourceCode = $.multiContracts(data.SourceCode)
        const clearCode = $.clearCode(sourceCode, type)
        const sourceCodeMap = $.getCodeMap(clearCode, type)
        res.json({
            Id: data.Id,
            ContractName: data.ContractName,
            ContractAddress: data.ContractAddress,
            Network: data.Network,
            type,
            CompilerVersion: data.CompilerVersion,
            SourceCodeMap: sourceCodeMap,
            SourceCode: data.SourceCode,
            ABI: data.ABI
        })
    } catch (e) {
        next(e)
    }
}

async function embedding(req, res, next) {
    try {
        const key = req.query.key
        let data
        const attrs = ['Id', 'ContractAddress', 'Network', 'SourceCode', 'CompilerVersion']
        if (!key) data = { maxId: await maxId(), count: await count() }
        else if (key.substr(0, 2) === '0x') data = await findOneByAddress(key, attrs)
        else data = await findOneByPk(key, attrs)
        if (!data) res.json(null)
        const type = data.CompilerVersion.includes('vyper') ? 'vyper' : 'solidity'
        res.json({
            Id: data.Id,
            ContractAddress: data.ContractAddress,
            Network: data.Network,
            CompilerVersion: data.CompilerVersion,
            SourceCode: data.SourceCode,
            Embedding: await embed($.getCodeMap($.clearCode($.multiContracts(data.SourceCode), type), type))
        })
    } catch (e) {
        next(e)
    }
}

async function upload(req, res, next) {
    try {
        const text = req.body.text
        const type = req.body.type || 'solidity'
        res.json({ text: await embed($.getCodeMap($.clearCode($.multiContracts(text), type), type)) })
    } catch (e) {
        next(e)
    }
}

module.exports = { get, embedding, upload }
