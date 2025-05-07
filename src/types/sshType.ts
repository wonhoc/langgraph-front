export interface SSHLogin {
  host: string;
  username: string;
  port: number;
  privateKey: File | null;
}

export interface rtnSSHLogin {
  result: boolean; // 연결 테스트 결과
  message: string; // 메세지
}

export interface rtnSSHServerList {
  host: string,
  username: string,
  port: number,
}