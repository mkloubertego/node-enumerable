// The MIT License (MIT)
// 
// node-enumerable (https://github.com/mkloubert/node-enumerable)
// Copyright (c) Marcel Joachim Kloubert <marcel.kloubert@gmx.net>
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.

import Assert = require('assert');
import Enumerable = require('../../');
import Helpers = require('../helpers');

const MAX_ARRAY_SIZE = 100;

Helpers.execute(
    'Testing numbers...',
    (ctx) => {
        for (let i = -Math.floor(MAX_ARRAY_SIZE / 2); i <= Math.ceil(MAX_ARRAY_SIZE / 2); i++) {
            const ARR: number[] = [];
            for (let j = i; j <= i; j++) {
                ARR.push( j * 7.0 );
            }

            const SEQ = Enumerable.from( ARR )
                                  .rand()
            let j = -1;
            for (let item of SEQ) {
                ++j;

                const ARR_INDEX = ARR.indexOf(item);

                Assert.equal(ARR_INDEX > -1, true);

                Assert.equal( item, ARR[j] );
                Assert.strictEqual( item, ARR[j] );
                Assert.equal( '' + item, ARR[j] );
                Assert.equal( item, '' + ARR[j] );
                Assert.equal( '' + item, '' + ARR[j] );
                Assert.strictEqual( '' + item, '' + ARR[j] );
            }

            const SEQ_SIZE = j + 1;

            Assert.equal( SEQ_SIZE, ARR.length );
            Assert.strictEqual( SEQ_SIZE, ARR.length );
            Assert.equal( '' + SEQ_SIZE, ARR.length );
            Assert.equal( SEQ_SIZE, '' + ARR.length );
            Assert.equal( '' + SEQ_SIZE, '' + ARR.length );
            Assert.strictEqual( '' + SEQ_SIZE, '' + ARR.length );
        }
    });
