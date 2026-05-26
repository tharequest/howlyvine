import { readdir, readFile } from 'fs/promises';
import { join, relative } from 'path';
import FormData from 'form-data';
import fetch from 'node-fetch';

const JWT = process.env.PINATA_JWT;
const DIST_DIR = './dist';

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getFiles(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

async function upload() {
  const files = await getFiles(DIST_DIR);
  const form = new FormData();
  for (const file of files) {
    const rel = relative(DIST_DIR, file);
    const content = await readFile(file);
    form.append('file', content, { filename: `howlyvine/${rel}` });
  }
  form.append('pinataMetadata', JSON.stringify({ name: 'howlyvine' }));

  const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: { Authorization: `Bearer ${JWT}`, ...form.getHeaders() },
    body: form
  });

  const data = await res.json();
  if (data.IpfsHash) {
    console.log('CID:', data.IpfsHash);
    console.log('URL: https://gateway.pinata.cloud/ipfs/' + data.IpfsHash);
  } else {
    console.error('Error:', JSON.stringify(data));
    process.exit(1);
  }
}

upload();