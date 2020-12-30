[![Build Status](https://travis-ci.com/bnuyts/xrp-payment-cli.svg?branch=main)](https://travis-ci.com/bnuyts/xrp-payment-cli)

# XRP Payment CLI

Send XRP quickly via the commandline

## Usage

```
yarn start send --sender <senderAddress> --secret <secret> --destination <destinationAddress> --amount <amountInXRP>
```

The cli can also be used with different nodes. By default wss://xrpl.ws is used, however, a testnest node can also be passed.

```
yarn start send --sender <senderAddress> --secret <secret> --destination <destinationAddress> --amount <amountInXRP> --node 'wss://s.altnet.rippletest.net:51233'
```