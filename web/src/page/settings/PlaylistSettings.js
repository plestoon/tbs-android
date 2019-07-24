import { Button, Icon, message, Upload } from 'antd';
import React from 'react';

function PlaylistSettings() {
  const props = {
    name: 'playlist',
    action: '/api/settings/playlist',
    showUploadList: false,
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success('Upload Success');
      } else if (info.file.status === 'error') {
        message.error('Upload Failed, Please check if the file format is correct');
      }
    },
  };

  return (
    <div style={{ padding: '20px' }}>
      <Upload {...props}>
        <Button>
          <Icon type="upload" />Click to upload channel list
        </Button>
      </Upload>
    </div>
  );
}

export default PlaylistSettings;
