import os
from webdav3.client import Client

# 配置 WebDAV 客户端
options = {
    'webdav_hostname': "http://localhost:5244/dav/",  # 替换为你的 AList WebDAV 服务器地址
    'webdav_login': "admin",                          # 替换为你的用户名
    'webdav_password': "admin"                        # 替换为你的密码
}
client = Client(options)

folder_path = './test'  # 替换为你图片所在的文件夹路径
alist_folder_path = 'onedrive/美图'  # 替换为 AList 上的目标文件夹路径

# 读取文件夹中的所有图片文件
def get_all_images(folder_path):
    return [file for file in os.listdir(folder_path)
            if file.lower().endswith(('.jpg', '.jpeg', '.png', '.gif'))]

# 上传文件到 AList
def upload_file_to_alist(client, file_path, alist_folder_path):
    file_name = os.path.basename(file_path)
    remote_file_path = f"{alist_folder_path}/{file_name}"

    try:
        client.upload_sync(remote_path=remote_file_path, local_path=file_path)
        print(f"Uploaded: {file_name} to {remote_file_path}")
        
        # 上传成功后删除源文件
        os.remove(file_path)
        print(f"Deleted: {file_name} from {file_path}")
    except Exception as error:
        print(f"Error uploading {file_name} to {remote_file_path}: {error}")

# 主函数
def main():
    image_files = get_all_images(folder_path)

    for file in image_files:
        file_path = os.path.join(folder_path, file)
        upload_file_to_alist(client, file_path, alist_folder_path)

if __name__ == "__main__":
    main()
