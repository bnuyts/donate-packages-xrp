#!/usr/bin/env node
import yargs from 'yargs';
import { donateFlow } from './xrp/donate/flow';
import { paymentFlow } from './xrp/payment/flow';

yargs
  .command(
    'donate [sender] [secret] [amount] [node] [validate]',
    'donate to',
    (yargs: any) => {
      yargs.positional('sender', {
        describe: 'account originating the payment',
      });
      yargs.positional('secret', {
        describe: 'secret for the origninating account to sign the transaction',
      });
      yargs.positional('amount', {
        describe: 'amount to send in XRP, not drops',
      });
      yargs.positional('node', {
        describe: 'node to connect to',
        default: 'wss://xrpl.ws',
      });
      yargs.positional('validate', {
        describe: 'validate the transaction',
        default: true,
      });
    },
    (argv: any) => {
      donateFlow().then((donationAddresses) => {
        if (Array.isArray(donationAddresses) && donationAddresses.length > 0) {
          const fractionAmount = argv.amount / donationAddresses.length;
          donationAddresses.forEach((address) => {
            paymentFlow(
              argv.node,
              argv.sender,
              argv.secret,
              address,
              fractionAmount.toString(),
              argv.validate
            );
          });
        }
      });
    }
  )
  .command(
    'send [sender] [secret] [destination] [amount] [node] [validate]',
    'send XRP to the destination',
    (yargs: any) => {
      yargs.positional('sender', {
        describe: 'account originating the payment',
      });
      yargs.positional('secret', {
        describe: 'secret for the origninating account to sign the transaction',
      });
      yargs.positional('destination', {
        describe: 'destination account for the payment',
      });
      yargs.positional('amount', {
        describe: 'amount to send in XRP, not drops',
      });
      yargs.positional('node', {
        describe: 'node to connect to',
        default: 'wss://xrpl.ws',
      });
      yargs.positional('validate', {
        describe: 'validate the transaction',
        default: true,
      });
    },
    (argv: any) => {
      paymentFlow(
        argv.node,
        argv.sender,
        argv.secret,
        argv.destination,
        argv.amount,
        argv.validate
      );
    }
  ).argv;
