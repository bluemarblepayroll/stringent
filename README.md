# Stringent

[![Build Status](https://travis-ci.org/bluemarblepayroll/stringent.svg?branch=master)](https://travis-ci.org/bluemarblepayroll/stringent)

This library provides a pluggable string templating system.  At its core, it can take a templated string (such as: '{lastName}, {firstName} {middleName}') and a input object (default is a plain old JavaScript object) and it will dynamically resolve the string based on the input.  It also provides two optional arguments which help make this library 'pluggable':

1. Custom Resolver: Instead of passing in a POJO as your input, you can pass in other object types and use a custom resolver for value getting.
1. Custom Formatter: Customize the way each string token is rendered by extending the token syntax to: {token:formatter:argument}.  Formatter is the formatting method to call and argument will be passed in as meta-data/options.

## Installation

This library could be consumed as either a pure TypeScript library or as its trans-compiled ES2015 JavaScript counterpart.

To install through NPM:

````
npm install --save @bluemarblepayroll/stringent
````

To install through Yarn:

````
yarn add @bluemarblepayroll/stringent
````

## Examples

### Getting Started

Consider the following example:

> 'The {foxSpeed} brown fox jumps over the {dogSpeed} dog'

We can evaluate this by executing:

````
let example = 'The {foxSpeed} brown fox jumps over the {dogSpeed} dog';
let input = { foxSpeed: 'quick', dogSpeed: 'lazy' }';
let result = evaluate(example, input);
````

Result should now be: 'The quick brown fox jumps over the lazy dog'

### Custom Resolution

The above example works just fine using the default object value resolver, but you can also pass in a custom function that will serve as resolver.  That way you could use dot notation for value resolution.  For example:

````
let resolver = (value, input) => input && value && input.get(value.toString().split('.'));
let example = 'The {fox.speed} brown fox jumps over the {dog.speed} dog';
let input = Immutable.fromJS({ fox: { speed: 'quick' }, dog: { speed: 'lazy' } });
let result = evaluate(example, input, resolver);
````

Result should now be: 'The quick brown fox jumps over the lazy dog'

### Custom Formatting

Another extendable or pluggable aspect is formatting.  Consider a basic example where we want to show 'Yes' for a true value, 'No' for a false value, and an 'Unknown' for a null value:

> 'The fox is quick: {fox.quick:yesNoUnknown}'

In this case we can use a custom formatter called yesNoUnknown that understands how to do this for us.  The custom formatter is controlled externally from this library, which means you can use this for whatever purpose you see fit.  Here would be an example implementation of this custom formatter:

````
let customFormatter = {
  yesNoUnknown: (value, arg) => {
    if (value === null || typeof value === 'undefined') {
      return 'Unknown';
    } else if (!!value) {
      return 'Yes';
    } else if (!value) {
      return 'No';
    }
  }
};

````

Now, we can pass this in and consume it as follows:

````
let resolver = (value, input) => input && value && input.get(value.toString().split('.'));
let example = 'The fox is quick: {fox.speed::yesNoUnknown}';
let input = Immutable.fromJS({ fox: { quick: true });
let result = evaluate(example, input, resolver, customFormatter);
````

The result should be: 'The fox is quick: Yes';

*Note: If we wanted to use the default resolver we could pass in null instead of the custom resolver.*

## Contributing

### Development Environment Configuration

Basic steps to take to get this repository compiling:

1. Install [Node.js](https://nodejs.org) (check package.json for versions supported.)
2. Install Yarn package manager (npm install -g yarn)
3. Clone the repository (git clone git@github.com:bluemarblepayroll/stringent.git)
4. Navigate to the root folder (cd stringent)
5. Install dependencies (yarn)

### Compiling

To compile the TypeScript source down to native JavaScript, run:

````
npm run build
````

### Running Tests

To execute the test suite first compile the solution then run:

````
npm run test
````

## License

This project is MIT Licensed.
