import test from 'ava';
import { rollup } from 'rollup';
import path from 'node:path';
import nodeJsAlias from '../src';
import { type NodeAliasOption } from '../src/types';

const rollupBuilder = (inputFile: string, options: NodeAliasOption) => rollup({
  input: path.resolve(__dirname, inputFile),
  plugins: [
    nodeJsAlias({
      include: [path.resolve(__dirname, 'dummy/*.js')],
      ...options
    })
  ]
});

test('replace "os" to "os-browserify/browser"', async (t) => {
  const bundle = await rollupBuilder('dummy/os.js', {
    entries: {
      os: 'os-browserify/browser',
    }
  });
  const { output } = await bundle.generate({ format: 'esm', exports: 'auto' });
  const [{ code }] = output;

  t.truthy(/import os from 'os-browserify\/browser';/.test(code));
});

test('replace multple entries', async (t) => {
  const bundle = await rollupBuilder('dummy/multiple', {
    entries: {
      path: 'path-browserify',
      os: 'os-browserify/browser',
    }
  });
  const { output } = await bundle.generate({ format: 'esm', exports: 'auto' });
  const [{ code }] = output;

  t.truthy(/import path from 'path-browserify';/.test(code));
  t.truthy(/import os from 'os-browserify\/browser';/.test(code));
});

test('inject process', async (t) => {
  const bundle = await rollupBuilder('dummy/injectable.js', {
    entries: {
      process: 'process/browser',
    }
  });
  const { output } = await bundle.generate({ format: 'esm', exports: 'auto' });
  const [{ code }] = output;

  t.truthy(/import process from 'process\/browser';/.test(code));
});

test("don't inject process", async (t) => {
  const bundle = await rollupBuilder('dummy/no-injectable.js', {
    entries: {
      process: 'process/browser',
    }
  });
  const { output } = await bundle.generate({ format: 'esm', exports: 'auto' });
  const [{ code }] = output;

  t.falsy(/import process from 'process\/browser';/.test(code));
});
