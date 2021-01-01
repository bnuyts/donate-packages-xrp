#!/usr/bin/env node
import yargs from 'yargs';
import { donateFlow } from './xrp/donate/flow';
import { paymentFlow } from './xrp/payment/flow';

yargs
  .command(
    'donate',
    'donate XRP to packages',
    (yargs: any) => {
      yargs.option('sender', {
        describe: 'account originating the payment',
      });
      yargs.option('secret', {
        describe: 'secret for the origninating account to sign the transaction',
      });
      yargs.option('amount', {
        describe: 'amount to send in XRP, not drops',
      });
      yargs.option('node', {
        describe: 'node to connect to',
        default: 'wss://xrpl.ws',
      });
      yargs.option('validate', {
        describe: 'validate the transaction',
        default: true,
      });
      yargs.demandOption(['sender', 'secret', 'amount']);
    },
    (argv: any) => {
      const paymentFlows: Promise<void>[] = [];
      donateFlow()
        .then((donationAddresses) => {
          if (
            Array.isArray(donationAddresses) &&
            donationAddresses.length > 0
          ) {
            const fractionAmount = (
              argv.amount / donationAddresses.length
            ).toFixed(6);
            donationAddresses.forEach((address) => {
              paymentFlows.push(
                paymentFlow(
                  argv.node,
                  argv.sender,
                  argv.secret,
                  address,
                  fractionAmount.toString(),
                  argv.validate
                )
              );
            });
          }
          return Promise.all(paymentFlows);
        })
        .then(() => process.exit());
    }
  )
  .command(
    'send',
    'send XRP to the destination',
    (yargs: any) => {
      yargs.option('sender', {
        describe: 'account originating the payment',
      });
      yargs.option('secret', {
        describe: 'secret for the origninating account to sign the transaction',
      });
      yargs.option('destination', {
        describe: 'destination account for the payment',
      });
      yargs.option('amount', {
        describe: 'amount to send in XRP, not drops',
      });
      yargs.option('node', {
        describe: 'node to connect to',
        default: 'wss://xrpl.ws',
      });
      yargs.option('validate', {
        describe: 'validate the transaction',
        default: true,
      });
      yargs.demandOption(['sender', 'secret', 'destination', 'amount']);
    },
    (argv: any) => {
      paymentFlow(
        argv.node,
        argv.sender,
        argv.secret,
        argv.destination,
        argv.amount,
        argv.validate
      ).then(() => process.exit());
    }
  ).argv;
