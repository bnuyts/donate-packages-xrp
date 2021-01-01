[![Build Status](https://travis-ci.com/bnuyts/xrp-payment-cli.svg?branch=main)](https://travis-ci.com/bnuyts/xrp-payment-cli)

# XRP Payment CLI

Send XRP quickly via the commandline

## Installation

```
// dev
yarn add xrp-payment-cli -D
npm i xrp-payment-cli -D

// global
npm i xrp-payment-cli -g
```

## Usage

### Donating XRP

The XRP payment cli supports the donation of XRP to opt-in packages. If a package.json inside node_modules contains a donation property with an XRP entry, that entry will be used as destination wallet.

The amount given as donation will be divided by the number of projects opting-in for XRP donations.

```
xrp-payment-cli donate --sender <senderAddress> --secret <secret> --amount <amountInXRP>
```

### Sending XRP

```
xrp-payment-cli send --sender <senderAddress> --secret <secret> --destination <destinationAddress> --amount <amountInXRP>
```

The cli can also be used with different nodes. By default wss://xrpl.ws is used, however, a testnest node can also be passed.

```
xrp-payment-cli send --sender <senderAddress> --secret <secret> --destination <destinationAddress> --amount <amountInXRP> --node 'wss://s.altnet.rippletest.net:51233'
```