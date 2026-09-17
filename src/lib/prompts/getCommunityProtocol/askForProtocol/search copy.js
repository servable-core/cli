/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
// @ts-nocheck - lucide (PEAKUB DX initiative): dead code, found via checkJs. Confirmed
// unreachable (no importer anywhere in this package) and depends on 'yeoman-toolbox', which
// isn't a real dependency of this package either - an abandoned prompt-flow attempt.

/**
 * @param {import('yeoman-toolbox')} toolbox
 * @param {object} payload
 */

import fuzzy from 'fuzzy';
import * as dotenv from 'dotenv';
dotenv.config()

import data from './data.js';

export default async (answers, input = '') => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const options = {
                pre: '<'
                , post: '>'
                , extract: (el) => {
                    return el.id
                }
            };
            const i = fuzzy.filter(input, data, options).map((el) => {
                return el.original
            })
            resolve(i)
        }, Math.random() * 470 + 30);
    });
}
