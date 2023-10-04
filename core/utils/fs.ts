import chalk from 'chalk';
import { renderFile } from 'ejs';
const { Confirm } = require('enquirer');
import fs from 'fs';
import fse from 'fs-extra';
import { isBinary } from './is-binary';
import { createPromise } from 'core/create-promists';

export const copyFile = async (from: string, to: string, data: any) => {
  await createPromise<void>(async (resolve, reject) => {
    const buffer = await fse.readFile(from);
    const shouldRenderEjs = !isBinary(from, buffer);

    if (shouldRenderEjs) {
      await renderFile(from, data || {}, async (err, str) => {
        if (err) {
          reject(err);
        } else {
          try {
            await outputFile(to, str).then(resolve).catch(reject);
          } catch (err) {
            reject(err);
          }
        }
      });
    } else {
      try {
        await outputFile(to, buffer).then(resolve).catch(reject);
      } catch (err) {
        reject(err);
      }
    }
  });
};

async function outputFile(to: string, data: any) {
  if (await shouldOutputFile(to)) {
    await fse.outputFile(to, data);
  }
}

export const readTemplateDirs = (
  root: string,
  done: (err: NodeJS.ErrnoException | null, results: string[]) => void,
): string[] => {
  var filePaths: string[] = [];
  fs.readdir(root, (err, files) => {
    if (err) {
      console.log(err);
      return;
    }
    var pending = files.length;
    if (!pending) return done(null, filePaths);
    files.forEach((file) => {
      const stats = fs.statSync(`${root}/${file}`);
      if (stats && stats.isDirectory()) {
        readTemplateDirs(`${root}/${file}`, async (err, res) => {
          filePaths = filePaths.concat(res);
          if (!--pending) done(null, filePaths);
        });
      } else {
        filePaths.push(`${root}/${file}`);
        if (!--pending) done(null, filePaths);
      }
    });
  });
  return filePaths;
};

const shouldOutputFile = async (filePath: string): Promise<boolean> => {
  const exists = await fse.pathExists(filePath);
  if (exists) {
    const overwrite = await new Confirm({
      name: 'overwrite',
      message: `Conflict on \`${filePath.split('/').pop()}\` ${chalk.red('\n  Overwrite?')}`,
      initial: false,
    }).run();

    return overwrite;
  }
  return true;
};
