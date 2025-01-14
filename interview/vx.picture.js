const fs = require('fs');
const os = require('os');
const path = require('path');
const { execSync } = require('child_process');
const { randomUUID } = require('crypto');
const { exec } = require('child_process');

const argv = process.argv.slice(2);

let userDir;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function copyFavArchive() {
  const weChatDataPath = `${os.homedir()}/Library/Containers/com.tencent.xinWeChat/Data/Library/Application Support/com.tencent.xinWeChat/2.0b4.0.9`;
  // 获取当前目录下有多少个文件夹名字符串长的文件夹
  let dirs = fs.readdirSync(weChatDataPath).filter((dir) => dir.length > 30);
  if (dirs.length === 0) {
    console.error('找不到用户文件夹');
    return;
  }
  // 检查文件夹里面有没有 Stickets/fav.archive 文件
  dirs = dirs.filter((dir) => fs.existsSync(`${weChatDataPath}/${dir}/Stickers/fav.archive`));
  if (dirs.length > 1 && argv.length === 0) {
    console.info('疑似找到多个用户文件夹，重新运行时请指定序号');
    dirs.forEach((dir, index) => {
      console.info(`${index + 1}. ${path.resolve(weChatDataPath, dir)}`);
    });
    return;
  }
  if (dirs.length > 1 && argv.length > 0) {
    userDir = dirs[argv[0] - 1];
  }
  if (dirs.length === 1) {
    [userDir] = dirs;
  }
  const favArchivePath = `${weChatDataPath}/${userDir}/Stickers/fav.archive`;
  const destPath = `${os.homedir}/Desktop/fav.archive.plist`;
  fs.copyFileSync(favArchivePath, destPath);
  console.info(`已复制 fav.archive 文件到桌面`);
  console.info(`[*] UserDir: ${userDir}`);
  console.info(`[*] fav.archive 路径: ${favArchivePath}`);
  return destPath;
}

if (fs.existsSync('fav.archive')) {
  fs.unlinkSync('fav.archive');
}
if (fs.existsSync('fav.archive.plist')) {
  fs.unlinkSync('fav.archive.plist');
}

copyFavArchive();

const cmd = 'plutil -convert xml1 fav.archive.plist';
execSync(cmd); // 转换为 plist 格式

const input = fs.readFileSync('fav.archive.plist', 'utf8');

const linkRegex = /<string>(https?:\/\/.*?)<\/string>/g;
let match;
const links = [];
while ((match = linkRegex.exec(input)) !== null) {
  links.push(match[1]);
}
console.log(`匹配到${links.length}个表情包`);
links.forEach((url, index) => {
  links[index] = url.replace(/&amp;/g, '&');
});

function download(url, filename) {
  console.log(`开始下载${filename}`);
  const userAgent =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36';
  const cmd = `curl -A "${userAgent}" -o 'download/${filename}' '${url}'`;
  exec(cmd, (error) => {
    if (error) {
      console.error(`执行出错: ${error}`);
      return;
    }
    console.log(`下载完成${filename}`);
  });
}

async function main() {
  const downloadDir = `${userDir}_Stickers`;
  if (!fs.existsSync(downloadDir)) {
    console.log(`创建文件夹${downloadDir}`);
    fs.mkdirSync(downloadDir);
  }
  console.log('5秒后开始下载表情包...');
  await sleep(3000);
  links.forEach((url, index) => {
    const name = randomUUID();
    const filename = `${name}.gif`;
    console.log(`开始下载第${index + 1}个表情包`);
    download(url, filename);
  });
}

main();