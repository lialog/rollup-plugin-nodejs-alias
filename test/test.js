import test from 'ava';
import { rollup } from 'rollup';
import nodeJsAlias from '../src';
import path from 'path';

test('replace "os" to "os-browserify/browser"', async (t) => {
  const bundle = await rollup({
    input: path.resolve(__dirname, 'dummy/os.js'),
    plugins: [
      nodeJsAlias({
        include: [path.resolve(__dirname, 'dummy/*.js')],
        entries: {
          os: 'os-browserify/browser',
        },
      }),
    ],
  });
  const { output } = await bundle.generate({ format: 'esm', exports: 'auto' });
  const [{ code }] = output;

  t.truthy(/import os from 'os-browserify\/browser';/.test(code));
});

test('replace multple entries', async (t) => {
  const bundle = await rollup({
    input: path.resolve(__dirname, 'dummy/multiple.js'),
    plugins: [
      nodeJsAlias({
        include: [path.resolve(__dirname, 'dummy/*.js')],
        entries: {
          path: 'path-browserify',
          os: 'os-browserify/browser',
        },
      }),
    ],
  });
  const { output } = await bundle.generate({ format: 'esm', exports: 'auto' });
  const [{ code }] = output;

  t.truthy(/import path from 'path-browserify';/.test(code));
  t.truthy(/import os from 'os-browserify\/browser';/.test(code));
});

test('inject process', async (t) => {
  const bundle = await rollup({
    input: path.resolve(__dirname, 'dummy/injectable.js'),
    plugins: [
      nodeJsAlias({
        include: [path.resolve(__dirname, 'dummy/*.js')],
        entries: {
          process: 'process/browser',
        },
      }),
    ],
  });
  const { output } = await bundle.generate({ format: 'esm', exports: 'auto' });
  const [{ code }] = output;

  t.truthy(/import process from 'process\/browser';/.test(code));
});

test("don't inject process", async (t) => {
  const bundle = await rollup({
    input: path.resolve(__dirname, 'dummy/no-injectable.js'),
    plugins: [
      nodeJsAlias({
        include: [path.resolve(__dirname, 'dummy/*.js')],
        entries: {
          process: 'process/browser',
        },
      }),
    ],
  });
  const { output } = await bundle.generate({ format: 'esm', exports: 'auto' });
  const [{ code }] = output;

  t.falsy(/import process from 'process\/browser';/.test(code));
});
