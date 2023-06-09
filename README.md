# SmartIntentNN

**🤩 SmartIntentNN (Smart Contract Intent Neural Network) is a web3 security tool that can help you detect unfriendly intents in a smart contract.**

## Vision

**Combine web3, AI and Software Engineering:**

- 🔗 Data crawler
- 🤔 Data collecting, labelling and analyzing
- 👀 Data visualization
- 🤝 Interact with Web3 blockchain network
- 🚀 Build, train and evaluate AI models

## Tool

__SmartIntentNN: detect development intent in smart contracts__

👉 [https://www.web3se.top/](https://www.web3se.top/)

- 🤩 SmartIntentNN is powered by [Tensorflow.js](https://github.com/tensorflow/tfjs), so it can run neural network on the browser.
- ⚙ ️ Our webpages are generated by gitlab CI/CD, referring to our [frontend repo](https://gitlab.com/web3se/smartvue).
- 📱 Three webpages, [home page](https://www.web3se.top/), [intent highlight](https://www.web3se.top/highlight/), [evaluation results](https://www.web3se.top/evaluate/), are laid out to test our model online.
- 🕵 It enables external (user uploaded) smart contract code for testing, click "Upload my smart contract"‍
- 🔘 Then you can click the `<font color="red">`red button`</font>` ![example-predict-button](./imgs/example-btn.png) to predict the smart contract intents.

## Data

__💽 To use our [dataset](http://47.100.113.103:8080)__

The above URL is a `GET/POST JSON` API as you can query data by changing the parameter `key` in the URL.
__For example, search the data __PK__ of _100_ (Shanghai)__: [http://47.100.113.103:8080/data/sourceCodeRisk?key=100](http://47.100.113.103:8080/data/sourceCodeRisk?key=100).

Just for service downtime! 🥹

- __Backup URL2 (Singapore):__ [http://8.214.93.3:8080/data/sourceCodeRisk?key=1](http://8.214.93.3:8080/data/sourceCodeRisk?key=1)

__🤖 Try our [models](https://gitlab.com/web3se/smartintent/-/releases)__

__To use our models__, download the models and copy/move them to `/tensorflow/mymodels/`.

- For intent highlight __K-means model__, move it to the root path of `/tensorflow/mymodels/kmeans-model.json`.
- For __mymodel-\*.zip__, unzip them and then move to the directories of corresponding filename, e.g., `mymodel-bilstm.zip` corresponds to `/tensorflow/mymodel/mymodel_bilstm/`.
- For __universal sentence encoder__, click __[here](http://download.devil.ren)__ to download. ⬇️
- For directly getting embedding vectors, request [code/embedding](http://47.100.113.103:8080/code/embedding?key=1). ⬇️ (param `key` is __PK__ in database)

## Install

Before using the program, you need to install __nodejs__ and __npm__ tools first, then you install dependencies.

Our recommended version is Node.js v16+.

```bash
yarn
# or
npm install
```

We also recommend installing __python__ and __pip__, but it is not essential.

## Prepare

Prepare a csv dataset of smart contracts and put them in the directory `/db`.

For BSC Mainnet, download the latest verified contracts from [BSC verified contracts addresses](https://bscscan.com/exportData?type=open-source-contract-codes).

Then, you need to config your own _bscscan_, _etherscan_ [API](https://docs.bscscan.com/api-endpoints/contracts) secret keys in `/crawler/config/network.json`.

## Database

If you would like to set up a localhost database, we prepare a `docker-compose.yml` for you.

To start a MySQL docker service locally, try:

```bash
yarn mysql
```

To connect to local mysql database, you can create and modify the `.env` as the following content:

```
DB_DIALECT=mysql
MYSQL_DB=web3
MYSQL_USER=web3
MYSQL_PASSWORD=web3
MYSQL_HOST=10.144.1.1
```

Then you can test your database connection and create the initial tables:

```bash

# test connect to databases
yarn DB test

# init online mysql tables, if table is not input, default is all the tables
yarn DB init [Table]

# drop sqlite tables, be careful!
yarn DB drop [Table]

```

## Web

**Run Web API**

```bash
# development mode
yarn dev
# product mode
yarn start
# stop web service
yarn stop
```

**APIs for browsing our dataset**

- [code/get](https://api.smart.web3se.top/code/get?key=1)
- [code/embedding](https://api.smart.web3se.top/code/embedding?key=1)
- [contract/get](https://api.smart.web3se.top/contract/get?keyword=1)
- [token/get](https://api.smart.web3se.top/token/get?keyword=1)
- [data/sourceCodeRisk](https://api.smart.web3se.top/data/sourceCodeRisk?key=1)

## Operation

**Update Contract Table**

Contract API default is from BSC MainNet bscscan.com, you may change network in crawler/updateContract.js

```bash
# crawl from an address
yarn updateContract 0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82

# crawl from csv file in /db
yarn updateContract csv [from=ContractAddress]

# crawl from token list on BSC
yarn updateContract tokens

# label out token contracts, BEP20, 721...
# also add creator, txhash info to Contract table
yarn updateContract labelToken [startId] [endId]

# remove contracts without SourceCode
yarn updateContract removeNull
```

**Update token info in Token table**

For token's basic info, price, bnb LP, busd LP, marketcap, transfers...

```bash
# need UI, from bscscan
yarn updateToken info [start]

# is honeypot and honeypot info
yarn updateToken honeypot [start]

# remove null token
yarn updateToken removeNull

# update and label token risks
# need UI, from scamsniper
yarn updateToken risk [start]
```

**Update from safu**

```bash
# update scam possibility code
yarn safu scam [start] [end]

# simulate buy and update honeypot
yarn safu honeypot [start] [end]
```

**Select data from tables**

```bash
# count total num of contracts
yarn contract count

# get contract info by id, address
yarn contract get [id|address]

# get contract max id
yarn contract max

# check contract address exsited
yarn contract check [address]

# get contracts without SourceCode
yarn contract findNull

# remove contracts without SourceCode
yarn contract removeNull

# get contract network by address
yarn contract network [address]

# get token by id
yarn token get [id]

# get token by address
yarn token get [address]

# count token table rows
yarn token count

# get code data from codes by Id, Address
yarn code get [Id|Address]

# get max Id of code table
yarn code max

# get max compiled code Id from code table
yarn code max-compile

# get max embedding code Id from code table
yarn code max-embedding

# get word id
yarn word getId [word piece]

# get word by id
yarn word getWord [word id]

# count word pieces in table
yarn word count

# get code and risk relations
yarn data code-risk [Id|Address]

# count total types of contracts
yarn data count-token-type

# count different scam intents of risk
yarn data count-scam

# count different levels of risk
yarn data count-risk

# count total honeypots amount in database
yarn data count-honeypot

# generate a json or txt dataset file
yarn data code-txt
yarn data json-txt
```

**Compile and clean source code**

```bash
# compile all to low-level code
yarn updateCode all [start] [end]

# remove unconerned code: comments, heads, imports...
yarn updateCode clean [start] [end]

# extract functions tree map from contracts
yarn updateCode tree [start] [end]
```

**Tokenizer and embedding**

In this project, we use [sentence-piece](https://github.com/google/sentencepiece) as the tokenizer. It implements __BPE__ and __unigram language model__.

If you would like to generate your own dataset tokenizer model, you need to prepare a `data.txt` file in `/db/data.txt`.

Install python3 and pip.

```bash
# generate the data.txt
yarn data code-txt
yarn data json-txt

# go to sentence-piece dir
cd tensorflow/models/sentence-piece

# run python
pip install sentencepiece

python3 ./spm.py
```

Then you will get two tokenizer files: `sentencepiece.model` and `sentencepiece.vocab`

We have wrapped a __JS version__ of sentence-piece for this project.

To test sentence-piece tokenizer:

```bash
# get a contract's word piece tokens listed by functions
yarn tokenizer get [Id|Address]

# get the max word piece tokens of all the contracts
yarn tokenizer max [start]

# update word dictionary
yarn tokenizer update-word [start]

# count functions in a contract
yarn tokenizer count-fun [id]

# count a max functions contract in table
yarn tokenizer max-fun [start]
```

## Tensorflow.js

__K-means Intent Highlight Model__

```bash
# train k-means model
yarn highlight train [fromId] [slice] [rate] [maxIter]

# load trained highlight k-means model
yarn highlight load

# predict by highlight k-means cluster
yarn highlight predict [Id]
```

__MyModels__

```bash
# train mymodel using BiLSTM and intent highlight scale
yarn mymodel-bilstm-high-scale train [batches] [batchSize] [epoch] [fromId]

# evaluate mymodel using BiLSTM and intent highlight scale
yarn mymodel-bilstm-high-scale evaluate [fromId] [slice] [batchSize]

# predict mymodel using BiLSTM and intent highlight scale
yarn mymodel-bilstm-high-scale predict [fromId] [slice]

# model summary
yarn mymodel-bilstm-high-scale summary

# train model using LSTM 
yarn mymodel-lstm evaluate [fromId] [slice] [batchSize]
yarn mymodel-lstm evaluate [batches] [batchSize] [epoch] [fromId]
yarn mymodel-lstm predict [fromId] [slice]

yarn mymodel-bilstm evaluate [fromId] [slice] [batchSize]
yarn mymodel-bilstm evaluate [batches] [batchSize] [epoch] [fromId]
yarn mymodel-bilstm predict [fromId] [slice]

yarn mymodel-cnn evaluate [fromId] [slice] [batchSize]
yarn mymodel-cnn evaluate [batches] [batchSize] [epoch] [fromId]
yarn mymodel-cnn predict [fromId] [slice]

yarn mymodel-bilstm-high-asc evaluate [fromId] [slice] [batchSize]
yarn mymodel-bilstm-high-asc evaluate [batches] [batchSize] [epoch] [fromId]
yarn mymodel-bilstm-high-asc predict [fromId] [slice]

yarn mymodel-bilstm-high-desc evaluate [fromId] [slice] [batchSize]
yarn mymodel-bilstm-high-desc evaluate [batches] [batchSize] [epoch] [fromId]
yarn mymodel-bilstm-high-desc predict [fromId] [slice]
```

We use [sequelize](https://sequelize.org/) to manage a database.

For the details of data structures, please refer to `crawler/Model.js`

## Paper

[Deep Smart Contract Intent Detection](https://arxiv.org/abs/2211.10724)

## Resource

### DataSource

1. [https://bscscan.com/](https://bscscan.com/)
2. [https://etherscan.io/](https://etherscan.io/)
3. [https://tokensniffer.com/](https://tokensniffer.com/)
4. [https://bscheck.eu/](https://bscheck.eu/)
5. [https://scamsniper.net/](https://scamsniper.net/)
6. [https://aphd.github.io/smart-corpus/](https://aphd.github.io/smart-corpus/)
7. [https://dashboard.tenderly.co/explorer/](https://dashboard.tenderly.co/explorer/)
8. [https://tools.staysafu.org/](https://tools.staysafu.org/)

### Dependency

1. [TensorFlow.js](https://js.tensorflow.org/api/latest/)
2. [TensorFlow Hub](https://tfhub.dev/)
3. [Sentence Piece for JS](https://www.npmjs.com/package/sentencepiece-js)

### References

1. [Attention Is All You Need](https://proceedings.neurips.cc/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf)
2. [BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding](https://arxiv.org/pdf/1810.04805.pdf)
