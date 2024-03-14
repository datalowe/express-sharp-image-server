const path = require('node:path');
const fs = require('node:fs');
const sharp = require('sharp');

const ORIGINAL_DIRNAME = 'original_images';
const CACHE_DIRNAME = 'cached_images';
const originalDirPath = path.join(__dirname, ORIGINAL_DIRNAME);
const cacheDirPath = path.join(__dirname, CACHE_DIRNAME);

function ensureCacheDirExists() {
  if (!fs.existsSync(cacheDirPath)) {
    fs.mkdirSync(cacheDirPath);
  }
}

function findOriginalFilePath(fBase) {
  const fName = fs.readdirSync(originalDirPath).find((fName) => fName.replace(path.extname(fName), '') === fBase);
  if (!fName) {
    throw new Error('Unable to find matching file');
  }
  return path.join(originalDirPath, fName);
}

function formCacheFilePath(fBase, width, height, quality) {
  return path.join(cacheDirPath, `${fBase}-${width}x${height}-q${quality}.webp`);
}

async function resizeCompressImg(originalPath, cachePath, width, height, quality) {
  try {
    await sharp(originalPath)
      .webp({ quality })
      .resize({
        width,
        height,
      })
      .toFile(cachePath);
  } catch (err) {
    throw err;
  }
}

// also returns the path at which the image is available
async function ensureImageExists(fBase, widthStr, heightStr, qualityStr) {
  if (!fBase) {
    throw new Error(`Empty filebase value: ${fBase}`);
  }
  let width = Number.parseInt(widthStr) || null;
  let height = Number.parseInt(heightStr) || null;
  let quality = Number.parseInt(qualityStr);
  if (isNaN(quality)) {
    throw new Error(`Non-numeric quality (${qualityStr}).`);
  }

  ensureCacheDirExists();
  const cachePath = formCacheFilePath(fBase, width, height, quality);
  if (fs.existsSync(cachePath)) {
    return cachePath;
  }

  let origPath;
  try {
    origPath = findOriginalFilePath(fBase);
  } catch (err) {
    throw new Error(`No corresponding original file could be found for base filename ${fBase}, please try again`);
  }

  await resizeCompressImg(origPath, cachePath, width, height, quality);
  return cachePath;
}

module.exports = {
  ensureImageExists,
};
