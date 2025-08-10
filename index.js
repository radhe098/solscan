#!/usr/bin/env node

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// ===== CLI Input =====
const address = process.argv[2];
if (!address) {
  console.error('❌ Please provide a contract address.\nUsage: node etherscan_downloader.js <address>');
  process.exit(1);
}

// ===== Etherscan URL =====
const url = `https://etherscan.io/address/${address}#code`;

(async () => {
  try {
    console.log(`📡 Fetching source code for: ${address}`);

    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      }
    });

    const $ = cheerio.load(data);

    // ===== Get Contract Name =====
    let contractName = $('div.row.align-items-center span.h6.fw-bold.mb-0').first().text().trim();
    if (!contractName) contractName = 'UnknownContract';

    // ===== Create Folder =====
    const contractsDir = path.join(process.cwd(), `${contractName}_${address}`);
    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir, { recursive: true });
    }

    // ===== Extract File Codes & Names =====
    const preElements = $('pre.js-sourcecopyarea.editor');
    const fileNameElements = $('div.d-flex.justify-content-between > span.text-muted');

    if (preElements.length === 0) {
      console.error('❌ No contract source found. It may be unverified or HTML structure has changed.');
      return;
    }

    preElements.each((i, el) => {
      const code = $(el).text().trim();
      let fileName = fileNameElements.eq(i).text().trim();

      // If filename is missing, use default
      if (!fileName) {
        fileName = `Contract_${i + 1}.sol`;
      } else {
        fileName = fileName.split(':').pop().trim(); // Extract part after ":"
        if (!fileName.endsWith('.sol')) {
          fileName += '.sol';
        }
      }

      const filePath = path.join(contractsDir, fileName);
      fs.writeFileSync(filePath, code, 'utf-8');
      console.log(`✅ Saved: ${fileName}`);
    });

    console.log(`\n🎉 All files saved in: ${contractsDir}`);
  } catch (err) {
    console.error(`❌ Error: ${err.message}`);
  }
})();
