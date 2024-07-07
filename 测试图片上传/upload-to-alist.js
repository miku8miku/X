const fs = require('fs');
const path = require('path');
// const { createClient } = require('webdav');

// 动态导入 webdav 模块
async function loadWebdavModule() {
    const { createClient } = await import('webdav');
    return createClient;
  }

const folderPath = './测试图片上传'; // 替换为你图片所在的文件夹路径
const alistFolderPath = 'onedrive/美图'; // 替换为 AList 上的目标文件夹路径

// 读取文件夹中的所有图片文件
function getAllImages(folderPath) {
    return fs.readdirSync(folderPath).filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.gif';
    });
  }
  
// 上传文件到 AList
async function uploadFileToAlist(client, filePath, alistFolderPath) {
    const fileName = path.basename(filePath);
    const remoteFilePath = path.join(alistFolderPath, fileName);
    const fileContent = fs.readFileSync(filePath);
  
    try {
      await client.putFileContents(remoteFilePath, fileContent, { overwrite: true });
      console.log(`Uploaded: ${fileName} to ${remoteFilePath}`);
    } catch (error) {
      console.error(`Error uploading ${fileName} to ${remoteFilePath}: ${error.message}`);
    }
  }

// 主函数
async function main() {
    const createClient = await loadWebdavModule();
  
    // 配置 WebDAV 客户端
    const client = createClient(
    //   'http://localhost:5244/dav/', // 替换为你的 AList WebDAV 服务器地址
    'http://192.168.50.158:5244/dav/',
      {
        username: 'admin', // 替换为你的用户名
        password: 'admin'  // 替换为你的密码
      }
    );
  
    const imageFiles = getAllImages(folderPath);
  
    for (const file of imageFiles) {
      const filePath = path.join(folderPath, file);
      await uploadFileToAlist(client, filePath, alistFolderPath);
    }
  }
  
  main().catch(err => console.error(err));